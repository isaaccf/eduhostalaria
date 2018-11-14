(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-me-me-module"],{

/***/ "./node_modules/image-compressor.js/dist/image-compressor.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/image-compressor.js/dist/image-compressor.esm.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*!
 * Image Compressor v1.1.4
 * https://xkeshi.github.io/image-compressor
 *
 * Copyright 2017-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2018-06-20T07:28:41.051Z
 */

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var canvasToBlob = createCommonjsModule(function (module) {
(function (window) {

  var CanvasPrototype =
    window.HTMLCanvasElement && window.HTMLCanvasElement.prototype;
  var hasBlobConstructor =
    window.Blob &&
    (function () {
      try {
        return Boolean(new Blob())
      } catch (e) {
        return false
      }
    })();
  var hasArrayBufferViewSupport =
    hasBlobConstructor &&
    window.Uint8Array &&
    (function () {
      try {
        return new Blob([new Uint8Array(100)]).size === 100
      } catch (e) {
        return false
      }
    })();
  var BlobBuilder =
    window.BlobBuilder ||
    window.WebKitBlobBuilder ||
    window.MozBlobBuilder ||
    window.MSBlobBuilder;
  var dataURIPattern = /^data:((.*?)(;charset=.*?)?)(;base64)?,/;
  var dataURLtoBlob =
    (hasBlobConstructor || BlobBuilder) &&
    window.atob &&
    window.ArrayBuffer &&
    window.Uint8Array &&
    function (dataURI) {
      var matches,
        mediaType,
        isBase64,
        dataString,
        byteString,
        arrayBuffer,
        intArray,
        i,
        bb;
      // Parse the dataURI components as per RFC 2397
      matches = dataURI.match(dataURIPattern);
      if (!matches) {
        throw new Error('invalid data URI')
      }
      // Default to text/plain;charset=US-ASCII
      mediaType = matches[2]
        ? matches[1]
        : 'text/plain' + (matches[3] || ';charset=US-ASCII');
      isBase64 = !!matches[4];
      dataString = dataURI.slice(matches[0].length);
      if (isBase64) {
        // Convert base64 to raw binary data held in a string:
        byteString = atob(dataString);
      } else {
        // Convert base64/URLEncoded data component to raw binary:
        byteString = decodeURIComponent(dataString);
      }
      // Write the bytes of the string to an ArrayBuffer:
      arrayBuffer = new ArrayBuffer(byteString.length);
      intArray = new Uint8Array(arrayBuffer);
      for (i = 0; i < byteString.length; i += 1) {
        intArray[i] = byteString.charCodeAt(i);
      }
      // Write the ArrayBuffer (or ArrayBufferView) to a blob:
      if (hasBlobConstructor) {
        return new Blob([hasArrayBufferViewSupport ? intArray : arrayBuffer], {
          type: mediaType
        })
      }
      bb = new BlobBuilder();
      bb.append(arrayBuffer);
      return bb.getBlob(mediaType)
    };
  if (window.HTMLCanvasElement && !CanvasPrototype.toBlob) {
    if (CanvasPrototype.mozGetAsFile) {
      CanvasPrototype.toBlob = function (callback, type, quality) {
        var self = this;
        setTimeout(function () {
          if (quality && CanvasPrototype.toDataURL && dataURLtoBlob) {
            callback(dataURLtoBlob(self.toDataURL(type, quality)));
          } else {
            callback(self.mozGetAsFile('blob', type));
          }
        });
      };
    } else if (CanvasPrototype.toDataURL && dataURLtoBlob) {
      CanvasPrototype.toBlob = function (callback, type, quality) {
        var self = this;
        setTimeout(function () {
          callback(dataURLtoBlob(self.toDataURL(type, quality)));
        });
      };
    }
  }
  if (false) {} else if (module.exports) {
    module.exports = dataURLtoBlob;
  } else {
    window.dataURLtoBlob = dataURLtoBlob;
  }
})(window);
});

/* globals Blob */
var toString = Object.prototype.toString;

var isBlob = function (x) {
	return x instanceof Blob || toString.call(x) === '[object Blob]';
};

var DEFAULTS = {
  /**
   * Indicates if read the image's Exif Orientation information,
   * and then rotate or flip the image automatically.
   * @type {boolean}
   */
  checkOrientation: true,

  /**
   * The max width of the output image.
   * @type {number}
   */
  maxWidth: Infinity,

  /**
   * The max height of the output image.
   * @type {number}
   */
  maxHeight: Infinity,

  /**
   * The min width of the output image.
   * @type {number}
   */
  minWidth: 0,

  /**
   * The min height of the output image.
   * @type {number}
   */
  minHeight: 0,

  /**
   * The width of the output image.
   * If not specified, the natural width of the source image will be used.
   * @type {number}
   */
  width: undefined,

  /**
   * The height of the output image.
   * If not specified, the natural height of the source image will be used.
   * @type {number}
   */
  height: undefined,

  /**
   * The quality of the output image.
   * It must be a number between `0` and `1`,
   * and only available for `image/jpeg` and `image/webp` images.
   * Check out {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob canvas.toBlob}.
   * @type {number}
   */
  quality: 0.8,

  /**
   * The mime type of the output image.
   * By default, the original mime type of the source image file will be used.
   * @type {string}
   */
  mimeType: 'auto',

  /**
   * PNG files over this value (5M by default) will be converted to JPEGs.
   * To disable this, just set the value to `Infinity`.
   * Check out {@link https://github.com/xkeshi/image-compressor/issues/2 #2}.
   * @type {number}
   */
  convertSize: 5000000,

  /**
   * The hook function to execute before draw the image into the canvas for compression.
   * @type {Function}
   * @param {CanvasRenderingContext2D} context - The 2d rendering context of the canvas.
   * @param {HTMLCanvasElement} canvas - The canvas for compression.
   * @example
   * function (context, canvas) { context.fillStyle = '#fff' }
   */
  beforeDraw: null,

  /**
   * The hook function to execute after drew the image into the canvas for compression.
   * @type {Function}
   * @param {CanvasRenderingContext2D} context - The 2d rendering context of the canvas.
   * @param {HTMLCanvasElement} canvas - The canvas for compression.
   * @example
   * function (context, canvas) { context.filter = grayscale(100%) }
   */
  drew: null,

  /**
   * The hook function to execute when success to compress the image.
   * @type {Function}
   * @param {File} file - The compressed image File object.
   * @example
   * function (file) { console.log(file) }
   */
  success: null,

  /**
   * The hook function to execute when fail to compress the image.
   * @type {Function}
   * @param {Error} err - An Error object.
   * @example
   * function (err) { console.log(err.message) }
   */
  error: null
};

var REGEXP_IMAGE_TYPE = /^image\/.+$/;

/**
 * Check if the given value is a mime type of image.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given is a mime type of image, else `false`.
 */
function isImageType(value) {
  return REGEXP_IMAGE_TYPE.test(value);
}

/**
 * Convert image type to extension.
 * @param {string} value - The image type to convert.
 * @param {boolean} [includeDot=true] - Include a leading dot or not.
 * @returns {boolean} Returns the image extension.
 */
function imageTypeToExtension(value) {
  var includeDot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var extension = isImageType(value) ? value.substr(6) : '';

  if (extension === 'jpeg') {
    extension = 'jpg';
  }

  if (extension && includeDot) {
    extension = '.' + extension;
  }

  return extension;
}

var fromCharCode = String.fromCharCode;

/**
 * Get string from char code in data view.
 * @param {DataView} dataView - The data view for read.
 * @param {number} start - The start index.
 * @param {number} length - The read length.
 * @returns {string} The read result.
 */

function getStringFromCharCode(dataView, start, length) {
  var str = '';
  var i = void 0;

  length += start;

  for (i = start; i < length; i += 1) {
    str += fromCharCode(dataView.getUint8(i));
  }

  return str;
}

var _window = window,
    btoa = _window.btoa;

/**
 * Transform array buffer to Data URL.
 * @param {ArrayBuffer} arrayBuffer - The array buffer to transform.
 * @param {string} mimeType - The mime type of the Data URL.
 * @returns {string} The result Data URL.
 */

function arrayBufferToDataURL(arrayBuffer, mimeType) {
  var uint8 = new Uint8Array(arrayBuffer);
  var data = '';

  // TypedArray.prototype.forEach is not supported in some browsers as IE.
  if (typeof uint8.forEach === 'function') {
    uint8.forEach(function (value) {
      data += fromCharCode(value);
    });
  } else {
    var length = uint8.length;


    for (var i = 0; i < length; i += 1) {
      data += fromCharCode(uint8[i]);
    }
  }

  return 'data:' + mimeType + ';base64,' + btoa(data);
}

/**
 * Get orientation value from given array buffer.
 * @param {ArrayBuffer} arrayBuffer - The array buffer to read.
 * @returns {number} The read orientation value.
 */
function getOrientation(arrayBuffer) {
  var dataView = new DataView(arrayBuffer);
  var orientation = void 0;
  var littleEndian = void 0;
  var app1Start = void 0;
  var ifdStart = void 0;

  // Only handle JPEG image (start by 0xFFD8)
  if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
    var length = dataView.byteLength;
    var offset = 2;

    while (offset < length) {
      if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
        app1Start = offset;
        break;
      }

      offset += 1;
    }
  }

  if (app1Start) {
    var exifIDCode = app1Start + 4;
    var tiffOffset = app1Start + 10;

    if (getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
      var endianness = dataView.getUint16(tiffOffset);

      littleEndian = endianness === 0x4949;

      if (littleEndian || endianness === 0x4D4D /* bigEndian */) {
          if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
            var firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);

            if (firstIFDOffset >= 0x00000008) {
              ifdStart = tiffOffset + firstIFDOffset;
            }
          }
        }
    }
  }

  if (ifdStart) {
    var _length = dataView.getUint16(ifdStart, littleEndian);
    var _offset = void 0;
    var i = void 0;

    for (i = 0; i < _length; i += 1) {
      _offset = ifdStart + i * 12 + 2;

      if (dataView.getUint16(_offset, littleEndian) === 0x0112 /* Orientation */) {
          // 8 is the offset of the current tag's value
          _offset += 8;

          // Get the original orientation value
          orientation = dataView.getUint16(_offset, littleEndian);

          // Override the orientation with its default value
          dataView.setUint16(_offset, 1, littleEndian);
          break;
        }
    }
  }

  return orientation;
}

/**
 * Parse Exif Orientation value.
 * @param {number} orientation - The orientation to parse.
 * @returns {Object} The parsed result.
 */
function parseOrientation(orientation) {
  var rotate = 0;
  var scaleX = 1;
  var scaleY = 1;

  switch (orientation) {
    // Flip horizontal
    case 2:
      scaleX = -1;
      break;

    // Rotate left 180°
    case 3:
      rotate = -180;
      break;

    // Flip vertical
    case 4:
      scaleY = -1;
      break;

    // Flip vertical and rotate right 90°
    case 5:
      rotate = 90;
      scaleY = -1;
      break;

    // Rotate right 90°
    case 6:
      rotate = 90;
      break;

    // Flip horizontal and rotate right 90°
    case 7:
      rotate = 90;
      scaleX = -1;
      break;

    // Rotate left 90°
    case 8:
      rotate = -90;
      break;

    default:
  }

  return {
    rotate: rotate,
    scaleX: scaleX,
    scaleY: scaleY
  };
}

var REGEXP_DECIMALS = /\.\d*(?:0|9){12}\d*$/i;

/**
 * Normalize decimal number.
 * Check out {@link http://0.30000000000000004.com/}
 * @param {number} value - The value to normalize.
 * @param {number} [times=100000000000] - The times for normalizing.
 * @returns {number} Returns the normalized number.
 */
