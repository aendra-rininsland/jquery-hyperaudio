/*! hyperaudio - v0.0.1 - 2014-09-08
* https://github.com/times/hyperaudio
* Copyright (c) 2014 Ændrew Rininsland; Licensed MIT */
/*global jQuery,Popcorn*/

(function ($) {
  'use strict';

  // Collection method.
  $.fn.hyperaudio = function (options) {
    options = $.extend({}, $.fn.hyperaudio.defaults, options);
    return this.each(function (i) {
      // Load Popcorn if it
      if (!Popcorn) {
        $('head').append($('<script>').attr('src', '//cdn.popcornjs.org/code/dist/popcorn-ie8.min.js').attr('type', 'text/javascript'));
      }
      var pop = new Popcorn(this);

      var transcript = $(options.elem);

      pop.on( "timeupdate", function() {
        for (var i=0, max=transcript.length; i < max; i++) {
          if (transcript[i].getAttribute('data-m') < (this.currentTime() * 1000)) {
          transcript[i].className = "transcript-read";
          }
        }
      });

      $('.body-copy a').each(function(){$(this).addClass('transcript-unread');});

      var handleClick = function() {
        for (var j=0; j < transcript.length; j++) {
          transcript[j].className = 'transcript-unread';
        }
        pop.play(this.getAttribute('data-m') / 1000);
        return false;
      };

      for (i=0; i < transcript.length; i++) {
        transcript[i].onclick = handleClick;
      }
    });
  };

  $.fn.hyperaudio.defaults = {
    'elem': 'a', // The type of element to select. Hyperaudio converter uses 'a' at the moment.
  };

}(jQuery));
