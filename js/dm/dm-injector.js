var EasterEgg = function (sequence) {
    var self = this;
    var position = 0;

    var hide = function () {
      var egg = document.getElementById('easteregg');
      if(egg) egg.remove();
    }

    document.addEventListener('keypress', hide);
    document.addEventListener('mousedown', hide);
    document.addEventListener('scroll', hide);
    document.addEventListener('keypress', function (e) {
       if(e.keyCode == sequence.charCodeAt(position)) {
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
  var dmHomer = document.createElement('div');
  dmHomer.id = 'easteregg';
  dmHomer.style.position = 'absolute';
  dmHomer.style.width = '100%';
  dmHomer.style.height = '100%';
  dmHomer.style.backgroundColor = 'rgba(255,255,255,0.5)';
  dmHomer.style.backgroundImage = 'url(../images/homer.jpg)';
  dmHomer.style.backgroundRepeat = 'no-repeat';
  dmHomer.style.backgroundPosition = 'center center';
  dmHomer.style.backgroundSize = 'contain';
  dmHomer.style.left = document.body.scrollLeft + 'px';
  dmHomer.style.top = document.body.scrollTop + 'px';
  dmHomer.style.zIndex = 9999;
  document.body.insertBefore(dmHomer, document.body.firstChild);
}); 