function normalizeDecimalNumber(value) {
  var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100000000000;

  return REGEXP_DECIMALS.test(value) ? Math.round(value * times) / times : value;
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var _window$1 = window,
    ArrayBuffer$1 = _window$1.ArrayBuffer,
    FileReader = _window$1.FileReader;

var URL = window.URL || window.webkitURL;
var REGEXP_EXTENSION = /\.\w+$/;

/**
 * Creates a new image compressor.
 * @class
 */

var ImageCompressor = function () {
  /**
   * The constructor of ImageCompressor.
   * @param {File|Blob} file - The target image file for compressing.
   * @param {Object} [options] - The options for compressing.
   */
  function ImageCompressor(file, options) {
    classCallCheck(this, ImageCompressor);

    this.result = null;

    if (file) {
      this.compress(file, options);
    }
  }

  /**
   * The main compress method.
   * @param {File|Blob} file - The target image file for compressing.
   * @param {Object} [options] - The options for compressing.
   * @returns {Promise} - A Promise instance.
   */


  createClass(ImageCompressor, [{
    key: 'compress',
    value: function compress(file, options) {
      var _this = this;

      var image = new Image();

      options = _extends({}, DEFAULTS, options);

      if (!ArrayBuffer$1) {
        options.checkOrientation = false;
      }

      return new Promise(function (resolve, reject) {
        if (!isBlob(file)) {
          reject(new Error('The first argument must be a File or Blob object.'));
          return;
        }

        var mimeType = file.type;

        if (!isImageType(mimeType)) {
          reject(new Error('The first argument must be an image File or Blob object.'));
          return;
        }

        if (!URL && !FileReader) {
          reject(new Error('The current browser does not support image compression.'));
          return;
        }

        if (URL && !options.checkOrientation) {
          resolve({
            url: URL.createObjectURL(file)
          });
        } else if (FileReader) {
          var reader = new FileReader();
          var checkOrientation = options.checkOrientation && mimeType === 'image/jpeg';

          reader.onload = function (_ref) {
            var target = _ref.target;
            var result = target.result;


            resolve(checkOrientation ? _extends({
              url: arrayBufferToDataURL(result, mimeType)
            }, parseOrientation(getOrientation(result))) : {
              url: result
            });
          };
          reader.onabort = function () {
            reject(new Error('Aborted to load the image with FileReader.'));
          };
          reader.onerror = function () {
            reject(new Error('Failed to load the image with FileReader.'));
          };

          if (checkOrientation) {
            reader.readAsArrayBuffer(file);
          } else {
            reader.readAsDataURL(file);
          }
        }
      }).then(function (data) {
        return new Promise(function (resolve, reject) {
          image.onload = function () {
            return resolve(_extends({}, data, {
              naturalWidth: image.naturalWidth,
              naturalHeight: image.naturalHeight
            }));
          };
          image.onabort = function () {
            reject(new Error('Aborted to load the image.'));
          };
          image.onerror = function () {
            reject(new Error('Failed to load the image.'));
          };
          image.alt = file.name;
          image.src = data.url;
        });
      }).then(function (_ref2) {
        var naturalWidth = _ref2.naturalWidth,
            naturalHeight = _ref2.naturalHeight,
            _ref2$rotate = _ref2.rotate,
            rotate = _ref2$rotate === undefined ? 0 : _ref2$rotate,
            _ref2$scaleX = _ref2.scaleX,
            scaleX = _ref2$scaleX === undefined ? 1 : _ref2$scaleX,
            _ref2$scaleY = _ref2.scaleY,
            scaleY = _ref2$scaleY === undefined ? 1 : _ref2$scaleY;
        return new Promise(function (resolve) {
          var canvas = document.createElement('canvas');
          var context = canvas.getContext('2d');
          var aspectRatio = naturalWidth / naturalHeight;
          var maxWidth = Math.max(options.maxWidth, 0) || Infinity;
          var maxHeight = Math.max(options.maxHeight, 0) || Infinity;
          var minWidth = Math.max(options.minWidth, 0) || 0;
          var minHeight = Math.max(options.minHeight, 0) || 0;
          var width = naturalWidth;
          var height = naturalHeight;

          if (maxWidth < Infinity && maxHeight < Infinity) {
            if (maxHeight * aspectRatio > maxWidth) {
              maxHeight = maxWidth / aspectRatio;
            } else {
              maxWidth = maxHeight * aspectRatio;
            }
          } else if (maxWidth < Infinity) {
            maxHeight = maxWidth / aspectRatio;
          } else if (maxHeight < Infinity) {
            maxWidth = maxHeight * aspectRatio;
          }

          if (minWidth > 0 && minHeight > 0) {
            if (minHeight * aspectRatio > minWidth) {
              minHeight = minWidth / aspectRatio;
            } else {
              minWidth = minHeight * aspectRatio;
            }
          } else if (minWidth > 0) {
            minHeight = minWidth / aspectRatio;
          } else if (minHeight > 0) {
            minWidth = minHeight * aspectRatio;
          }

          if (options.width > 0) {
            var _options = options;
            width = _options.width;

            height = width / aspectRatio;
          } else if (options.height > 0) {
            var _options2 = options;
            height = _options2.height;

            width = height * aspectRatio;
          }

          width = Math.min(Math.max(width, minWidth), maxWidth);
          height = Math.min(Math.max(height, minHeight), maxHeight);

          var destX = -width / 2;
          var destY = -height / 2;
          var destWidth = width;
          var destHeight = height;

          if (Math.abs(rotate) % 180 === 90) {
            var _width$height = {
              width: height,
              height: width
            };
            width = _width$height.width;
            height = _width$height.height;
          }

          canvas.width = normalizeDecimalNumber(width);
          canvas.height = normalizeDecimalNumber(height);

          if (!isImageType(options.mimeType)) {
            options.mimeType = file.type;
          }

          var defaultFillStyle = 'transparent';

          // Converts PNG files over the `convertSize` to JPEGs.
          if (file.size > options.convertSize && options.mimeType === 'image/png') {
            defaultFillStyle = '#fff';
            options.mimeType = 'image/jpeg';
          }

          // Override the default fill color (#000, black)
          context.fillStyle = defaultFillStyle;
          context.fillRect(0, 0, width, height);
          context.save();
          context.translate(width / 2, height / 2);
          context.rotate(rotate * Math.PI / 180);
          context.scale(scaleX, scaleY);

          if (options.beforeDraw) {
            options.beforeDraw.call(_this, context, canvas);
          }

          context.drawImage(image, Math.floor(normalizeDecimalNumber(destX)), Math.floor(normalizeDecimalNumber(destY)), Math.floor(normalizeDecimalNumber(destWidth)), Math.floor(normalizeDecimalNumber(destHeight)));

          if (options.drew) {
            options.drew.call(_this, context, canvas);
          }

          context.restore();

          var done = function done(result) {
            resolve({
              naturalWidth: naturalWidth,
              naturalHeight: naturalHeight,
              result: result
            });
          };

          if (canvas.toBlob) {
            canvas.toBlob(done, options.mimeType, options.quality);
          } else {
            done(canvasToBlob(canvas.toDataURL(options.mimeType, options.quality)));
          }
        });
      }).then(function (_ref3) {
        var naturalWidth = _ref3.naturalWidth,
            naturalHeight = _ref3.naturalHeight,
            result = _ref3.result;

        if (URL && !options.checkOrientation) {
          URL.revokeObjectURL(image.src);
        }

        if (result) {
          // Returns original file if the result is greater than it and without size related options
          if (result.size > file.size && options.mimeType === file.type && !(options.width > naturalWidth || options.height > naturalHeight || options.minWidth > naturalWidth || options.minHeight > naturalHeight)) {
            result = file;
          } else {
            var date = new Date();

            result.lastModified = date.getTime();
            result.lastModifiedDate = date;
            result.name = file.name;

            // Convert the extension to match its type
            if (result.name && result.type !== file.type) {
              result.name = result.name.replace(REGEXP_EXTENSION, imageTypeToExtension(result.type));
            }
          }
        } else {
          // Returns original file if the result is null in some cases.
          result = file;
        }

        _this.result = result;

        if (options.success) {
          options.success.call(_this, result);
        }

        return Promise.resolve(result);
      }).catch(function (err) {
        if (!options.error) {
          throw err;
        }

        options.error.call(_this, err);
      });
    }
  }]);
  return ImageCompressor;
}();

/* harmony default export */ __webpack_exports__["default"] = (ImageCompressor);


/***/ }),

/***/ "./src/app/views/me/booking/booking.component.css":
/*!********************************************************!*\
  !*** ./src/app/views/me/booking/booking.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".button-group {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  margin: 30px 0 0 0;\r\n}\r\n\r\n.btn {\r\n  margin: 0 10px;\r\n}\r\n\r\n.icon {\r\n  margin-right: 5px;\r\n}\r\n\r\n.second-panel {\r\n  margin-top: 30px;\r\n}\r\n\r\n.column {\r\n  margin: 5px 0;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlld3MvbWUvYm9va2luZy9ib29raW5nLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFjO0VBQ2Qsb0JBQW9CO0VBQ3BCLHdCQUF3QjtFQUN4QixtQkFBbUI7Q0FDcEI7O0FBRUQ7RUFDRSxlQUFlO0NBQ2hCOztBQUVEO0VBQ0Usa0JBQWtCO0NBQ25COztBQUVEO0VBQ0UsaUJBQWlCO0NBQ2xCOztBQUVEO0VBQ0UsY0FBYztDQUNmIiwiZmlsZSI6InNyYy9hcHAvdmlld3MvbWUvYm9va2luZy9ib29raW5nLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYnV0dG9uLWdyb3VwIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgbWFyZ2luOiAzMHB4IDAgMCAwO1xyXG59XHJcblxyXG4uYnRuIHtcclxuICBtYXJnaW46IDAgMTBweDtcclxufVxyXG5cclxuLmljb24ge1xyXG4gIG1hcmdpbi1yaWdodDogNXB4O1xyXG59XHJcblxyXG4uc2Vjb25kLXBhbmVsIHtcclxuICBtYXJnaW4tdG9wOiAzMHB4O1xyXG59XHJcblxyXG4uY29sdW1uIHtcclxuICBtYXJnaW46IDVweCAwO1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/views/me/booking/booking.component.html":
/*!*********************************************************!*\
  !*** ./src/app/views/me/booking/booking.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"schema && booking\">\r\n  <ab-panel [schema]=\"schema.firstPanel\">\r\n    <panel-body>\r\n      <div *ngIf=\"booking\"\r\n           class=\"columns\">\r\n        <ng-container *ngFor=\"let field of schema.fields; let i = index\">\r\n          <div class=\"column col-12 text-center\">\r\n            <b class=\"text-bold\"> {{ field.label }}: </b>\r\n            <ng-container [ngSwitch]=\"field.key\">\r\n              <ab-pill *ngSwitchCase=\"'status'\"\r\n                       [text]=\"booking[field.key]\"></ab-pill>\r\n              <span *ngSwitchDefault>{{ booking[field.key] }}</span>\r\n            </ng-container>\r\n          </div>\r\n        </ng-container>\r\n      </div>\r\n      <ng-container *ngIf=\"(booking.status === 'ACTIVE') || (booking.status !== 'ACTIVE' && !booking.rating)\">\r\n        <div class=\"button-group\">\r\n          <button *ngIf=\"booking.status === 'ACTIVE'\"\r\n                  class=\"btn btn-primary\"\r\n                  (click)=\"onShowEditModal()\">\r\n            <i class=\"icon icon-edit\"></i>Editar reserva</button>\r\n          <button *ngIf=\"booking.status === 'ACTIVE'\"\r\n                  class=\"btn btn-primary\"\r\n                  (click)=\"onShowCancelModal()\">\r\n            <i class=\"icon icon-cross\"></i>Cancelar reserva</button>\r\n          <button *ngIf=\"booking.status !== 'ACTIVE' && !booking.rating\"\r\n                  class=\"btn btn-primary\"\r\n                  (click)=\"onShowRateModal()\">\r\n            <i class=\"icon icon-emoji\"></i>Valorar reserva</button>\r\n        </div>\r\n      </ng-container>\r\n    </panel-body>\r\n  </ab-panel>\r\n  <div *ngIf=\"schema && booking.rating\"\r\n       class=\"second-panel\">\r\n    <ab-panel [schema]=\"schema.secondPanel\">\r\n      <panel-body>\r\n        <div class=\"column col-12 text-center\">\r\n          <b class=\"text-bold\">Puntuación: </b>\r\n          <span>{{ booking.rating.score }} sobre 5</span>\r\n        </div>\r\n        <div class=\"column col-12 text-center\">\r\n          <b class=\"text-bold\">Comentarios: </b>\r\n          <span>{{ booking.rating.comments }}</span>\r\n        </div>\r\n      </panel-body>\r\n    </ab-panel>\r\n  </div>\r\n  <ab-modal title=\"Editar reserva\"\r\n            [active]=\"showEditModal\"\r\n            (close)=\"showEditModal = false\">\r\n    <modal-content>\r\n      <ab-form [formSchema]=\"schema.editForm\"\r\n               (send)=\"onEdit($event)\">\r\n      </ab-form>\r\n    </modal-content>\r\n  </ab-modal>\r\n  <ab-modal title=\"Cancelar reserva\"\r\n            [active]=\"showCancelModal\"\r\n            (close)=\"showCancelModal = false\">\r\n    <modal-content>\r\n      <ab-card [data]=\"booking\"\r\n               [schema]=\"cardSchema\">\r\n      </ab-card>\r\n    </modal-content>\r\n    <modal-footer>\r\n      <button (click)=\"showCancelModal = false\"\r\n              class=\"btn btn-link\">Non, deixar</button>\r\n      <button (click)=\"onDelete()\"\r\n              class=\"btn btn-primary\">Si, cancelar</button>\r\n    </modal-footer>\r\n  </ab-modal>\r\n  <ab-modal title=\"Valorar oferta\"\r\n            [active]=\"showRateModal\"\r\n            (close)=\"showRateModal = false\">\r\n    <modal-content>\r\n      <ab-form [formSchema]=\"schema.rateForm\"\r\n               (send)=\"onRate($event)\">\r\n      </ab-form>\r\n    </modal-content>\r\n  </ab-modal>\r\n</ng-container>\r\n"

/***/ }),

/***/ "./src/app/views/me/booking/booking.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/views/me/booking/booking.component.ts ***!
  \*******************************************************/
