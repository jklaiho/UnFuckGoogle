(function() {
  var UnFuckGoogleStart, subdomain, tehGoogles;
  UnFuckGoogleStart = function() {
    var PLUSONE_CLASSDEF, plusOneButtons, removePlusOnes, showMorePlusRemoval;
    PLUSONE_CLASSDEF = 'esw eswd';
    removePlusOnes = function(buttons) {
      var i, undoDiv, _ref, _results;
      if (buttons.length > 0) {
        _results = [];
        for (i = _ref = buttons.length - 1; _ref <= 0 ? i <= 0 : i >= 0; _ref <= 0 ? i++ : i--) {
          undoDiv = document.getElementById(buttons[i].getAttribute('g:undo'));
          buttons[i].parentNode.removeChild(buttons[i]);
          _results.push(undoDiv.parentNode.removeChild(undoDiv));
        }
        return _results;
      }
    };
    plusOneButtons = document.getElementsByClassName(PLUSONE_CLASSDEF);
    removePlusOnes(plusOneButtons);
    showMorePlusRemoval = function() {
      var newPlusOneButtons;
      newPlusOneButtons = document.getElementsByClassName(PLUSONE_CLASSDEF);
      return removePlusOnes(newPlusOneButtons);
    };
    return document.addEventListener('DOMNodeInsertedIntoDocument', showMorePlusRemoval, true);
  };
  if (window.top === window) {
    tehGoogles = /\.google\.\w+(\.\w+)?$/;
    subdomain = document.domain.split('.')[0];
    if (tehGoogles.test(document.domain) && subdomain !== 'mail') {
      document.addEventListener("DOMContentLoaded", function() {
        return UnFuckGoogleStart();
      }, true);
    }
  }
}).call(this);
