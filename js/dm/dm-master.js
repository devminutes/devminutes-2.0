function DMMaster(grammer) {
  this.pegParser = PEG.buildParser(grammer);

  this.parseConfiguration = function(configuration) {
    var episodeFileNames = _.string.lines(configuration);
    return episodeFileNames.map(function(fileName) {
      var id = parseInt(_.string.strLeft(fileName, '-'));
      return new EpisodeConfiguration(id, fileName);
    }).sort(function(a, b) { return b.id - a.id; });;
  }

  this.findEpisodeConfigurationById = function(configuration, episodeId) {
    var parsedConfiguration = this.parseConfiguration(configuration);
    return parsedConfiguration.filter(function (ec) {
        return ec.id == episodeId;
    })[0];
  }

  this.parseEpisode = function(input) {
    var result = this.pegParser.parse(input);


    // postprocessing
    result.perex = getPerexFromDescription(result.description);
    result.description = convertToHtml(result.description);
    result.soundcloudId = parseSoundCloudIdFromMp3Url(result.mp3);
    result.soundcloudPlayerUrl = makeSoundplayerUrl(result.soundcloudId);
    result.soundcloudPlayer = makeSoundCloudPlayer(result.soundcloudPlayerUrl);
    result.resourcesHtml = makeHtmlTableForResources(result.resources);
    result.url = makeEpisodeUrl(result.id);
    return result;
  }

  convertToHtml = function(descriptionWithMarkdown) {
    var converter = new Showdown.converter();
    return converter.makeHtml(descriptionWithMarkdown);
  }

  // fist 60 letters from description
  getPerexFromDescription = function(description) {
    return description.substring(0, 60) + '...';
  }

  // mp3 url sample:
  // http://feeds.soundcloud.com/stream/117006007-devminutes-1-miroslav-bajtos.mp3
  parseSoundCloudIdFromMp3Url = function(mp3url) {
    var tmp = mp3url.substring(mp3url.lastIndexOf('/') + 1, mp3url.length);
    return tmp.substring(0, tmp.indexOf('-'));
  }

  // sample:
  // https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/246673649&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"
  makeSoundplayerUrl = function(soundcloudId) {
    var tmp = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/".concat(soundcloudId);
    return tmp.concat("&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false");
  }

  /*
  <iframe width="100%" height="166" scrolling="no" frameborder="no"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/246673649&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false">
  </iframe>
  */
  makeSoundCloudPlayer = function(soundcloudUrl) {
    var tmp = "<iframe width='100%' height='166' scrolling='no' frameborder='no' ";
    tmp = tmp.concat("src='").concat(soundcloudUrl).concat("'>");
    tmp = tmp.concat("</iframe>");
    return tmp;
  }



  makeHtmlTableForResources = function(resources) {
    var maxColumns = 2;
    var numberOfSections = resources.length;

    var html = "<table><tr>";
    for (var sectionIndex = 0; sectionIndex < numberOfSections; sectionIndex++) {
      var resourceHtmlList = makeHtmlListForResource(resources[sectionIndex]);
      html += "<td>" + resourceHtmlList + "</td>";
      if ((sectionIndex + 1) % maxColumns == 0) {
        html += "<tr></tr>";
      }
    }
    return html.concat("</tr></table>");
  }

  makeHtmlListForResource = function(resource) {
    var html = resource.title;
    html = html.concat("<ul>");

    for (var indexLink = 0; indexLink < resource.links.length; indexLink++) {
      var linkTitle = resource.links[indexLink].text;
      var linkUrl = resource.links[indexLink].href;
      var linkHtml = "<a href='" + linkUrl + "'>" + linkTitle + "</a>";
      html +=  "<li>" + linkHtml + "</li>";
    }

    return html.concat("</ul>");
  }

  makeEpisodeUrl = function(episodeId) {
    return window.location.origin + "/episode/".concat(episodeId);
  }
}