/*! exports provided: BookingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookingComponent", function() { return BookingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var app_views_me_me_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/views/me/me.service */ "./src/app/views/me/me.service.ts");
/* harmony import */ var app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/tools/components/schema.service */ "./src/app/tools/components/schema.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_tools_bus_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/tools/bus.service */ "./src/app/tools/bus.service.ts");
/* harmony import */ var app_tools_message_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/tools/message.model */ "./src/app/tools/message.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BookingComponent = /** @class */ (function () {
    function BookingComponent(bus, route, me, schemaService) {
        this.bus = bus;
        this.route = route;
        this.me = me;
        this.schemaService = schemaService;
        this.showEditModal = false;
        this.showCancelModal = false;
        this.showRateModal = false;
    }
    BookingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.bookingId = params['bookingId'];
            _this.schemaService.getSchema$('me_booking').subscribe(function (schema) {
                _this.schema = schema;
                _this.cardSchema = { header: { title: '' }, fields: _this.schema.fields };
                _this.getBooking();
            });
        });
    };
    BookingComponent.prototype.getBooking = function () {
        var _this = this;
        this.me.getBooking(this.bookingId).subscribe(function (booking) {
            _this.booking = booking;
            _this.schema.firstPanel.header.title += (' para ' + _this.booking.event.name);
            _this.schemaService.populateDefaultValues(_this.schema.editForm, _this.booking);
        });
    };
    BookingComponent.prototype.onShowEditModal = function () {
        this.showEditModal = true;
    };
    BookingComponent.prototype.onShowCancelModal = function () {
        this.showCancelModal = true;
    };
    BookingComponent.prototype.onShowRateModal = function () {
        this.showRateModal = true;
    };
    BookingComponent.prototype.onEdit = function (data) {
        var _this = this;
        var bookingTemp = Object.assign({}, this.booking);
        bookingTemp.comments = data.comments;
        bookingTemp.seats = data.seats;
        bookingTemp.eventId = this.booking.event._id;
        delete bookingTemp.event;
        this.me.editBooking(bookingTemp).subscribe(function (booking) {
            _this.getBooking();
            _this.showEditModal = false;
            _this.bus.emit({ level: app_tools_message_model__WEBPACK_IMPORTED_MODULE_5__["Level"].SUCCESS, text: 'Reserva editada con éxito', code: '' });
        });
    };
    BookingComponent.prototype.onDelete = function () {
        var _this = this;
        var bookingTemp = Object.assign({}, this.booking);
        bookingTemp.eventId = this.booking.event._id;
        delete bookingTemp.event;
        this.me.changeBookingStatus(bookingTemp, 'CANCELED').subscribe(function () {
            _this.getBooking();
            _this.showCancelModal = false;
            _this.bus.emit({ level: app_tools_message_model__WEBPACK_IMPORTED_MODULE_5__["Level"].SUCCESS, text: 'Reserva cancelada con éxito', code: '' });
        });
    };
    BookingComponent.prototype.onRate = function (payload) {
        var _this = this;
        this.me.rateBooking(this.bookingId, payload).subscribe(function (booking) {
            _this.booking = booking;
            _this.showRateModal = false;
            _this.bus.emit({ level: app_tools_message_model__WEBPACK_IMPORTED_MODULE_5__["Level"].SUCCESS, text: 'Valoración enviada con éxito', code: '' });
        });
    };
    BookingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ab-booking',
            template: __webpack_require__(/*! ./booking.component.html */ "./src/app/views/me/booking/booking.component.html"),
            styles: [__webpack_require__(/*! ./booking.component.css */ "./src/app/views/me/booking/booking.component.css")]
        }),
        __metadata("design:paramtypes", [app_tools_bus_service__WEBPACK_IMPORTED_MODULE_4__["BusService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            app_views_me_me_service__WEBPACK_IMPORTED_MODULE_1__["MeService"],
            app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_2__["SchemaService"]])
    ], BookingComponent);
    return BookingComponent;
}());



/***/ }),

/***/ "./src/app/views/me/bookings/bookings.component.html":
/*!***********************************************************!*\
  !*** ./src/app/views/me/bookings/bookings.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"schema\">\r\n  <ab-panel [schema]=\"{}\">\r\n    <panel-body>\r\n      <ab-editor [actionSchema]=\"schema.actions\"\r\n                 [tableData]=\"bookings\"\r\n                 [cardSchema]=\"cardSchema\"\r\n                 [reportSchema]=\"schema.report\"\r\n                 [filterSchema]=\"'bookings_filter'\"\r\n                 [cardSchema]=\"schema.cardSchema\"\r\n                 (filter)=\"onFilter($event)\">\r\n      </ab-editor>\r\n    </panel-body>\r\n  </ab-panel>\r\n</ng-container>\r\n"

/***/ }),

/***/ "./src/app/views/me/bookings/bookings.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/views/me/bookings/bookings.component.ts ***!
  \*********************************************************/
/*! exports provided: BookingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookingsComponent", function() { return BookingsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_views_me_me_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/views/me/me.service */ "./src/app/views/me/me.service.ts");
/* harmony import */ var app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/tools/components/schema.service */ "./src/app/tools/components/schema.service.ts");
/* harmony import */ var app_tools_bus_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/tools/bus.service */ "./src/app/tools/bus.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BookingsComponent = /** @class */ (function () {
    function BookingsComponent(bus, route, me, schemaService) {
        this.bus = bus;
        this.route = route;
        this.me = me;
        this.schemaService = schemaService;
    }
    BookingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.eventId = params['eventId'];
            _this.schemaService.getSchema$('me_bookings').subscribe(function (schema) {
                _this.schema = schema;
                _this.cardSchema = { header: { title: '' }, fields: _this.schema.report.fields };
                _this.getBookings();
            });
        });
    };
    BookingsComponent.prototype.onFilter = function (payload) {
        this.getBookings(payload);
    };
    BookingsComponent.prototype.getBookings = function (payload) {
        var _this = this;
        this.me.getBookingsByUserId(payload)
            .subscribe(function (bookings) {
            _this.bookings = bookings;
        });
    };
    BookingsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ab-bookings',
            template: __webpack_require__(/*! ./bookings.component.html */ "./src/app/views/me/bookings/bookings.component.html"),
            styles: []
        }),
        __metadata("design:paramtypes", [app_tools_bus_service__WEBPACK_IMPORTED_MODULE_4__["BusService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            app_views_me_me_service__WEBPACK_IMPORTED_MODULE_2__["MeService"],
            app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_3__["SchemaService"]])
    ], BookingsComponent);
    return BookingsComponent;
}());



/***/ }),

/***/ "./src/app/views/me/event-bookings/event-bookings.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/views/me/event-bookings/event-bookings.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ab-panel [schema]=\"{}\">\r\n  <panel-body>\r\n    <ab-editor [actionSchema]=\"schema?.actions\"\r\n               [tableData]=\"bookings\"\r\n               [cardSchema]=\"cardSchema\"\r\n               [reportSchema]=\"schema?.report\"\r\n               (rowAction)=\"onRowAction($event)\"\r\n               [cardSchema]=\"schema?.cardSchema\"\r\n               (delete)=\"onDelete($event)\">\r\n    </ab-editor>\r\n  </panel-body>\r\n</ab-panel>\r\n<ab-modal [title]=\"'Observacións sobre ' + selectedBooking.owner.name\"\r\n          [active]=\"showObservationsModal\"\r\n          (close)=\"showObservationsModal = false\"\r\n          *ngIf=\"selectedBooking\">\r\n  <modal-content>\r\n    <p>{{ selectedBooking.observation }}</p>\r\n  </modal-content>\r\n</ab-modal>\r\n"

/***/ }),

/***/ "./src/app/views/me/event-bookings/event-bookings.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/views/me/event-bookings/event-bookings.component.ts ***!
  \*********************************************************************/
/*! exports provided: EventBookingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventBookingsComponent", function() { return EventBookingsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/tools/components/schema.service */ "./src/app/tools/components/schema.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_views_me_me_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/views/me/me.service */ "./src/app/views/me/me.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EventBookingsComponent = /** @class */ (function () {
    function EventBookingsComponent(route, me, schemaService) {
        this.route = route;
        this.me = me;
        this.schemaService = schemaService;
        this.showObservationsModal = false;
    }
    EventBookingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.eventSlug = params['slug'];
            _this.schemaService.getSchema$('me_event_bookings').subscribe(function (schema) {
                _this.schema = schema;
                _this.cardSchema = { header: { title: '' }, fields: _this.schema.report.fields };
                _this.getEvent();
            });
        });
    };
    EventBookingsComponent.prototype.getEvent = function () {
        var _this = this;
        this.me.getEventBySlug(this.eventSlug).subscribe(function (event) {
            _this.event = event[0];
            // this.schema.actions.actions[0].link = '/me/events-ushier/' + this.event.slug + '/bookings';
            _this.populateEventInfo();
            _this.getBookings();
        });
    };
    ;
    EventBookingsComponent.prototype.getBookings = function () {
        var _this = this;
        this.me.getBookingsByEventId(this.event._id).subscribe(function (bookings) {
            _this.bookings = bookings;
        });
    };
    EventBookingsComponent.prototype.populateEventInfo = function () {
        if (this.event.name && this.event.name.length > 0) {
            this.schema.actions.header.title = this.schema.actions.header.title + ' - ' + this.event.name;
        }
        this.schema.actions.header.title +=
            ' - ' + new Date(this.event.date).toLocaleString().split(' ')[0]
                + ' ' + this.event.shift;
    };
    EventBookingsComponent.prototype.onRowAction = function (action) {
        var _this = this;
        if (action.key === 'activate') {
            this.me.changeBookingStatus(action.value, 'ACTIVE').subscribe(function () {
                _this.getBookings();
            });
        }
        else {
            this.selectedBooking = action.value;
            console.log(this.selectedBooking);
            this.showObservationsModal = true;
        }
    };
    EventBookingsComponent.prototype.onDelete = function (action) {
        var _this = this;
        this.me.changeBookingStatus(action, 'CANCELED').subscribe(function () {
            _this.getBookings();
        });
    };
    EventBookingsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ab-event-bookings',
            template: __webpack_require__(/*! ./event-bookings.component.html */ "./src/app/views/me/event-bookings/event-bookings.component.html"),
            styles: []
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            app_views_me_me_service__WEBPACK_IMPORTED_MODULE_3__["MeService"],
            app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_1__["SchemaService"]])
    ], EventBookingsComponent);
    return EventBookingsComponent;
}());



/***/ }),

/***/ "./src/app/views/me/event-print/event-print.component.css":
/*!****************************************************************!*\
  !*** ./src/app/views/me/event-print/event-print.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".navbar {\r\n  height: 60px;\r\n  margin-bottom: 30px;\r\n}\r\n\r\n.bookings {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.booking {\r\n  display: flex;\r\n  flex-direction: row;\r\n}\r\n\r\n.booking p {\r\n  margin: 0;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlld3MvbWUvZXZlbnQtcHJpbnQvZXZlbnQtcHJpbnQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQWE7RUFDYixvQkFBb0I7Q0FDckI7O0FBRUQ7RUFDRSxjQUFjO0VBQ2QsdUJBQXVCO0NBQ3hCOztBQUVEO0VBQ0UsY0FBYztFQUNkLG9CQUFvQjtDQUNyQjs7QUFFRDtFQUNFLFVBQVU7Q0FDWCIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL21lL2V2ZW50LXByaW50L2V2ZW50LXByaW50LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubmF2YmFyIHtcclxuICBoZWlnaHQ6IDYwcHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcclxufVxyXG5cclxuLmJvb2tpbmdzIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbn1cclxuXHJcbi5ib29raW5nIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbn1cclxuXHJcbi5ib29raW5nIHAge1xyXG4gIG1hcmdpbjogMDtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/views/me/event-print/event-print.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/views/me/event-print/event-print.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header class=\"navbar\">\r\n  <section class=\"navbar-section\">\r\n    <a class=\"navbar-brand\"\r\n       (click)=\"onNavigateToHome()\">{{ organization?.name }}</a>\r\n  </section>\r\n  <section class=\"navbar-section\">\r\n    <div class=\"input-group input-inline\">\r\n      <button class=\"btn btn-primary input-group-btn\"\r\n              (click)=\"onPrint()\">Imprimir</button>\r\n    </div>\r\n  </section>\r\n</header>\r\n<ng-container *ngIf=\"event\">\r\n  <h3>{{ event.name }}</h3>\r\n  <h5>{{ event.date | date }} de {{ event.startTime }} a {{ event.endTime }}</h5>\r\n  <div [innerHTML]=\"event.description\"></div>\r\n  <ul>\r\n    <li>Prazas ocupadas:\r\n      <b>{{ event.capacity - event.freeSeats }} de {{ event.capacity }}</b>\r\n    </li>\r\n  </ul>\r\n</ng-container>\r\n<h3>Reservas</h3>\r\n<div *ngIf=\"bookings && bookings.length; else: noBookings\"\r\n     class=\"bookings\">\r\n  <div *ngFor=\"let booking of bookings; let i = index\"\r\n       class=\"booking\">\r\n    <h5>{{ i + 1 }}. {{ booking.owner.name }} ({{ booking.owner.roles }}) - {{ booking.seats }} prazas</h5>\r\n    <p *ngIf=\"booking.comments\">&nbsp;- {{ booking.comments }}</p>\r\n  </div>\r\n</div>\r\n<ng-template #noBookings>\r\n  <h2>Aínda non hai reservas para este evento</h2>\r\n</ng-template>\r\n"

/***/ }),

/***/ "./src/app/views/me/event-print/event-print.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/views/me/event-print/event-print.component.ts ***!
  \***************************************************************/
/*! exports provided: EventPrintComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventPrintComponent", function() { return EventPrintComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _tools_bus_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../tools/bus.service */ "./src/app/tools/bus.service.ts");
/* harmony import */ var _me_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../me.service */ "./src/app/views/me/me.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _tools_security_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../tools/security.service */ "./src/app/tools/security.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EventPrintComponent = /** @class */ (function () {
    function EventPrintComponent(activatedRoute, busService, meService, securityService, router) {
        this.activatedRoute = activatedRoute;
        this.busService = busService;
        this.meService = meService;
        this.securityService = securityService;
        this.router = router;
    }
    EventPrintComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.busService.emitIsPrintingMode(true);
        this.getOrganization();
        this.activatedRoute.params.subscribe(function (params) {
            _this.getEvent(params.id);
            _this.getBookings(params.id);
        });
    };
    EventPrintComponent.prototype.getOrganization = function () {
        this.organization = this.securityService.getLocalOrganization();
    };
    EventPrintComponent.prototype.getEvent = function (eventId) {
        var _this = this;
        this.meService.getEventById(eventId).subscribe(function (event) {
            _this.event = event;
        });
    };
    EventPrintComponent.prototype.getBookings = function (eventId) {
        var _this = this;
        this.meService.getBookingsByEventId(eventId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (bookings) {
            return bookings.sort(function (a, b) {
                return a.name > b.name;
            });
        })).subscribe(function (bookings) {
            _this.bookings = bookings;
        });
    };
    EventPrintComponent.prototype.onNavigateToHome = function () {
        this.busService.emitIsPrintingMode(false);
        this.router.navigateByUrl('');
    };
    EventPrintComponent.prototype.onPrint = function () {
        window.print();
    };
    EventPrintComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ab-event-print',
            template: __webpack_require__(/*! ./event-print.component.html */ "./src/app/views/me/event-print/event-print.component.html"),
            styles: [__webpack_require__(/*! ./event-print.component.css */ "./src/app/views/me/event-print/event-print.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _tools_bus_service__WEBPACK_IMPORTED_MODULE_1__["BusService"],
            _me_service__WEBPACK_IMPORTED_MODULE_2__["MeService"],
            _tools_security_service__WEBPACK_IMPORTED_MODULE_4__["SecurityService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], EventPrintComponent);
    return EventPrintComponent;
}());



/***/ }),

