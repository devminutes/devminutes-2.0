function DMMaster(grammer) {
  this.pegParser = PEG.buildParser(grammer);

  this.parseConfiguration = function(configuration) {
    var episodeFileNames = _.string.lines(configuration);
    return episodeFileNames.map(function(fileName) {
      var id = parseInt(_.string.strLeft(fileName, '-'));
      return new EpisodeConfiguration(id, fileName);
    });
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

  // mp3 url sample: 
  // http://feeds.soundcloud.com/stream/117006007-devminutes-1-miroslav-bajtos.mp3
  parseSoundCloudIdFromMp3Url = function(mp3url) {
    var tmp = mp3url.substring(mp3url.lastIndexOf('/') + 1, mp3url.length);
    return tmp.substring(0, tmp.indexOf('-'));
  }

  // sample: 
  // https://player.soundcloud.com/player.swf?url=https%3A//api.soundcloud.com/tracks/117006007&amp;color=ff6600&amp;auto_play=false&amp;player_type=tiny
  makeSoundplayerUrl = function(soundcloudId) {
    var tmp = "https://player.soundcloud.com/player.swf?url=https%3A//api.soundcloud.com/tracks/".concat(soundcloudId);
    return tmp.concat("&color=ff6600&auto_play=false&player_type=tiny");
  }

  /*
  <object height="18" width="100%">
    <param name="movie" value="makeSoundplayerUrl"></param>
    <param name="allowscriptaccess" value="always"></param>
    <param name="wmode" value="transparent"></param>
    <embed wmode="transparent" allowscriptaccess="always" height="18" width="100%" src='makeSoundplayerUrl'></embed>
  </object>
  */
  makeSoundCloudPlayer = function(soundcloudUrl) {
    var tmp = "<object height='18' width='100%'>"
    tmp = tmp.concat("<param name='movie' value='").concat(soundcloudUrl).concat("'></param>");
    tmp = tmp.concat("<param name='allowscriptaccess' value='always'></param>");
    tmp = tmp.concat("<param name='wmode' value='transparent'></param>");
    tmp = tmp.concat("<embed wmode='transparent' allowscriptaccess='always' height='18' width='100%' src='").concat(soundcloudUrl).concat("'></embed>");
    tmp = tmp.concat("</object>");
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
    return window.location.origin + "/#!/episodes/".concat(episodeId);
  }
}