(function() {
  var UnFuckGoogleEnd, subdomain, tehGoogles;
  UnFuckGoogleEnd = function() {
    var PREVIEW_CLASSDEF, previewActivators, removePreviewActivators, showMorePreviewRemoval;
    PREVIEW_CLASSDEF = 'vspib';
    removePreviewActivators = function(divs) {
      var i, _ref, _ref2, _results;
      if (divs.length > 0) {
        _results = [];
        for (i = _ref = divs.length - 1; _ref <= 0 ? i <= 0 : i >= 0; _ref <= 0 ? i++ : i--) {
          _results.push((_ref2 = divs[i]) != null ? _ref2.parentNode.removeChild(divs[i]) : void 0);
        }
        return _results;
      }
    };
    previewActivators = document.getElementsByClassName(PREVIEW_CLASSDEF);
    removePreviewActivators(previewActivators);
    showMorePreviewRemoval = function() {
      var newPreviewActivators;
      newPreviewActivators = document.getElementsByClassName(PREVIEW_CLASSDEF);
      return removePreviewActivators(newPreviewActivators);
    };
    return document.addEventListener('DOMNodeInsertedIntoDocument', showMorePreviewRemoval, true);
  };
  if (window.top === window) {
    tehGoogles = /\.google\.\w+(\.\w+)?$/;
    subdomain = document.domain.split('.')[0];
    if (tehGoogles.test(document.domain) && subdomain !== 'mail') {
      window.onload = function() {
        return UnFuckGoogleEnd();
      };
    }
  }
}).call(this);