/***/ "./src/app/views/me/event/event.component.css":
/*!****************************************************!*\
  !*** ./src/app/views/me/event/event.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".second {\r\n  margin-top: 30px;\r\n}\r\n\r\n.card-column {\r\n  padding: 0 0;\r\n}\r\n\r\n.card {\r\n  padding: 0 0;\r\n  margin-bottom: 0.8rem;\r\n}\r\n\r\n.card-header {\r\n  display: flex;\r\n}\r\n\r\n.status {\r\n  margin: 0.5rem 0;\r\n}\r\n\r\n.col-2 {\r\n  align-self: center;\r\n}\r\n\r\n.col-10 {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: left;\r\n  justify-content: space-around;\r\n  margin-left: 0.5rem;\r\n}\r\n\r\n.buttons-container {\r\n  width: 100%;\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: flex-end;\r\n}\r\n\r\nimg {\r\n  width: 100%;\r\n}\r\n\r\n.img-col {\r\n  padding-left: 0 !important;\r\n  padding-right: 0 !important;\r\n}\r\n\r\n.delete-buttons-container {\r\n  display: flex;\r\n  justify-content: flex-end;\r\n  margin-top: 1rem;\r\n}\r\n\r\n.delete-button {\r\n  margin-left: 0.5rem;\r\n}\r\n\r\n@media(max-width: 600px) {\r\n  .buttons-container {\r\n    align-items: center !important;\r\n    flex-direction: column !important;\r\n  }\r\n\r\n  .ml-2 {\r\n    margin-left: 0;\r\n    margin-top: 0.4rem;\r\n  }\r\n\r\n  .card-header {\r\n    display: block;\r\n  }\r\n\r\n  .col-10 {\r\n    margin-left: 0;\r\n    align-items: center;\r\n  }\r\n\r\n  img {\r\n    padding-bottom: 0.8rem;\r\n  }\r\n\r\n  .text-left {\r\n    margin-left: 0px;\r\n  }\r\n\r\n  .status {\r\n    margin: 0.5rem 0;\r\n  }\r\n}\r\n\r\n@media(max-width: 1280px) {\r\n  .buttons-container {\r\n    align-items: left;\r\n    justify-content: center;\r\n    flex-wrap: wrap;\r\n  }\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlld3MvbWUvZXZlbnQvZXZlbnQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGlCQUFpQjtDQUNsQjs7QUFFRDtFQUNFLGFBQWE7Q0FDZDs7QUFFRDtFQUNFLGFBQWE7RUFDYixzQkFBc0I7Q0FDdkI7O0FBRUQ7RUFDRSxjQUFjO0NBQ2Y7O0FBRUQ7RUFDRSxpQkFBaUI7Q0FDbEI7O0FBRUQ7RUFDRSxtQkFBbUI7Q0FDcEI7O0FBRUQ7RUFDRSxjQUFjO0VBQ2QsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQiw4QkFBOEI7RUFDOUIsb0JBQW9CO0NBQ3JCOztBQUVEO0VBQ0UsWUFBWTtFQUNaLGNBQWM7RUFDZCxvQkFBb0I7RUFDcEIsMEJBQTBCO0NBQzNCOztBQUVEO0VBQ0UsWUFBWTtDQUNiOztBQUVEO0VBQ0UsMkJBQTJCO0VBQzNCLDRCQUE0QjtDQUM3Qjs7QUFFRDtFQUNFLGNBQWM7RUFDZCwwQkFBMEI7RUFDMUIsaUJBQWlCO0NBQ2xCOztBQUVEO0VBQ0Usb0JBQW9CO0NBQ3JCOztBQUVEO0VBQ0U7SUFDRSwrQkFBK0I7SUFDL0Isa0NBQWtDO0dBQ25DOztFQUVEO0lBQ0UsZUFBZTtJQUNmLG1CQUFtQjtHQUNwQjs7RUFFRDtJQUNFLGVBQWU7R0FDaEI7O0VBRUQ7SUFDRSxlQUFlO0lBQ2Ysb0JBQW9CO0dBQ3JCOztFQUVEO0lBQ0UsdUJBQXVCO0dBQ3hCOztFQUVEO0lBQ0UsaUJBQWlCO0dBQ2xCOztFQUVEO0lBQ0UsaUJBQWlCO0dBQ2xCO0NBQ0Y7O0FBRUQ7RUFDRTtJQUNFLGtCQUFrQjtJQUNsQix3QkFBd0I7SUFDeEIsZ0JBQWdCO0dBQ2pCO0NBQ0YiLCJmaWxlIjoic3JjL2FwcC92aWV3cy9tZS9ldmVudC9ldmVudC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNlY29uZCB7XHJcbiAgbWFyZ2luLXRvcDogMzBweDtcclxufVxyXG5cclxuLmNhcmQtY29sdW1uIHtcclxuICBwYWRkaW5nOiAwIDA7XHJcbn1cclxuXHJcbi5jYXJkIHtcclxuICBwYWRkaW5nOiAwIDA7XHJcbiAgbWFyZ2luLWJvdHRvbTogMC44cmVtO1xyXG59XHJcblxyXG4uY2FyZC1oZWFkZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbn1cclxuXHJcbi5zdGF0dXMge1xyXG4gIG1hcmdpbjogMC41cmVtIDA7XHJcbn1cclxuXHJcbi5jb2wtMiB7XHJcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xyXG59XHJcblxyXG4uY29sLTEwIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYWxpZ24taXRlbXM6IGxlZnQ7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XHJcbiAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcclxufVxyXG5cclxuLmJ1dHRvbnMtY29udGFpbmVyIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcclxufVxyXG5cclxuaW1nIHtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLmltZy1jb2wge1xyXG4gIHBhZGRpbmctbGVmdDogMCAhaW1wb3J0YW50O1xyXG4gIHBhZGRpbmctcmlnaHQ6IDAgIWltcG9ydGFudDtcclxufVxyXG5cclxuLmRlbGV0ZS1idXR0b25zLWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xyXG4gIG1hcmdpbi10b3A6IDFyZW07XHJcbn1cclxuXHJcbi5kZWxldGUtYnV0dG9uIHtcclxuICBtYXJnaW4tbGVmdDogMC41cmVtO1xyXG59XHJcblxyXG5AbWVkaWEobWF4LXdpZHRoOiA2MDBweCkge1xyXG4gIC5idXR0b25zLWNvbnRhaW5lciB7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyICFpbXBvcnRhbnQ7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG5cclxuICAubWwtMiB7XHJcbiAgICBtYXJnaW4tbGVmdDogMDtcclxuICAgIG1hcmdpbi10b3A6IDAuNHJlbTtcclxuICB9XHJcblxyXG4gIC5jYXJkLWhlYWRlciB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICB9XHJcblxyXG4gIC5jb2wtMTAge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDA7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIH1cclxuXHJcbiAgaW1nIHtcclxuICAgIHBhZGRpbmctYm90dG9tOiAwLjhyZW07XHJcbiAgfVxyXG5cclxuICAudGV4dC1sZWZ0IHtcclxuICAgIG1hcmdpbi1sZWZ0OiAwcHg7XHJcbiAgfVxyXG5cclxuICAuc3RhdHVzIHtcclxuICAgIG1hcmdpbjogMC41cmVtIDA7XHJcbiAgfVxyXG59XHJcblxyXG5AbWVkaWEobWF4LXdpZHRoOiAxMjgwcHgpIHtcclxuICAuYnV0dG9ucy1jb250YWluZXIge1xyXG4gICAgYWxpZ24taXRlbXM6IGxlZnQ7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGZsZXgtd3JhcDogd3JhcDtcclxuICB9XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/views/me/event/event.component.html":
/*!*****************************************************!*\
  !*** ./src/app/views/me/event/event.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"column col-12 card-column\" *ngIf=\"event\">\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      <div class=\"column col-2 col-sm-12 img-col\">\r\n        <img\r\n          *ngIf=\"event?.thumbnail && event?.thumbnail.url\"\r\n          [src]=\"event?.thumbnail.url\"\r\n          class=\"img-responsive\"\r\n          (click)=\"onShowThumbnailModal()\"\r\n        />\r\n        <img\r\n          *ngIf=\"!event?.thumbnail || !event?.thumbnail.url\"\r\n          src=\"assets/images/events-placeholder.jpg\"\r\n          class=\"img-responsive\"\r\n          (click)=\"onShowThumbnailModal()\"\r\n        />\r\n      </div>\r\n      <div class=\"column col-10 col-sm-12\">\r\n        <div class=\"card-title h2 text-left\">{{ event?.name }}</div>\r\n        <div class=\"status\"><ab-pill [text]=\"event?.status\"></ab-pill></div>\r\n        <div class=\"buttons-container\">\r\n          <a\r\n            class=\"btn btn-link\"\r\n            [ngClass]=\"{ disabled: event.status === 'CANCELED' }\"\r\n            [routerLink]=\"['/org', organization.slug, 'events', event._id]\"\r\n          >\r\n            Ver oferta</a\r\n          >\r\n          <button\r\n            class=\"btn btn-link badge\"\r\n            [ngClass]=\"{ disabled: event.status === 'CANCELED' }\"\r\n            [attr.data-badge]=\"event.files ? event.files.length : 0\"\r\n            (click)=\"onScrollToFiles()\"\r\n          >\r\n            <i class=\"icon icon-link mr-1\"></i>Arquivos\r\n          </button>\r\n          <div *ngFor=\"let action of editActionsSchema\" class=\"ml-2\">\r\n            <ab-action\r\n              *ngIf=\"!action.disabled\"\r\n              [schema]=\"action\"\r\n              (action)=\"onEditAction(action.key)\"\r\n            ></ab-action>\r\n          </div>\r\n          <a class=\"btn ml-2\" [routerLink]=\"['print']\" target=\"_blank\">\r\n            <i class=\"icon icon-share mr-1\"></i>Imprimir</a\r\n          >\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<ab-panel [schema]=\"panelSchema\">\r\n  <panel-body>\r\n    <ab-form [formSchema]=\"formSchema\" (send)=\"onSend($event)\"> </ab-form>\r\n  </panel-body>\r\n</ab-panel>\r\n<ab-modal\r\n  title=\"Miniatura (menor de 1 mega) da oferta \"\r\n  [active]=\"showThumbnailModal\"\r\n  (close)=\"this.showThumbnailModal = false\"\r\n>\r\n  <modal-content>\r\n    <input\r\n      #thumbnailInput\r\n      type=\"file\"\r\n      accept=\".jpg, .jpeg, .png\"\r\n      multiple=\"false\"\r\n    />\r\n  </modal-content>\r\n  <modal-footer>\r\n    <ab-action\r\n      [schema]=\"fileConfirmButton\"\r\n      (action)=\"uploadThumbnail(this.event)\"\r\n    >\r\n    </ab-action>\r\n  </modal-footer>\r\n</ab-modal>\r\n<div class=\"second\" #filesSectionRef *ngIf=\"formKey === 'edit'\">\r\n  <ab-panel [schema]=\"{}\">\r\n    <panel-body>\r\n      <ab-tile [schema]=\"filesSchema\" (send)=\"this.showFilesModal = true\">\r\n      </ab-tile>\r\n      <ng-container *ngIf=\"formKey === 'edit' && event?.files\">\r\n        <ab-tile-compact\r\n          *ngFor=\"let file of event.files\"\r\n          [image]=\"file\"\r\n          (clicked)=\"onDeleteFile(file)\"\r\n        >\r\n        </ab-tile-compact>\r\n      </ng-container>\r\n    </panel-body>\r\n  </ab-panel>\r\n  <ab-modal\r\n    title=\"Subir arquivos\"\r\n    [active]=\"showFilesModal\"\r\n    (close)=\"this.showFilesModal = false\"\r\n  >\r\n    <modal-content>\r\n      <input #filesInput type=\"file\" multiple=\"true\" />\r\n    </modal-content>\r\n    <modal-footer>\r\n      <ab-action\r\n        [schema]=\"fileConfirmButton\"\r\n        (action)=\"uploadFiles(this.event)\"\r\n      >\r\n      </ab-action>\r\n    </modal-footer>\r\n  </ab-modal>\r\n</div>\r\n<ab-modal\r\n  [title]=\"'Modificar oferta'\"\r\n  [active]=\"isDeletingMode\"\r\n  (close)=\"onCloseDeleteModal()\"\r\n>\r\n  <modal-content>\r\n    <div\r\n      class=\"form-container\"\r\n      *ngIf=\"isDeletingMode\"\r\n      (submit)=\"onSubmitDeleteForm()\"\r\n    >\r\n      <form [formGroup]=\"deleteForm\">\r\n        <div class=\"form-group\">\r\n          <label class=\"form-switch\">\r\n            <input type=\"checkbox\" formControlName=\"sendMessage\" />\r\n            <i class=\"form-icon\"></i> Enviar mensaxe de cancelación aos\r\n            asistentes\r\n          </label>\r\n        </div>\r\n        <div class=\"form-group\" *ngIf=\"deleteForm.get('sendMessage').value\">\r\n          <label class=\"form-switch\">\r\n            <input type=\"checkbox\" formControlName=\"sendCustomMessage\" />\r\n            <i class=\"form-icon\"></i> Personalizar a mensaxe de cancelación\r\n          </label>\r\n        </div>\r\n        <div\r\n          class=\"form-group\"\r\n          *ngIf=\"\r\n            deleteForm.get('sendMessage').value &&\r\n            deleteForm.get('sendCustomMessage').value\r\n          \"\r\n        >\r\n          <label class=\"form-label\" for=\"input-example-3\">Mensaxe</label>\r\n          <textarea\r\n            class=\"form-input\"\r\n            formControlName=\"customMessage\"\r\n            placeholder=\"Mensaxe personalizada\"\r\n            rows=\"3\"\r\n          ></textarea>\r\n        </div>\r\n        <div class=\"form-group delete-buttons-container\">\r\n          <button class=\"btn\" (click)=\"onReturnFromDeletingMode()\">\r\n            Volver atrás\r\n          </button>\r\n          <button\r\n            class=\"btn btn-primary delete-button\"\r\n            type=\"submit\"\r\n            [disabled]=\"!deleteForm.valid\"\r\n          >\r\n            Eliminar oferta\r\n          </button>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </modal-content>\r\n</ab-modal>\r\n"

/***/ }),

