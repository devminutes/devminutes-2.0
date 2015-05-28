var EasterEgg = function (sequence) {
  var self = this;
  var position = 0;

  var hide = function () {
    var easteregg = document.getElementById('easteregg');
    if(easteregg) easteregg.remove();
  }

  document.addEventListener('keypress', hide);
  document.addEventListener('mousedown', hide);
  document.addEventListener('scroll', hide);
  document.addEventListener('keypress', function (event) {
    if(event.keyCode == sequence.charCodeAt(position)) {
      position += 1;

      if(position == sequence.length) {
        position = 0;
        self.callback();
      }
    } else {
      position = 0;
    }
  });
};

EasterEgg.prototype.then = function(f) {
  this.callback = f;
};

new EasterEgg('czpodcast').then(function () {
  var easteregg = document.createElement('div');
  easteregg.id = 'easteregg';
  easteregg.style.position = 'absolute';
  easteregg.style.width = '100%';
  easteregg.style.height = '100%';
  easteregg.style.backgroundColor = 'rgba(255,255,255,0.5)';
  easteregg.style.backgroundImage = 'url(../images/homer.jpg)';
  easteregg.style.backgroundRepeat = 'no-repeat';
  easteregg.style.backgroundPosition = 'center center';
  easteregg.style.backgroundSize = 'contain';
  easteregg.style.left = document.body.scrollLeft + 'px';
  easteregg.style.top = document.body.scrollTop + 'px';
  easteregg.style.zIndex = 9999;
  document.body.insertBefore(easteregg, document.body.firstChild);
}); 