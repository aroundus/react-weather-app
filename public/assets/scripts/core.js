// Navigator variables
var userAgent = navigator.userAgent.toLowerCase();
var appName = navigator.appName.toLowerCase();

// Detect browser
var IE = !!((appName == 'netscape' && userAgent.search('trident') != -1) || userAgent.indexOf('msie') != -1 || userAgent.indexOf('edge') != -1);

var CHROME  = !!(userAgent.indexOf('chrome') != -1 && userAgent.indexOf('edge') == -1);
var FIREFOX = !!(userAgent.indexOf('firefox') != -1);
var SAFARI  = !!(userAgent.indexOf('chrome') == -1 && userAgent.indexOf('safari') != -1);

// Detect device
var PC     = 'win16|win32|win64|mac|macintel';
var MOBILE = !!(navigator.platform && PC.indexOf(navigator.platform.toLowerCase()) == -1);

(function() {
  var common = function() {
    RegExp.quote = function(value) {
      return value.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    };

    if (!Array.prototype.find) {
      Object.defineProperty(Array.prototype, 'find', {
        value: function(predicate) {
          if (this == null) throw new TypeError('"this" is null or undefined.');
          if (typeof predicate !== 'function') throw new TypeError('predicate must be a function');

          var i = 0;

          while (i < Object(this).length >>> 0) {
            var value = Object(this)[i];

            if (predicate.call(arguments[1], value, i, Object(this))) {
              return value;
            }

            i++;
          }

          return undefined;
        }
      });
    }

    String.prototype.includes = String.prototype.includes || function(value) {
      return this.indexOf(value) != -1 ? true : false;
    };

    String.prototype.startsWith = String.prototype.startsWith || function(value, position) {
      position = position || 0;
      return this.substr(position, value.length) === value;
    };
  };

  window.common = new common();
})();