/***/ "./src/app/views/me/event/event.component.ts":
/*!***************************************************!*\
  !*** ./src/app/views/me/event/event.component.ts ***!
  \***************************************************/
/*! exports provided: EventComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventComponent", function() { return EventComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_tools_bus_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/tools/bus.service */ "./src/app/tools/bus.service.ts");
/* harmony import */ var app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/tools/components/schema.service */ "./src/app/tools/components/schema.service.ts");
/* harmony import */ var app_tools_message_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/tools/message.model */ "./src/app/tools/message.model.ts");
/* harmony import */ var app_tools_security_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/tools/security.service */ "./src/app/tools/security.service.ts");
/* harmony import */ var app_views_me_me_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/views/me/me.service */ "./src/app/views/me/me.service.ts");
/* harmony import */ var image_compressor_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! image-compressor.js */ "./node_modules/image-compressor.js/dist/image-compressor.esm.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var YEAR_POSITION = 0;
var MONTH_POSITION = 1;
var DAY_POSITION = 2;
var DATE_LENGTH = 10;
var DAY_HOUR = 14;
var NIGHT_HOUR = 21;
var EventComponent = /** @class */ (function () {
    function EventComponent(schema, route, me, security, bus, router, fb, sanitizer) {
        this.schema = schema;
        this.route = route;
        this.me = me;
        this.security = security;
        this.bus = bus;
        this.router = router;
        this.fb = fb;
        this.sanitizer = sanitizer;
        this.formKey = 'create';
        this.showFilesModal = false;
        this.showThumbnailModal = false;
        this.fileConfirmButton = {
            label: 'Subir',
            key: 'upload'
        };
    }
    EventComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createDeleteForm();
        this.organization = this.security.getLocalOrganization();
        this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.formKey = 'edit';
                _this.me.getEventById(params['id']).subscribe(function (ev) {
                    _this.event = ev;
                    if (ev.thumbnail) {
                        var url = "data:" + ev.thumbnail.type + ";base64, " + ev.thumbnail.content;
                        ev.thumbnail.url = _this.sanitizer.bypassSecurityTrustUrl(url);
                    }
                    _this.getSchemas();
                });
            }
            else {
                _this.getSchemas();
            }
        });
    };
    EventComponent.prototype.getSchemas = function () {
        var _this = this;
        this.schema.getSchema$('me_event').subscribe(function (schemas) {
            _this.panelSchema = schemas;
            _this.filesSchema = schemas['tile-files'];
            _this.thumbnailSchema = schemas['tile-thumbnail'];
            if (_this.event) {
                _this.editActionsSchema = _this.calcButtons(schemas.editActions);
            }
            _this.formSchema = schemas[_this.formKey];
            if (_this.event) {
                _this.panelSchema.header.title = 'Información da oferta';
                _this.schema.populateDefaultValues(_this.formSchema, _this.event);
                _this.formSchema.controls[0].defaultValue = new Date(_this.event.date)
                    .toISOString()
                    .slice(0, DATE_LENGTH);
            }
            else {
                _this.schema.populateDefaultValues(_this.formSchema, _this.organization);
                _this.formSchema.controls[0].defaultValue = 'dd/mm/aaaa';
                // tslint:disable-next-line:no-magic-numbers
                _this.formSchema.controls[4].defaultValue = 'hh:mm';
                // tslint:disable-next-line:no-magic-numbers
                _this.formSchema.controls[5].defaultValue = 'hh:mm';
            }
        });
    };
    EventComponent.prototype.calcButtons = function (editActions) {
        var _this = this;
        editActions.map(function (action) {
            if (_this.event.status === 'CANCELED') {
                action.disabled = true;
            }
            else {
                if (_this.event.status === action.disabledStatus) {
                    action.disabled = true;
                }
                else {
                }
            }
        });
        return editActions;
    };
    EventComponent.prototype.createDeleteForm = function () {
        this.deleteForm = this.fb.group({
            sendMessage: [false, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            sendCustomMessage: [false, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            customMessage: ['']
        });
    };
    EventComponent.prototype.onSend = function (ev) {
        var _this = this;
        var data = Object.assign({}, ev);
        this.transformDate(data);
        if (this.formKey === 'create') {
            this.me.postEvent(data).subscribe(function (event) {
                _this.bus.emit({
                    level: app_tools_message_model__WEBPACK_IMPORTED_MODULE_6__["Level"].SUCCESS,
                    text: 'Oferta creada con éxito',
                    code: ''
                });
                _this.event = event;
                _this.formKey = 'edit';
                _this.ngOnInit();
            });
        }
        if (this.formKey === 'edit') {
            this.updateEvent(data);
            this.me.editEvent(this.event).subscribe(function (d) {
                data.ownerId = _this.event.ownerId;
                _this.ngOnInit();
                _this.bus.emit({
                    level: app_tools_message_model__WEBPACK_IMPORTED_MODULE_6__["Level"].SUCCESS,
                    text: 'Oferta editada con éxito',
                    code: ''
                });
            });
        }
    };
    EventComponent.prototype.updateEvent = function (data) {
        var _this = this;
        Object.keys(data).map(function (key) {
            _this.event[key] = data[key];
        });
    };
    EventComponent.prototype.uploadThumbnail = function (event) {
        var _this = this;
        var thumbnail = this.thumbnailInput.nativeElement.files[0];
        var kilo = 1024;
        var fileMegas = thumbnail.size / kilo / kilo;
        if (fileMegas > 1) {
            this.bus.emit({
                level: app_tools_message_model__WEBPACK_IMPORTED_MODULE_6__["Level"].ERROR,
                text: 'Máximo 1 Mega',
                code: ''
            });
            this.showThumbnailModal = false;
            return;
        }
        var reader = new FileReader();
        if (!thumbnail) {
            return (this.showThumbnailModal = false);
        }
        // tslint:disable-next-line:no-unused-expression
        new image_compressor_js__WEBPACK_IMPORTED_MODULE_9__["default"](thumbnail, {
            quality: 0.6,
            success: function (compressedFile) {
                reader.onload = function (ev) {
                    _this.me
                        .uploadThumbnail(event._id, btoa(ev.target.result), compressedFile.type)
                        .subscribe(function (updatedEvent) {
                        _this.thumbnailInput.nativeElement.value = '';
                        _this.showThumbnailModal = false;
                        _this.event = updatedEvent;
                        _this.ngOnInit();
                    });
                };
                reader.readAsBinaryString(compressedFile);
            }
        });
    };
    EventComponent.prototype.onShowThumbnailModal = function () {
        if (this.event.status !== 'CANCELED') {
            this.showThumbnailModal = true;
        }
    };
    EventComponent.prototype.uploadFiles = function (ev) {
        var _this = this;
        var filesData = this.getFilesToUpload();
        this.me.postEventFiles(ev._id, filesData).subscribe(function (d) {
            _this.filesInput.nativeElement.value = '';
            if (_this.formKey === 'edit') {
                _this.me.getEventById(_this.event._id).subscribe(function (event) {
                    _this.event = event;
                    _this.showFilesModal = false;
                });
            }
        });
    };
    EventComponent.prototype.onDeleteFile = function (file) {
        var _this = this;
        this.me.removeEventFile(this.event._id, file.name).subscribe(function (event) {
            _this.event = event;
        });
    };
    EventComponent.prototype.getFilesToUpload = function () {
        var filesToUpload = [];
        var domFiles = this.filesInput.nativeElement.files;
        var formData = new FormData();
        filesToUpload = domFiles;
        for (var i = 0; i < domFiles.length; i++) {
            formData.append('files', filesToUpload[i], filesToUpload[i]['name']);
        }
        return formData;
    };
    EventComponent.prototype.transformDate = function (event) {
        var dateArr = event.date.split('-');
        var year = dateArr[YEAR_POSITION];
        var month = dateArr[MONTH_POSITION] - 1;
        var day = dateArr[DAY_POSITION];
        var hour = 12;
        event.date = new Date(year, month, day, hour, 0, 0, 0);
        if (event.shift === 'Diurno') {
            hour = DAY_HOUR;
        }
        else {
            hour = NIGHT_HOUR;
        }
        event['time'] = new Date(year, month, day, hour, 0, 0, 0);
    };
    EventComponent.prototype.onCloseDeleteModal = function () {
        this.isDeletingMode = false;
    };
    EventComponent.prototype.onEditAction = function (key) {
        var _this = this;
        switch (key) {
            case 'activate':
                this.me.changeEventStatus(this.event, 'ACTIVE').subscribe(function () {
                    _this.ngOnInit();
                });
                break;
            case 'delete':
                this.isDeletingMode = true;
                break;
            case 'deactivate':
                this.me.changeEventStatus(this.event, 'DISABLED').subscribe(function () {
                    _this.ngOnInit();
                });
                break;
        }
    };
    EventComponent.prototype.onReturnFromDeletingMode = function () {
        this.isDeletingMode = false;
    };
    EventComponent.prototype.onSubmitDeleteForm = function () {
        var _this = this;
        var sendMessage = this.deleteForm.get('sendMessage').value;
        var sendCustomMessage = this.deleteForm.get('sendCustomMessage').value;
        var customMessage = this.deleteForm.get('customMessage').value;
        if (!sendCustomMessage) {
            this.me.cancelEvent(this.event, sendMessage, undefined).subscribe(function () {
                _this.ngOnInit();
            });
        }
        if (sendCustomMessage && customMessage) {
            this.me
                .cancelEvent(this.event, sendMessage, customMessage)
                .subscribe(function () {
                _this.ngOnInit();
            });
        }
        this.isDeletingMode = false;
    };
    EventComponent.prototype.onScrollToFiles = function (el) {
        this.filesSectionRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('thumbnailInput'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], EventComponent.prototype, "thumbnailInput", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('filesInput'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], EventComponent.prototype, "filesInput", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('filesSectionRef'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], EventComponent.prototype, "filesSectionRef", void 0);
    EventComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ab-event',
            template: __webpack_require__(/*! ./event.component.html */ "./src/app/views/me/event/event.component.html"),
            styles: [__webpack_require__(/*! ./event.component.css */ "./src/app/views/me/event/event.component.css")]
        }),
        __metadata("design:paramtypes", [app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_5__["SchemaService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            app_views_me_me_service__WEBPACK_IMPORTED_MODULE_8__["MeService"],
            app_tools_security_service__WEBPACK_IMPORTED_MODULE_7__["SecurityService"],
            app_tools_bus_service__WEBPACK_IMPORTED_MODULE_4__["BusService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"]])
    ], EventComponent);
    return EventComponent;
}());



/***/ }),

/***/ "./src/app/views/me/events-ushier/events-ushier.component.css":
/*!********************************************************************!*\
  !*** ./src/app/views/me/events-ushier/events-ushier.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".form-group {\r\n  width: 50%;\r\n  margin: 1rem auto;\r\n}\r\n\r\n.second-panel {\r\n  margin-top: 30px;\r\n}\r\n\r\n.observation-input {\r\n  width: 100%;\r\n  margin: 0;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlld3MvbWUvZXZlbnRzLXVzaGllci9ldmVudHMtdXNoaWVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFXO0VBQ1gsa0JBQWtCO0NBQ25COztBQUVEO0VBQ0UsaUJBQWlCO0NBQ2xCOztBQUVEO0VBQ0UsWUFBWTtFQUNaLFVBQVU7Q0FDWCIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL21lL2V2ZW50cy11c2hpZXIvZXZlbnRzLXVzaGllci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZvcm0tZ3JvdXAge1xyXG4gIHdpZHRoOiA1MCU7XHJcbiAgbWFyZ2luOiAxcmVtIGF1dG87XHJcbn1cclxuXHJcbi5zZWNvbmQtcGFuZWwge1xyXG4gIG1hcmdpbi10b3A6IDMwcHg7XHJcbn1cclxuXHJcbi5vYnNlcnZhdGlvbi1pbnB1dCB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWFyZ2luOiAwO1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/views/me/events-ushier/events-ushier.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/views/me/events-ushier/events-ushier.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ab-panel [schema]=\"{}\">\r\n  <panel-body>\r\n    <ab-tile [schema]=\"actionSchema\"></ab-tile>\r\n    <form [formGroup]=\"selectForm\">\r\n      <div class=\"form-group\">\r\n        <label class=\"form-label\"\r\n               for=\"input-example-1\">Selecciona un evento para ver sus reservas</label>\r\n        <select class=\"form-select\"\r\n                formControlName=\"event\">\r\n          <option value=\"\"\r\n                  hidden>-- NINGUNO --</option>\r\n          <option *ngFor=\"let event of events\"\r\n                  [value]=\"event._id\">{{ event.name }} - {{ event.date | date }}</option>\r\n        </select>\r\n      </div>\r\n    </form>\r\n  </panel-body>\r\n</ab-panel>\r\n<div class=\"second-panel\">\r\n  <ab-panel [schema]=\"{}\"\r\n            *ngIf=\"bookings !== undefined\">\r\n    <panel-body>\r\n      <ab-editor [actionSchema]=\"{header: {title: editorTitle, subtitle: 'Lista de reservas do evento'}}\"\r\n                 [tableData]=\"bookings\"\r\n                 [cardSchema]=\"{}\"\r\n                 [reportSchema]=\"reportSchema\"\r\n                 (rowAction)=\"onRowAction($event)\"\r\n                 [cardSchema]=\"schema?.cardSchema\">\r\n      </ab-editor>\r\n    </panel-body>\r\n  </ab-panel>\r\n</div>\r\n<form [formGroup]=\"observationForm\"\r\n      (submit)=\"onAddComment()\">\r\n  <ab-modal [title]=\"'Observacións sobre ' + selectedBooking.owner.name\"\r\n            [active]=\"showCommentsModal\"\r\n            (close)=\"showCommentsModal = false\"\r\n            *ngIf=\"selectedBooking\">\r\n    <modal-content>\r\n      <div class=\"form-group observation-input\">\r\n        <label class=\"form-label\">Observacións</label>\r\n        <textarea class=\"form-input\"\r\n                  formControlName=\"observation\"\r\n                  placeholder=\"Observacións\"\r\n                  rows=\"3\"></textarea>\r\n      </div>\r\n    </modal-content>\r\n    <modal-footer>\r\n      <button type=\"submit\"\r\n              class=\"btn btn-primary\"\r\n              [disabled]=\"observationForm.invalid\">Gardar observacións</button>\r\n    </modal-footer>\r\n  </ab-modal>\r\n</form>\r\n"

/***/ }),

/***/ "./src/app/views/me/events-ushier/events-ushier.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/views/me/events-ushier/events-ushier.component.ts ***!
  \*******************************************************************/
/*! exports provided: EventsUshierComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventsUshierComponent", function() { return EventsUshierComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_tools_bus_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/tools/bus.service */ "./src/app/tools/bus.service.ts");
/* harmony import */ var app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/tools/components/schema.service */ "./src/app/tools/components/schema.service.ts");
/* harmony import */ var app_tools_security_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/tools/security.service */ "./src/app/tools/security.service.ts");
/* harmony import */ var app_views_me_me_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/views/me/me.service */ "./src/app/views/me/me.service.ts");
/* harmony import */ var app_views_organization_organization_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/views/organization/organization.service */ "./src/app/views/organization/organization.service.ts");
/* harmony import */ var _tools_message_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../tools/message.model */ "./src/app/tools/message.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var TWO_DAYS = 2;
var EventsUshierComponent = /** @class */ (function () {
    function EventsUshierComponent(fb, schema, orgService, router, me, security, bus) {
        this.fb = fb;
        this.schema = schema;
        this.orgService = orgService;
        this.router = router;
        this.me = me;
        this.security = security;
        this.bus = bus;
        this.panelSchema = {};
        this.editorTitle = '';
        this.showCommentsModal = false;
    }
    EventsUshierComponent.prototype.ngOnInit = function () {
        this.getSchema();
        this.createForm();
    };
    EventsUshierComponent.prototype.getSchema = function () {
        var _this = this;
        this.schema
            .getSchema$('me_events_ushier')
            .subscribe(function (schemas) {
            _this.actionSchema = schemas.actions;
            _this.reportSchema = schemas.report;
            _this.getEvents();
        });
    };
    EventsUshierComponent.prototype.createForm = function () {
        this.selectForm = this.fb.group({
            event: ['']
        });
        this.observationForm = this.fb.group({
            observation: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
        this.onChanges();
    };
    EventsUshierComponent.prototype.onChanges = function () {
        var _this = this;
        this.selectForm.get('event').valueChanges.subscribe(function (eventId) {
            _this.getBookings(eventId);
            _this.selectedEventId = eventId;
            _this.editorTitle = _this.events.filter(function (event) { return event._id === eventId; })[0].name;
        });
    };
    EventsUshierComponent.prototype.getEvents = function () {
        var _this = this;
        this.organization = this.security.getLocalOrganization();
        var startDate = new Date();
        var endingDate = new Date();
        startDate.setDate(startDate.getDate() - TWO_DAYS);
        endingDate.setDate(endingDate.getDate() + TWO_DAYS);
        var payload = {
            organizationId: this.organization._id,
            status: 'active',
            startDate: startDate.toISOString().split('T')[0],
            endingDate: endingDate.toISOString().split('T')[0]
        };
        this.me.filterEvents(payload)
            .subscribe(function (events) {
            _this.events = events;
        });
    };
    EventsUshierComponent.prototype.getBookings = function (eventId) {
        var _this = this;
        this.me.getBookingsByEventIdAndNotStatus(eventId, 'CANCELED').subscribe(function (bookings) {
            _this.bookings = bookings;
        });
    };
    EventsUshierComponent.prototype.onRowAction = function (action) {
        var _this = this;
        var status = action.key.toUpperCase();
        if (action.key === 'comments') {
            this.selectedBooking = action.value;
            this.observation.setValue(this.selectedBooking.observation);
            this.showCommentsModal = true;
        }
        else {
            this.me.changeBookingStatus(action.value, status).subscribe(function (booking) {
                _this.getBookings(_this.selectedEventId);
            });
        }
    };
    EventsUshierComponent.prototype.onAddComment = function () {
        var _this = this;
        this.selectedBooking.observation = this.observation.value;
        this.me.updateBooking(this.selectedBooking).subscribe(function (res) {
            _this.bus.emit({ level: _tools_message_model__WEBPACK_IMPORTED_MODULE_8__["Level"].SUCCESS, text: 'Observacións gardadas con éxito', code: '' });
            _this.selectedBooking = res;
            _this.showCommentsModal = false;
        });
    };
    Object.defineProperty(EventsUshierComponent.prototype, "observation", {
        get: function () {
            return this.observationForm.get('observation');
        },
        enumerable: true,
        configurable: true
    });
    EventsUshierComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ab-events-ushier',
            template: __webpack_require__(/*! ./events-ushier.component.html */ "./src/app/views/me/events-ushier/events-ushier.component.html"),
            styles: [__webpack_require__(/*! ./events-ushier.component.css */ "./src/app/views/me/events-ushier/events-ushier.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_4__["SchemaService"],
            app_views_organization_organization_service__WEBPACK_IMPORTED_MODULE_7__["OrganizationService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            app_views_me_me_service__WEBPACK_IMPORTED_MODULE_6__["MeService"],
            app_tools_security_service__WEBPACK_IMPORTED_MODULE_5__["SecurityService"],
            app_tools_bus_service__WEBPACK_IMPORTED_MODULE_3__["BusService"]])
    ], EventsUshierComponent);
    return EventsUshierComponent;
}());



/***/ }),

/***/ "./src/app/views/me/events/events.component.css":
/*!******************************************************!*\
  !*** ./src/app/views/me/events/events.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL21lL2V2ZW50cy9ldmVudHMuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/views/me/events/events.component.html":
/*!*******************************************************!*\
  !*** ./src/app/views/me/events/events.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ab-panel [schema]=\"panelSchema\">\r\n  <panel-body>\r\n    <ab-editor [actionSchema]=\"actionSchema\"\r\n               [tableData]=\"events\"\r\n               [reportSchema]=\"reportSchema\"\r\n               [createFormSchema]=\"\"\r\n               [cardSchema]=\"cardSchema\"\r\n               [filterSchema]=\"'events_filter'\"\r\n               (filter)=\"onFilter($event)\"\r\n               (rowAction)=\"onRowAction($event)\"\r\n               (delete)=\"onDelete($event)\">\r\n    </ab-editor>\r\n  </panel-body>\r\n</ab-panel>\r\n"

/***/ }),

/***/ "./src/app/views/me/events/events.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/views/me/events/events.component.ts ***!
  \*****************************************************/
/*! exports provided: EventsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventsComponent", function() { return EventsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/tools/components/schema.service */ "./src/app/tools/components/schema.service.ts");
/* harmony import */ var app_tools_bus_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/tools/bus.service */ "./src/app/tools/bus.service.ts");
/* harmony import */ var app_views_me_me_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/views/me/me.service */ "./src/app/views/me/me.service.ts");
/* harmony import */ var app_tools_security_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/tools/security.service */ "./src/app/tools/security.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var EventsComponent = /** @class */ (function () {
    function EventsComponent(schema, me, router, security, bus, fb) {
        this.schema = schema;
        this.me = me;
        this.router = router;
        this.security = security;
        this.bus = bus;
        this.fb = fb;
        this.panelSchema = {};
    }
    EventsComponent.prototype.ngOnInit = function () {
        this.getSchema();
    };
    EventsComponent.prototype.getSchema = function () {
        var _this = this;
        this.schema
            .getSchema$('me_events')
            .subscribe(function (schemas) {
            _this.actionSchema = schemas.actions;
            _this.reportSchema = schemas.report;
            _this.cardSchema = { header: { title: '' }, fields: _this.reportSchema.fields };
        });
        this.getOrganization();
    };
    EventsComponent.prototype.getOrganization = function () {
        this.organization = this.security.getLocalOrganization();
    };
    EventsComponent.prototype.onFilter = function (payload) {
        var _this = this;
        var params;
        if (!payload) {
            params = this.filters;
        }
        else {
            params = payload;
            this.filters = payload;
        }
        this.me.filterEvents(params)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(function (events) {
            if (events) {
                events.map(function (event) {
                    event.free = event.capacity - event.pax;
                    event.time = "De " + event.startTime + " a " + event.endTime;
                    return event;
                });
            }
            return events;
        }))
            .subscribe(function (events) {
            _this.events = events;
        });
    };
    EventsComponent.prototype.onRowAction = function (action) {
        var event = Object.assign({}, action.value);
        this.selectedEvent = event;
        switch (action.key) {
            case 'edit':
                this.router.navigateByUrl("me/events/" + this.selectedEvent._id);
                break;
        }
    };
    EventsComponent.prototype.onDelete = function (event) {
        var _this = this;
        this.me.deleteEvent(event._id).subscribe(function () {
            _this.onFilter();
        });
    };
    EventsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ab-events',
            template: __webpack_require__(/*! ./events.component.html */ "./src/app/views/me/events/events.component.html"),
            styles: [__webpack_require__(/*! ./events.component.css */ "./src/app/views/me/events/events.component.css")]
        }),
        __metadata("design:paramtypes", [app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_1__["SchemaService"],
            app_views_me_me_service__WEBPACK_IMPORTED_MODULE_3__["MeService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            app_tools_security_service__WEBPACK_IMPORTED_MODULE_4__["SecurityService"],
            app_tools_bus_service__WEBPACK_IMPORTED_MODULE_2__["BusService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"]])
    ], EventsComponent);
    return EventsComponent;
}());



/***/ }),

/***/ "./src/app/views/me/me.module.ts":
/*!***************************************!*\
  !*** ./src/app/views/me/me.module.ts ***!
  \***************************************/
/*! exports provided: MeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MeModule", function() { return MeModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _me_me_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./me/me.component */ "./src/app/views/me/me/me.component.ts");
/* harmony import */ var app_tools_components_components_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/tools/components/components.module */ "./src/app/tools/components/components.module.ts");
/* harmony import */ var app_views_me_me_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/views/me/me.routing */ "./src/app/views/me/me.routing.ts");
/* harmony import */ var app_views_me_me_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/views/me/me.service */ "./src/app/views/me/me.service.ts");
/* harmony import */ var app_views_me_users_users_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/views/me/users/users.component */ "./src/app/views/me/users/users.component.ts");
/* harmony import */ var app_views_me_organizations_organizations_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/views/me/organizations/organizations.component */ "./src/app/views/me/organizations/organizations.component.ts");
/* harmony import */ var _organization_organization_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./organization/organization.component */ "./src/app/views/me/organization/organization.component.ts");
/* harmony import */ var _events_events_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./events/events.component */ "./src/app/views/me/events/events.component.ts");
/* harmony import */ var _event_bookings_event_bookings_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./event-bookings/event-bookings.component */ "./src/app/views/me/event-bookings/event-bookings.component.ts");
/* harmony import */ var _bookings_bookings_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./bookings/bookings.component */ "./src/app/views/me/bookings/bookings.component.ts");
/* harmony import */ var _event_event_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./event/event.component */ "./src/app/views/me/event/event.component.ts");
/* harmony import */ var _events_ushier_events_ushier_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./events-ushier/events-ushier.component */ "./src/app/views/me/events-ushier/events-ushier.component.ts");
/* harmony import */ var app_views_organization_organization_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! app/views/organization/organization.service */ "./src/app/views/organization/organization.service.ts");
/* harmony import */ var _booking_booking_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./booking/booking.component */ "./src/app/views/me/booking/booking.component.ts");
/* harmony import */ var _event_print_event_print_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./event-print/event-print.component */ "./src/app/views/me/event-print/event-print.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















var MeModule = /** @class */ (function () {
    function MeModule() {
    }
    MeModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                app_views_me_me_routing__WEBPACK_IMPORTED_MODULE_4__["MeRoutingModule"],
                app_tools_components_components_module__WEBPACK_IMPORTED_MODULE_3__["ComponentsModule"]
            ],
            // tslint:disable-next-line:max-line-length
            declarations: [_me_me_component__WEBPACK_IMPORTED_MODULE_2__["MeComponent"], app_views_me_users_users_component__WEBPACK_IMPORTED_MODULE_6__["UsersComponent"], app_views_me_organizations_organizations_component__WEBPACK_IMPORTED_MODULE_7__["OrganizationsComponent"], _organization_organization_component__WEBPACK_IMPORTED_MODULE_8__["OrganizationComponent"], _events_events_component__WEBPACK_IMPORTED_MODULE_9__["EventsComponent"], _event_bookings_event_bookings_component__WEBPACK_IMPORTED_MODULE_10__["EventBookingsComponent"], _bookings_bookings_component__WEBPACK_IMPORTED_MODULE_11__["BookingsComponent"], _event_event_component__WEBPACK_IMPORTED_MODULE_12__["EventComponent"], _events_ushier_events_ushier_component__WEBPACK_IMPORTED_MODULE_13__["EventsUshierComponent"], _booking_booking_component__WEBPACK_IMPORTED_MODULE_15__["BookingComponent"], _event_print_event_print_component__WEBPACK_IMPORTED_MODULE_16__["EventPrintComponent"]],
            providers: [app_views_me_me_service__WEBPACK_IMPORTED_MODULE_5__["MeService"], app_views_organization_organization_service__WEBPACK_IMPORTED_MODULE_14__["OrganizationService"]],
            schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NO_ERRORS_SCHEMA"]]
        })
    ], MeModule);
    return MeModule;
}());



/***/ }),

/***/ "./src/app/views/me/me.routing.ts":
/*!****************************************!*\
  !*** ./src/app/views/me/me.routing.ts ***!
  \****************************************/
/*! exports provided: MeRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MeRoutingModule", function() { return MeRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_views_me_me_me_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/views/me/me/me.component */ "./src/app/views/me/me/me.component.ts");
/* harmony import */ var app_views_me_users_users_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/views/me/users/users.component */ "./src/app/views/me/users/users.component.ts");
/* harmony import */ var app_views_me_organizations_organizations_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/views/me/organizations/organizations.component */ "./src/app/views/me/organizations/organizations.component.ts");
/* harmony import */ var app_views_me_organization_organization_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/views/me/organization/organization.component */ "./src/app/views/me/organization/organization.component.ts");
/* harmony import */ var app_views_me_events_events_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/views/me/events/events.component */ "./src/app/views/me/events/events.component.ts");
/* harmony import */ var app_views_me_event_bookings_event_bookings_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/views/me/event-bookings/event-bookings.component */ "./src/app/views/me/event-bookings/event-bookings.component.ts");
/* harmony import */ var app_views_me_bookings_bookings_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/views/me/bookings/bookings.component */ "./src/app/views/me/bookings/bookings.component.ts");
/* harmony import */ var app_views_me_event_event_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/views/me/event/event.component */ "./src/app/views/me/event/event.component.ts");
/* harmony import */ var app_views_me_events_ushier_events_ushier_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/views/me/events-ushier/events-ushier.component */ "./src/app/views/me/events-ushier/events-ushier.component.ts");
/* harmony import */ var app_views_me_booking_booking_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/views/me/booking/booking.component */ "./src/app/views/me/booking/booking.component.ts");
/* harmony import */ var _event_print_event_print_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./event-print/event-print.component */ "./src/app/views/me/event-print/event-print.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var routes = [
    {
        path: '',
        component: app_views_me_me_me_component__WEBPACK_IMPORTED_MODULE_2__["MeComponent"],
        data: { name: 'me', title: 'O meu perfil' }
    },
    {
        path: 'confirm/:userId',
        redirectTo: '/login/confirm/:userId',
        data: { name: 'me_confirm', title: 'Confirmar' }
    },
    {
        path: 'events',
        component: app_views_me_events_events_component__WEBPACK_IMPORTED_MODULE_6__["EventsComponent"],
        data: { name: 'me_events', title: 'Ofertas' }
    },
    {
        path: 'bookings',
        component: app_views_me_bookings_bookings_component__WEBPACK_IMPORTED_MODULE_8__["BookingsComponent"],
        data: { name: 'me_bookings', title: 'Reservas' }
    },
    {
        path: 'bookings/:bookingId',
        component: app_views_me_booking_booking_component__WEBPACK_IMPORTED_MODULE_11__["BookingComponent"],
        data: { name: 'me_booking', title: 'Reserva' }
    },
    {
        path: 'events/new',
        component: app_views_me_event_event_component__WEBPACK_IMPORTED_MODULE_9__["EventComponent"],
        data: { name: 'me_events_new', title: 'Nova oferta' }
    },
    {
        path: 'events/:id',
        component: app_views_me_event_event_component__WEBPACK_IMPORTED_MODULE_9__["EventComponent"],
        data: { name: 'me_events_edit', title: 'Editar oferta' }
    },
    {
        path: 'events/:id/print',
        component: _event_print_event_print_component__WEBPACK_IMPORTED_MODULE_12__["EventPrintComponent"],
        data: { name: 'me_event_bookings', title: 'Reservas' }
    },
    {
        path: 'events/:slug/bookings',
        component: app_views_me_event_bookings_event_bookings_component__WEBPACK_IMPORTED_MODULE_7__["EventBookingsComponent"],
        data: { name: 'me_event_bookings', title: 'Reservas' }
    },
    {
        path: 'events-ushier',
        component: app_views_me_events_ushier_events_ushier_component__WEBPACK_IMPORTED_MODULE_10__["EventsUshierComponent"],
        data: { name: 'me_events_ushier', title: 'Asistencia' }
    },
    {
        path: 'organizations',
        component: app_views_me_organizations_organizations_component__WEBPACK_IMPORTED_MODULE_4__["OrganizationsComponent"],
        data: { name: 'me_organizations', title: 'Centros' }
    },
    {
        path: 'organization',
        component: app_views_me_organization_organization_component__WEBPACK_IMPORTED_MODULE_5__["OrganizationComponent"],
        data: { name: 'me_organization', title: 'O meu centro' }
    },
    {
        path: 'users',
        component: app_views_me_users_users_component__WEBPACK_IMPORTED_MODULE_3__["UsersComponent"],
        data: { name: 'me_users', title: 'Usuarios' }
    }
];
var MeRoutingModule = /** @class */ (function () {
    function MeRoutingModule() {
    }
    MeRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], MeRoutingModule);
    return MeRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/me/me/me.component.html":
/*!***********************************************!*\
  !*** ./src/app/views/me/me/me.component.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ab-dashboard [schemas]=\"widgetsSchema\"\r\n              (send)=\"onSend($event)\">\r\n</ab-dashboard>\r\n<aside *ngIf=\"schemas\">\r\n  <ab-modal [title]=\"user?.name\"\r\n            [active]=\"logOutActive\"\r\n            (close)=\"logOutActive=false\">\r\n    <modal-content>\r\n      <ab-card [data]=\"user\"\r\n               [schema]=\"schemas?.card\">\r\n      </ab-card>\r\n    </modal-content>\r\n    <modal-footer>\r\n      <ab-action [schema]=\"{label:'Quedar'}\"\r\n                 btnClass=\"btn-link\"\r\n                 (action)=\"logOutActive=false\"></ab-action>\r\n      <ab-action [schema]=\"{label:'Saír'}\"\r\n                 (action)=\"onLogOutClick()\"></ab-action>\r\n    </modal-footer>\r\n  </ab-modal>\r\n</aside>\r\n<aside>\r\n  <ab-modal [title]=\"schemas?.changePassword.title\"\r\n            [active]=\"changePasswordActive\"\r\n            (close)=\"changePasswordActive=false\">\r\n    <modal-content>\r\n      <ab-form [formSchema]=\"schemas?.changePassword\"\r\n               (send)=\"onChangePasswordClick($event)\">\r\n      </ab-form>\r\n    </modal-content>\r\n    <modal-footer>\r\n      <ab-action [schema]=\"{label:'Non cambiar'}\"\r\n                 btnClass=\"btn-link\"\r\n                 (action)=\"changePasswordActive=false\"></ab-action>\r\n    </modal-footer>\r\n  </ab-modal>\r\n</aside>\r\n<aside>\r\n  <ab-modal [title]=\"schemas?.editProfile.title\"\r\n            [active]=\"editProfileActive\"\r\n            (close)=\"editProfileActive=false\">\r\n    <modal-content>\r\n      <ab-form [formSchema]=\"editProfile\"\r\n               (send)=\"onEditProfileClick($event)\">\r\n      </ab-form>\r\n    </modal-content>\r\n    <modal-footer>\r\n      <ab-action [schema]=\"{label:'Non cambiar'}\"\r\n                 btnClass=\"btn-link\"\r\n                 (action)=\"editProfileActive=false\"></ab-action>\r\n    </modal-footer>\r\n  </ab-modal>\r\n</aside>\r\n"

/***/ }),

/***/ "./src/app/views/me/me/me.component.ts":
/*!*********************************************!*\
  !*** ./src/app/views/me/me/me.component.ts ***!
  \*********************************************/
/*! exports provided: MeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MeComponent", function() { return MeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var app_tools_bus_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/tools/bus.service */ "./src/app/tools/bus.service.ts");
/* harmony import */ var app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/tools/components/schema.service */ "./src/app/tools/components/schema.service.ts");
/* harmony import */ var app_tools_security_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/tools/security.service */ "./src/app/tools/security.service.ts");
/* harmony import */ var app_views_me_me_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/views/me/me.service */ "./src/app/views/me/me.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// tslint:disable:cyclomatic-complexity





var MeComponent = /** @class */ (function () {
    function MeComponent(security, me, bus, schema) {
        this.security = security;
        this.me = me;
        this.bus = bus;
        this.schema = schema;
        this.user = null;
        this.organization = null;
    }
    MeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.schema
            .getSchema$('me')
            .subscribe(function (schema) {
            _this.schemas = schema;
            _this.getMe();
        });
    };
    MeComponent.prototype.getMe = function () {
        var _this = this;
        this.security
            .getMe()
            .subscribe(function (user) {
            if (user) {
                _this.user = user;
                _this.editProfile = _this.schemas.editProfile;
                _this.schema.populateDefaultValues(_this.editProfile, _this.user);
                _this.widgetsSchema = [];
                var userSchema = _this.schemas.userSchema;
                var userRole = _this.user.roles[0].toString().toLowerCase();
                userSchema.header.title = _this.user.name + ' - ' + userRole.toUpperCase();
                userSchema.header.subtitle = _this.user.email;
                _this.widgetsSchema.push(userSchema);
                var roleSchema = _this.schemas[userRole];
                _this.configureRoleSchemas(userRole, roleSchema);
                _this.widgetsSchema = _this.widgetsSchema.concat(roleSchema);
            }
            else {
                _this.security.logOutUser();
            }
        });
    };
    MeComponent.prototype.configureRoleSchemas = function (userRole, roleSchema) {
        var _this = this;
        if (userRole === 'god') {
            this.me.getOrganizationsCount()
                .subscribe(function (count) { return roleSchema[0].header.counter = count; });
            this.me.getUsersCount()
                .subscribe(function (count) { return roleSchema[1].header.counter = count; });
        }
        else if (userRole === 'admin') {
            this.me.getAdministratedOrganization(this.user.organizationId)
                .subscribe(function (organization) {
                _this.organization = organization;
                if (_this.organization) {
                    roleSchema[0].header.title = _this.organization.name;
                    roleSchema[0].header.subtitle = _this.organization.slogan;
                }
            });
            this.me.getUsersCount()
                .subscribe(function (count) { return roleSchema[1].header.counter = count; });
        }
        else if (userRole === 'mestre') {
        }
        else if (userRole === 'conserje') {
        }
        else if (userRole === 'interno') {
        }
        else {
            this.security.logOutUser();
        }
    };
    MeComponent.prototype.onSend = function (event) {
        if (event.key === 'logout') {
            this.logOutActive = true;
        }
        else if (event.key === 'change_password') {
            this.changePasswordActive = true;
        }
        else if (event.key === 'edit_profile') {
            this.editProfileActive = true;
        }
        else if (event.key === 'delete') {
            this.deleteUser();
        }
    };
    MeComponent.prototype.onLogOutClick = function () {
        this.logOutActive = false;
        this.security.logOutUser();
    };
    MeComponent.prototype.onChangePasswordClick = function (changePasswordClaim) {
        this.me.changePassword(changePasswordClaim).subscribe();
        this.changePasswordActive = false;
    };
    MeComponent.prototype.onEditProfileClick = function (editProfileClaim) {
        var _this = this;
        this.me.editProfile(editProfileClaim).subscribe(function (r) { return _this.security.getMe().subscribe(function () { return _this.security.navigateTo(['/']); }); });
        this.editProfileActive = false;
    };
    MeComponent.prototype.deleteUser = function () {
        var _this = this;
        this.me.deleteUser().subscribe(function () {
            _this.security.logOutUser();
        });
    };
    MeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ab-me',
            template: __webpack_require__(/*! ./me.component.html */ "./src/app/views/me/me/me.component.html"),
            styles: []
        }),
        __metadata("design:paramtypes", [app_tools_security_service__WEBPACK_IMPORTED_MODULE_3__["SecurityService"],
            app_views_me_me_service__WEBPACK_IMPORTED_MODULE_4__["MeService"],
            app_tools_bus_service__WEBPACK_IMPORTED_MODULE_1__["BusService"],
            app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_2__["SchemaService"]])
    ], MeComponent);
    return MeComponent;
}());



/***/ }),

/***/ "./src/app/views/me/organization/organization.component.css":
/*!******************************************************************!*\
  !*** ./src/app/views/me/organization/organization.component.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".second {\r\n  margin-top: 30px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlld3MvbWUvb3JnYW5pemF0aW9uL29yZ2FuaXphdGlvbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaUJBQWlCO0NBQ2xCIiwiZmlsZSI6InNyYy9hcHAvdmlld3MvbWUvb3JnYW5pemF0aW9uL29yZ2FuaXphdGlvbi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNlY29uZCB7XHJcbiAgbWFyZ2luLXRvcDogMzBweDtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/views/me/organization/organization.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/views/me/organization/organization.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section *ngIf=\"loadedMetadata;else loading\">\r\n  <ab-panel [schema]=\"schemas\">\r\n    <panel-body>\r\n      <ab-form [formSchema]=\"schemas.form\"\r\n               (send)=\"onSend($event)\">\r\n      </ab-form>\r\n    </panel-body>\r\n  </ab-panel>\r\n</section>\r\n<ng-template #loading>\r\n  <ab-load-empty-state [schema]=\"loadingPanelSchema\">\r\n  </ab-load-empty-state>\r\n</ng-template>\r\n"

/***/ }),

/***/ "./src/app/views/me/organization/organization.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/views/me/organization/organization.component.ts ***!
  \*****************************************************************/
/*! exports provided: OrganizationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrganizationComponent", function() { return OrganizationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var app_views_me_me_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/views/me/me.service */ "./src/app/views/me/me.service.ts");
/* harmony import */ var app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/tools/components/schema.service */ "./src/app/tools/components/schema.service.ts");
/* harmony import */ var app_tools_bus_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/tools/bus.service */ "./src/app/tools/bus.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var OrganizationComponent = /** @class */ (function () {
    function OrganizationComponent(bus, me, schema) {
        this.bus = bus;
        this.me = me;
        this.schema = schema;
        this.loadedMetadata = false;
        this.loadingPanelSchema = {
            loading: true,
            empty: false
        };
        this.showModal = false;
        this.fileConfirmButton = {
            label: 'Subir',
            key: 'upload',
            disabled: false
        };
    }
    OrganizationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.schema
            .getSchema$('me_organization')
            .subscribe(function (schemas) {
            _this.schemas = schemas;
            _this.tileSchema = schemas['tile'];
            _this.formSchema = schemas.form;
            _this.bus
                .getUser$()
                .subscribe(function (user) {
                _this.user = user;
                if (user && user.organizationId) {
                    _this.me
                        .getAdministratedOrganization(user.organizationId)
                        .subscribe(function (organization) {
                        if (organization.banner) {
                            _this.schemas.tile.actions[0].disabled = true;
                        }
                        _this.schemas.header.title = organization.name;
                        _this.organization = organization;
                        _this.schema.populateDefaultValues(_this.formSchema, _this.organization);
                        _this.loadedMetadata = true;
                    });
                }
            });
        });
    };
    OrganizationComponent.prototype.onSend = function (editedOrganization) {
        var _this = this;
        this.loadedMetadata = false;
        editedOrganization._id = this.organization._id;
        this.me
            .updateOrganization(editedOrganization)
            .subscribe(function (savedOrganization) {
            _this.organization = savedOrganization;
            _this.schema.populateDefaultValues(_this.formSchema, _this.organization);
            _this.loadedMetadata = true;
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('filesInput'),
        __metadata("design:type", Object)
    ], OrganizationComponent.prototype, "filesInput", void 0);
    OrganizationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ab-organization',
            template: __webpack_require__(/*! ./organization.component.html */ "./src/app/views/me/organization/organization.component.html"),
            styles: [__webpack_require__(/*! ./organization.component.css */ "./src/app/views/me/organization/organization.component.css")]
        }),
        __metadata("design:paramtypes", [app_tools_bus_service__WEBPACK_IMPORTED_MODULE_3__["BusService"],
            app_views_me_me_service__WEBPACK_IMPORTED_MODULE_1__["MeService"],
            app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_2__["SchemaService"]])
    ], OrganizationComponent);
    return OrganizationComponent;
}());



/***/ }),

/***/ "./src/app/views/me/organizations/organizations.component.css":
/*!********************************************************************!*\
  !*** ./src/app/views/me/organizations/organizations.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL21lL29yZ2FuaXphdGlvbnMvb3JnYW5pemF0aW9ucy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/views/me/organizations/organizations.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/views/me/organizations/organizations.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ab-panel [schema]=\"panelSchema\">\r\n  <panel-body>\r\n    <ab-editor [actionSchema]=\"actionSchema\"\r\n               [tableData]=\"organizations\"\r\n               [reportSchema]=\"reportSchema\"\r\n               (rowAction)=\"onRowAction($event)\"\r\n               [createFormSchema]=\"createFormSchema\"\r\n               [cardSchema]=\"cardSchema\"\r\n               (create)=\"onCreate($event)\"\r\n               (delete)=\"onDelete($event)\">\r\n    </ab-editor>\r\n    <aside *ngIf=\"setAdminFormSchema\">\r\n      <ab-modal [title]=\"setAdminFormSchema.title\"\r\n                [active]=\"activeSetAdminModal\"\r\n                (close)=\"onCloseSetAdminModal(null)\">\r\n        <modal-content>\r\n          <ab-form [formSchema]=\"setAdminFormSchema\"\r\n                   (send)=\"onCloseSetAdminModal($event)\">\r\n          </ab-form>\r\n        </modal-content>\r\n      </ab-modal>\r\n    </aside>\r\n  </panel-body>\r\n</ab-panel>\r\n"

/***/ }),

/***/ "./src/app/views/me/organizations/organizations.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/views/me/organizations/organizations.component.ts ***!
  \*******************************************************************/
/*! exports provided: OrganizationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrganizationsComponent", function() { return OrganizationsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var app_tools_bus_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/tools/bus.service */ "./src/app/tools/bus.service.ts");
/* harmony import */ var app_tools_message_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/tools/message.model */ "./src/app/tools/message.model.ts");
/* harmony import */ var app_views_me_me_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/views/me/me.service */ "./src/app/views/me/me.service.ts");
/* harmony import */ var app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/tools/components/schema.service */ "./src/app/tools/components/schema.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var OrganizationsComponent = /** @class */ (function () {
    function OrganizationsComponent(me, bus, schema) {
        this.me = me;
        this.bus = bus;
        this.schema = schema;
        this.activeSetAdminModal = false;
        this.activeCreateOrganizationModal = false;
        this.activeDeleteOrganizationModal = false;
        this.panelSchema = {};
        this.name = 'organizations';
    }
    OrganizationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.schema
            .getSchema$('me_organizations')
            .subscribe(function (schemas) {
            _this.actionSchema = schemas.actions;
            _this.createFormSchema = schemas.create;
            _this.reportSchema = schemas.report;
            _this.setAdminFormSchema = schemas.setAdmin;
            _this.cardSchema = { header: { title: '' }, fields: _this.createFormSchema.controls };
            _this.getOrganizations();
        });
    };
    OrganizationsComponent.prototype.getOrganizations = function () {
        var _this = this;
        this.me
            .getOrganizations()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["tap"])(function (data) { return _this.organizations = data; })).subscribe(this.getOrganizationsAdmins.bind(this));
    };
    OrganizationsComponent.prototype.getOrganizationsAdmins = function () {
        this.organizations.forEach(this.getOrganizationAdmin.bind(this));
    };
    OrganizationsComponent.prototype.getOrganizationAdmin = function (organization) {
        this.me
            .getOrganizationAdmin(organization._id)
            .subscribe(function (users) { return organization.admin = users ? users[0] : null; });
    };
    OrganizationsComponent.prototype.onSetAdmin = function (organization) {
        this.activeOrganization = organization;
        this.activeSetAdminModal = true;
    };
    OrganizationsComponent.prototype.onCloseSetAdminModal = function (newAdmin) {
        if (newAdmin) {
            this.setOrganizationAdmin(newAdmin);
        }
        this.activeOrganization = null;
        this.activeSetAdminModal = false;
    };
    OrganizationsComponent.prototype.onRowAction = function (data) {
        if (data.key === 'setAdmin') {
            this.onSetAdmin(data.value);
        }
    };
    OrganizationsComponent.prototype.setOrganizationAdmin = function (newAdmin) {
        var _this = this;
        newAdmin.organizationId = this.activeOrganization._id;
        this.me
            .setOrganizationAdmin(newAdmin)
            .subscribe(function (res) {
            _this.bus.emit({ level: app_tools_message_model__WEBPACK_IMPORTED_MODULE_2__["Level"].SUCCESS, text: newAdmin.name + ' asignado!!', code: '' });
            _this.getOrganizations();
        });
    };
    OrganizationsComponent.prototype.onCreate = function (newOrganization) {
        var _this = this;
        this.activeCreateOrganizationModal = false;
        if (newOrganization) {
            this.me
                .postOrganization(newOrganization)
                .subscribe(function (res) {
                _this.bus.emit({ level: app_tools_message_model__WEBPACK_IMPORTED_MODULE_2__["Level"].SUCCESS, text: newOrganization.name + ' creado!!', code: '' });
                _this.getOrganizations();
            });
        }
    };
    OrganizationsComponent.prototype.onDelete = function (oldOrganization) {
        var _this = this;
        this.activeDeleteOrganizationModal = false;
        this.me
            .deleteOrganization(oldOrganization)
            .subscribe(function (res) {
            _this.bus.emit({ level: app_tools_message_model__WEBPACK_IMPORTED_MODULE_2__["Level"].SUCCESS, text: oldOrganization.name + ' borrado!!', code: '' });
            _this.getOrganizations();
        });
    };
    OrganizationsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ab-organizations',
            template: __webpack_require__(/*! ./organizations.component.html */ "./src/app/views/me/organizations/organizations.component.html"),
            styles: [__webpack_require__(/*! ./organizations.component.css */ "./src/app/views/me/organizations/organizations.component.css")]
        }),
        __metadata("design:paramtypes", [app_views_me_me_service__WEBPACK_IMPORTED_MODULE_3__["MeService"],
            app_tools_bus_service__WEBPACK_IMPORTED_MODULE_1__["BusService"],
            app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_4__["SchemaService"]])
    ], OrganizationsComponent);
    return OrganizationsComponent;
}());



/***/ }),

/***/ "./src/app/views/me/users/users.component.css":
/*!****************************************************!*\
  !*** ./src/app/views/me/users/users.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL21lL3VzZXJzL3VzZXJzLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/views/me/users/users.component.html":
/*!*****************************************************!*\
  !*** ./src/app/views/me/users/users.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ab-panel [schema]=\"panelSchema\">\r\n  <panel-body>\r\n    <ab-editor [actionSchema]=\"actionSchema\"\r\n               [tableData]=\"users\"\r\n               [reportSchema]=\"reportSchema\"\r\n               (rowAction)=\"onRowAction($event)\"\r\n               [createFormSchema]=\"createFormSchema\"\r\n               [cardSchema]=\"cardSchema\"\r\n               [filterSchema]=\"'users_filter'\"\r\n               (filter)=\"onFilter($event)\"\r\n               (create)=\"onCreate($event)\"\r\n               (delete)=\"onDelete($event)\">\r\n    </ab-editor>\r\n  </panel-body>\r\n</ab-panel>\r\n"

/***/ }),

/***/ "./src/app/views/me/users/users.component.ts":
/*!***************************************************!*\
  !*** ./src/app/views/me/users/users.component.ts ***!
  \***************************************************/
/*! exports provided: UsersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersComponent", function() { return UsersComponent; });
/* harmony import */ var _me_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../me.service */ "./src/app/views/me/me.service.ts");
/* harmony import */ var _tools_bus_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../tools/bus.service */ "./src/app/tools/bus.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/tools/components/schema.service */ "./src/app/tools/components/schema.service.ts");
/* harmony import */ var app_tools_message_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/tools/message.model */ "./src/app/tools/message.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UsersComponent = /** @class */ (function () {
    function UsersComponent(bus, me, schema) {
        this.bus = bus;
        this.me = me;
        this.schema = schema;
        this.panelSchema = {};
    }
    UsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.schema
            .getSchema$('me_users')
            .subscribe(function (schemas) {
            _this.actionSchema = schemas.actions;
            _this.createFormSchema = schemas.create;
            _this.reportSchema = schemas.report;
            _this.cardSchema = { header: { title: '' }, fields: _this.createFormSchema.controls };
            _this.filterUsers();
        });
    };
    UsersComponent.prototype.filterUsers = function (name, status) {
        var _this = this;
        this.me
            .getUsers(name, status)
            .subscribe(function (users) { return _this.users = users; });
    };
    UsersComponent.prototype.onFilter = function (payload) {
        this.filterUsers(payload.name, payload.status);
    };
    UsersComponent.prototype.onCreate = function (data) {
        var _this = this;
        this.me.inviteUser(data).subscribe(function (r) { return _this.filterUsers(); });
    };
    UsersComponent.prototype.onDelete = function (data) {
        var _this = this;
        this.me.removeUserDefinitively(data._id).subscribe(function (r) {
            _this.bus.emit({ level: app_tools_message_model__WEBPACK_IMPORTED_MODULE_4__["Level"].SUCCESS, text: 'Usuario eliminado con éxito', code: '' });
            _this.filterUsers();
        });
    };
    UsersComponent.prototype.onRowAction = function (data) {
        var _this = this;
        switch (data.key) {
            case 'aprobe':
                this.me.approbeUser(data.value).subscribe(function (r) { return _this.filterUsers(); });
                this.bus.emit({ level: app_tools_message_model__WEBPACK_IMPORTED_MODULE_4__["Level"].SUCCESS, text: 'Usuario aprobado con éxito', code: '' });
                break;
            case 'disable':
                this.me.disableUser(data.value).subscribe(function (r) { return _this.filterUsers(); });
                this.bus.emit({ level: app_tools_message_model__WEBPACK_IMPORTED_MODULE_4__["Level"].SUCCESS, text: 'Usuario deshabilitado con éxito', code: '' });
                break;
            case 'resend':
                this.me.reInviteUser(data.value).subscribe(function (r) {
                    _this.bus.emit({ level: app_tools_message_model__WEBPACK_IMPORTED_MODULE_4__["Level"].SUCCESS, text: 'Invitación reenviada con éxito', code: '' });
                });
                break;
        }
    };
    UsersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'ab-users',
            template: __webpack_require__(/*! ./users.component.html */ "./src/app/views/me/users/users.component.html"),
            styles: [__webpack_require__(/*! ./users.component.css */ "./src/app/views/me/users/users.component.css")]
        }),
        __metadata("design:paramtypes", [_tools_bus_service__WEBPACK_IMPORTED_MODULE_1__["BusService"], _me_service__WEBPACK_IMPORTED_MODULE_0__["MeService"], app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_3__["SchemaService"]])
    ], UsersComponent);
    return UsersComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-me-me-module.js.map