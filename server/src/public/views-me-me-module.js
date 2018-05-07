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
 * Image Compressor v1.1.3
 * https://github.com/xkeshi/image-compressor
 *
 * Copyright (c) 2017-2018 Xkeshi
 * Released under the MIT license
 *
 * Date: 2018-03-23T01:35:12.857Z
 */

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var canvasToBlob = createCommonjsModule(function (module) {
/*
 * JavaScript Canvas to Blob
 * https://github.com/blueimp/JavaScript-Canvas-to-Blob
 *
 * Copyright 2012, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on stackoverflow user Stoive's code snippet:
 * http://stackoverflow.com/q/4998908
 */

/* global atob, Blob, define */

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
  if (false) {} else if ('object' === 'object' && module.exports) {
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

var _window = window;
var btoa = _window.btoa;

/**
 * Transform array buffer to Data URL.
 * @param {ArrayBuffer} arrayBuffer - The array buffer to transform.
 * @param {string} mimeType - The mime type of the Data URL.
 * @returns {string} The result Data URL.
 */

function arrayBufferToDataURL(arrayBuffer, mimeType) {
  var uint8 = new Uint8Array(arrayBuffer);
  var length = uint8.length;

  var data = '';
  var i = void 0;

  // TypedArray.prototype.forEach is not supported in some browsers.
  for (i = 0; i < length; i += 1) {
    data += fromCharCode(uint8[i]);
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

var _window$1 = window;
var ArrayBuffer$1 = _window$1.ArrayBuffer;
var FileReader = _window$1.FileReader;

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
          reader.onabort = reject;
          reader.onerror = reject;

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
          image.onabort = reject;
          image.onerror = reject;
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

module.exports = ".button-group {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 30px 0 0 0;\n}\n\n.btn {\n  margin: 0 10px;\n}\n\n.icon {\n  margin-right: 5px;\n}\n\n.second-panel {\n  margin-top: 30px;\n}\n\n.column {\n  margin: 5px 0;\n}"

/***/ }),

/***/ "./src/app/views/me/booking/booking.component.html":
/*!*********************************************************!*\
  !*** ./src/app/views/me/booking/booking.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"schema && booking\">\n  <ab-panel [schema]=\"schema.firstPanel\">\n    <panel-body>\n      <div *ngIf=\"booking\"\n           class=\"columns\">\n        <ng-container *ngFor=\"let field of schema.fields; let i = index\">\n          <div class=\"column col-12 text-center\">\n            <b class=\"text-bold\"> {{ field.label }}: </b>\n            <ng-container [ngSwitch]=\"field.key\">\n              <ab-pill *ngSwitchCase=\"'status'\"\n                       [text]=\"booking[field.key]\"></ab-pill>\n              <span *ngSwitchDefault>{{ booking[field.key] }}</span>\n            </ng-container>\n          </div>\n        </ng-container>\n      </div>\n      <ng-container *ngIf=\"(booking.status === 'ACTIVE') || (booking.status !== 'ACTIVE' && !booking.rating)\">\n        <div class=\"button-group\">\n          <button *ngIf=\"booking.status === 'ACTIVE'\"\n                  class=\"btn btn-primary\"\n                  (click)=\"onShowEditModal()\">\n            <i class=\"icon icon-edit\"></i>Editar reserva</button>\n          <button *ngIf=\"booking.status === 'ACTIVE'\"\n                  class=\"btn btn-primary\"\n                  (click)=\"onShowCancelModal()\">\n            <i class=\"icon icon-cross\"></i>Cancelar reserva</button>\n          <button *ngIf=\"booking.status !== 'ACTIVE' && !booking.rating\"\n                  class=\"btn btn-primary\"\n                  (click)=\"onShowRateModal()\">\n            <i class=\"icon icon-emoji\"></i>Valorar reserva</button>\n        </div>\n      </ng-container>\n    </panel-body>\n  </ab-panel>\n  <div *ngIf=\"schema && booking.rating\"\n       class=\"second-panel\">\n    <ab-panel [schema]=\"schema.secondPanel\">\n      <panel-body>\n        <div class=\"column col-12 text-center\">\n          <b class=\"text-bold\">Puntuación: </b>\n          <span>{{ booking.rating.score }} sobre 5</span>\n        </div>\n        <div class=\"column col-12 text-center\">\n          <b class=\"text-bold\">Comentarios: </b>\n          <span>{{ booking.rating.comments }}</span>\n        </div>\n      </panel-body>\n    </ab-panel>\n  </div>\n  <ab-modal title=\"Editar reserva\"\n            [active]=\"showEditModal\"\n            (close)=\"showEditModal = false\">\n    <modal-content>\n      <ab-form [formSchema]=\"schema.editForm\"\n               (send)=\"onEdit($event)\">\n      </ab-form>\n    </modal-content>\n  </ab-modal>\n  <ab-modal title=\"Cancelar reserva\"\n            [active]=\"showCancelModal\"\n            (close)=\"showCancelModal = false\">\n    <modal-content>\n      <ab-card [data]=\"booking\"\n               [schema]=\"cardSchema\">\n      </ab-card>\n    </modal-content>\n    <modal-footer>\n      <button (click)=\"showCancelModal = false\"\n              class=\"btn btn-link\">Non, deixar</button>\n      <button (click)=\"onDelete()\"\n              class=\"btn btn-primary\">Si, cancelar</button>\n    </modal-footer>\n  </ab-modal>\n  <ab-modal title=\"Valorar oferta\"\n            [active]=\"showRateModal\"\n            (close)=\"showRateModal = false\">\n    <modal-content>\n      <ab-form [formSchema]=\"schema.rateForm\"\n               (send)=\"onRate($event)\">\n      </ab-form>\n    </modal-content>\n  </ab-modal>\n</ng-container>\n"

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

module.exports = "<ng-container *ngIf=\"schema\">\n  <ab-panel [schema]=\"{}\">\n    <panel-body>\n      <ab-editor [actionSchema]=\"schema.actions\"\n                 [tableData]=\"bookings\"\n                 [cardSchema]=\"cardSchema\"\n                 [reportSchema]=\"schema.report\"\n                 [filterSchema]=\"'bookings_filter'\"\n                 [cardSchema]=\"schema.cardSchema\"\n                 (filter)=\"onFilter($event)\">\n      </ab-editor>\n    </panel-body>\n  </ab-panel>\n</ng-container>\n"

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

module.exports = "<ab-panel [schema]=\"{}\">\n  <panel-body>\n    <ab-editor [actionSchema]=\"schema?.actions\"\n               [tableData]=\"bookings\"\n               [cardSchema]=\"cardSchema\"\n               [reportSchema]=\"schema?.report\"\n               (rowAction)=\"onRowAction($event)\"\n               [cardSchema]=\"schema?.cardSchema\"\n               (delete)=\"onDelete($event)\">\n    </ab-editor>\n  </panel-body>\n</ab-panel>\n<ab-modal [title]=\"'Observacións sobre ' + selectedBooking.owner.name\"\n          [active]=\"showObservationsModal\"\n          (close)=\"showObservationsModal = false\"\n          *ngIf=\"selectedBooking\">\n  <modal-content>\n    <p>{{ selectedBooking.observation }}</p>\n  </modal-content>\n</ab-modal>\n"

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

module.exports = ".navbar {\n  height: 60px;\n  margin-bottom: 30px;\n}\n\n.bookings {\n  display: flex;\n  flex-direction: column;\n}\n\n.booking {\n  display: flex;\n  flex-direction: row;\n}\n\n.booking p {\n  margin: 0;\n}\n"

/***/ }),

/***/ "./src/app/views/me/event-print/event-print.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/views/me/event-print/event-print.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header class=\"navbar\">\n  <section class=\"navbar-section\">\n    <a class=\"navbar-brand\"\n       (click)=\"onNavigateToHome()\">{{ organization?.name }}</a>\n  </section>\n  <section class=\"navbar-section\">\n    <div class=\"input-group input-inline\">\n      <button class=\"btn btn-primary input-group-btn\"\n              (click)=\"onPrint()\">Imprimir</button>\n    </div>\n  </section>\n</header>\n<ng-container *ngIf=\"event\">\n  <h3>{{ event.name }}</h3>\n  <h5>{{ event.date | date }} de {{ event.startTime }} a {{ event.endTime }}</h5>\n  <div [innerHTML]=\"event.description\"></div>\n  <ul>\n    <li>Prazas ocupadas:\n      <b>{{ event.capacity - event.freeSeats }} de {{ event.capacity }}</b>\n    </li>\n  </ul>\n</ng-container>\n<h3>Reservas</h3>\n<div *ngIf=\"bookings && bookings.length; else: noBookings\"\n     class=\"bookings\">\n  <div *ngFor=\"let booking of bookings; let i = index\"\n       class=\"booking\">\n    <h5>{{ i + 1 }}. {{ booking.owner.name }} ({{ booking.owner.roles }}) - {{ booking.seats }} prazas</h5>\n    <p *ngIf=\"booking.comments\">&nbsp;- {{ booking.comments }}</p>\n  </div>\n</div>\n<ng-template #noBookings>\n  <h2>Aínda non hai reservas para este evento</h2>\n</ng-template>\n"

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

module.exports = ".second {\n  margin-top: 30px;\n}\n\n.card-column {\n  padding: 0 0;\n}\n\n.card {\n  padding: 0 0;\n  margin-bottom: 0.8rem;\n}\n\n.card-header {\n  display: flex;\n}\n\n.status {\n  margin: 0.5rem 0;\n}\n\n.col-2 {\n  -ms-grid-row-align: center;\n      align-self: center;\n}\n\n.col-10 {\n  display: flex;\n  flex-direction: column;\n  align-items: left;\n  justify-content: space-around;\n  margin-left: 0.5rem;\n}\n\n.buttons-container {\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n}\n\nimg {\n  width: 100%;\n}\n\n.img-col {\n  padding-left: 0 !important;\n  padding-right: 0 !important;\n}\n\n.delete-buttons-container {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 1rem;\n}\n\n.delete-button {\n  margin-left: 0.5rem;\n}\n\n@media(max-width: 600px) {\n  .buttons-container {\n    align-items: center !important;\n    flex-direction: column !important;\n  }\n\n  .ml-2 {\n    margin-left: 0;\n    margin-top: 0.4rem;\n  }\n\n  .card-header {\n    display: block;\n  }\n\n  .col-10 {\n    margin-left: 0;\n    align-items: center;\n  }\n\n  img {\n    padding-bottom: 0.8rem;\n  }\n\n  .text-left {\n    margin-left: 0px;\n  }\n\n  .status {\n    margin: 0.5rem 0;\n  }\n}\n\n@media(max-width: 1280px) {\n  .buttons-container {\n    align-items: left;\n    justify-content: center;\n    flex-wrap: wrap;\n  }\n}\n"

/***/ }),

/***/ "./src/app/views/me/event/event.component.html":
/*!*****************************************************!*\
  !*** ./src/app/views/me/event/event.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"column col-12 card-column\"\n     *ngIf=\"event\">\n  <div class=\"card\">\n    <div class=\"card-header\">\n      <div class=\"column col-2 col-sm-12 img-col\">\n        <img *ngIf=\"event?.thumbnail && event?.thumbnail.url\"\n             [src]=\"event?.thumbnail.url\"\n             class=\"img-responsive\"\n             (click)=\"onShowThumbnailModal()\">\n        <img *ngIf=\"!event?.thumbnail || !event?.thumbnail.url\"\n             src=\"assets/images/events-placeholder.jpg\"\n             class=\"img-responsive\"\n             (click)=\"onShowThumbnailModal()\">\n      </div>\n      <div class=\"column col-10 col-sm-12\">\n        <div class=\"card-title h2 text-left\">{{ event?.name }}</div>\n        <div class=\"status\">\n          <ab-pill [text]=\"event?.status\"></ab-pill>\n        </div>\n        <div class=\"buttons-container\">\n          <a class=\"btn btn-link\"\n             [ngClass]=\"{'disabled': event.status === 'CANCELED'}\"\n             [routerLink]=\"['/org', organization.slug, 'events', event._id]\">\n            Ver oferta</a>\n          <button class=\"btn btn-link badge\"\n                  [ngClass]=\"{'disabled': event.status === 'CANCELED'}\"\n                  [attr.data-badge]=\"event.files ? event.files.length : 0\"\n                  (click)=\"onScrollToFiles()\">\n            <i class=\"icon icon-link mr-1\"></i>Arquivos</button>\n          <div *ngFor=\"let action of editActionsSchema\"\n               class=\"ml-2\">\n            <ab-action *ngIf=\"!action.disabled\"\n                       [schema]=\"action\"\n                       (action)=\"onEditAction(action.key)\"></ab-action>\n          </div>\n          <a class=\"btn ml-2\"\n             [routerLink]=\"['print']\"\n             target=\"_blank\">\n            <i class=\"icon icon-share mr-1\"></i>Imprimir</a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<ab-panel [schema]=\"panelSchema\">\n  <panel-body>\n    <ab-form [formSchema]=\"formSchema\"\n             (send)=\"onSend($event)\">\n    </ab-form>\n  </panel-body>\n</ab-panel>\n<ab-modal title=\"Miniatura da oferta\"\n          [active]=\"showThumbnailModal\"\n          (close)=\"this.showThumbnailModal = false;\">\n  <modal-content>\n    <input #thumbnailInput\n           type=\"file\"\n           accept=\".jpg, .jpeg, .png\"\n           multiple=\"false\">\n  </modal-content>\n  <modal-footer>\n    <ab-action [schema]=\"fileConfirmButton\"\n               (action)=\"uploadThumbnail(this.event)\">\n    </ab-action>\n  </modal-footer>\n</ab-modal>\n<div class=\"second\"\n     #filesSectionRef\n     *ngIf=\"formKey === 'edit'\">\n  <ab-panel [schema]=\"{}\">\n    <panel-body>\n      <ab-tile [schema]=\"filesSchema\"\n               (send)=\"this.showFilesModal = true;\">\n      </ab-tile>\n      <ng-container *ngIf=\"formKey === 'edit' && event?.files\">\n        <ab-tile-compact *ngFor=\"let file of event.files\"\n                         [image]=\"file\"\n                         (clicked)=\"onDeleteFile(file)\">\n        </ab-tile-compact>\n      </ng-container>\n    </panel-body>\n  </ab-panel>\n  <ab-modal title=\"Subir arquivos\"\n            [active]=\"showFilesModal\"\n            (close)=\"this.showFilesModal = false;\">\n    <modal-content>\n      <input #filesInput\n             type=\"file\"\n             multiple=\"true\">\n    </modal-content>\n    <modal-footer>\n      <ab-action [schema]=\"fileConfirmButton\"\n                 (action)=\"uploadFiles(this.event)\">\n      </ab-action>\n    </modal-footer>\n  </ab-modal>\n</div>\n<ab-modal [title]=\"'Modificar oferta'\"\n          [active]=\"isDeletingMode\"\n          (close)=\"onCloseDeleteModal()\">\n  <modal-content>\n    <div class=\"form-container\"\n         *ngIf=\"isDeletingMode\"\n         (submit)=\"onSubmitDeleteForm()\">\n      <form [formGroup]=\"deleteForm\">\n        <div class=\"form-group\">\n          <label class=\"form-switch\">\n            <input type=\"checkbox\"\n                   formControlName=\"sendMessage\">\n            <i class=\"form-icon\"></i> Enviar mensaxe de cancelación aos asistentes\n          </label>\n        </div>\n        <div class=\"form-group\"\n             *ngIf=\"deleteForm.get('sendMessage').value\">\n          <label class=\"form-switch\">\n            <input type=\"checkbox\"\n                   formControlName=\"sendCustomMessage\">\n            <i class=\"form-icon\"></i> Personalizar a mensaxe de cancelación\n          </label>\n        </div>\n        <div class=\"form-group\"\n             *ngIf=\"deleteForm.get('sendMessage').value && deleteForm.get('sendCustomMessage').value\">\n          <label class=\"form-label\"\n                 for=\"input-example-3\">Mensaxe</label>\n          <textarea class=\"form-input\"\n                    formControlName=\"customMessage\"\n                    placeholder=\"Mensaxe personalizada\"\n                    rows=\"3\"></textarea>\n        </div>\n        <div class=\"form-group delete-buttons-container\">\n          <button class=\"btn\"\n                  (click)=\"onReturnFromDeletingMode()\">Volver atrás</button>\n          <button class=\"btn btn-primary delete-button\"\n                  type=\"submit\"\n                  [disabled]=\"!deleteForm.valid\">Eliminar oferta</button>\n        </div>\n      </form>\n    </div>\n  </modal-content>\n</ab-modal>\n"

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
/* harmony import */ var app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/tools/components/schema.service */ "./src/app/tools/components/schema.service.ts");
/* harmony import */ var app_views_me_me_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/views/me/me.service */ "./src/app/views/me/me.service.ts");
/* harmony import */ var app_tools_security_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/tools/security.service */ "./src/app/tools/security.service.ts");
/* harmony import */ var app_tools_bus_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/tools/bus.service */ "./src/app/tools/bus.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_tools_message_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/tools/message.model */ "./src/app/tools/message.model.ts");
/* harmony import */ var image_compressor_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! image-compressor.js */ "./node_modules/image-compressor.js/dist/image-compressor.esm.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










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
        this.schema
            .getSchema$('me_event')
            .subscribe(function (schemas) {
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
                _this.formSchema.controls[0].defaultValue = new Date(_this.event.date).toISOString().slice(0, 10);
            }
            else {
                _this.schema.populateDefaultValues(_this.formSchema, _this.organization);
                _this.formSchema.controls[0].defaultValue = 'dd/mm/aaaa';
                _this.formSchema.controls[4].defaultValue = 'hh:mm';
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
            sendMessage: [false, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["Validators"].required],
            sendCustomMessage: [false, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["Validators"].required],
            customMessage: ['']
        });
    };
    EventComponent.prototype.onSend = function (ev) {
        var _this = this;
        var data = Object.assign({}, ev);
        this.transformDate(data);
        if (this.formKey === 'create') {
            this.me.postEvent(data).subscribe(function (event) {
                _this.bus.emit({ level: app_tools_message_model__WEBPACK_IMPORTED_MODULE_6__["Level"].SUCCESS, text: 'Oferta creada con éxito', code: '' });
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
                _this.bus.emit({ level: app_tools_message_model__WEBPACK_IMPORTED_MODULE_6__["Level"].SUCCESS, text: 'Oferta editada con éxito', code: '' });
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
        var reader = new FileReader();
        if (!thumbnail) {
            return this.showThumbnailModal = false;
        }
        // tslint:disable-next-line:no-unused-expression
        new image_compressor_js__WEBPACK_IMPORTED_MODULE_7__["default"](thumbnail, {
            quality: 0.6,
            success: function (compressedFile) {
                reader.onload = function (ev) {
                    _this.me.uploadThumbnail(event._id, btoa(ev.target.result), compressedFile.type)
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
        var year = dateArr[0];
        var month = dateArr[1] - 1;
        var day = dateArr[2];
        var hour = 12;
        event.date = new Date(year, month, day, hour, 0, 0, 0);
        if (event.shift === 'Diurno') {
            hour = 14;
        }
        else {
            hour = 21;
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
            this.me.cancelEvent(this.event, sendMessage, customMessage).subscribe(function () {
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
        __metadata("design:paramtypes", [app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_1__["SchemaService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            app_views_me_me_service__WEBPACK_IMPORTED_MODULE_2__["MeService"],
            app_tools_security_service__WEBPACK_IMPORTED_MODULE_3__["SecurityService"],
            app_tools_bus_service__WEBPACK_IMPORTED_MODULE_4__["BusService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormBuilder"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["DomSanitizer"]])
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

module.exports = ".form-group {\n  width: 50%;\n  margin: 1rem auto;\n}\n\n.second-panel {\n  margin-top: 30px;\n}\n\n.observation-input {\n  width: 100%;\n  margin: 0;\n}\n"

/***/ }),

/***/ "./src/app/views/me/events-ushier/events-ushier.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/views/me/events-ushier/events-ushier.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ab-panel [schema]=\"{}\">\n  <panel-body>\n    <ab-tile [schema]=\"actionSchema\"></ab-tile>\n    <form [formGroup]=\"selectForm\">\n      <div class=\"form-group\">\n        <label class=\"form-label\"\n               for=\"input-example-1\">Selecciona un evento para ver sus reservas</label>\n        <select class=\"form-select\"\n                formControlName=\"event\">\n          <option value=\"\"\n                  hidden>-- NINGUNO --</option>\n          <option *ngFor=\"let event of events\"\n                  [value]=\"event._id\">{{ event.name }} - {{ event.date | date }}</option>\n        </select>\n      </div>\n    </form>\n  </panel-body>\n</ab-panel>\n<div class=\"second-panel\">\n  <ab-panel [schema]=\"{}\"\n            *ngIf=\"bookings !== undefined\">\n    <panel-body>\n      <ab-editor [actionSchema]=\"{header: {title: editorTitle, subtitle: 'Lista de reservas do evento'}}\"\n                 [tableData]=\"bookings\"\n                 [cardSchema]=\"{}\"\n                 [reportSchema]=\"reportSchema\"\n                 (rowAction)=\"onRowAction($event)\"\n                 [cardSchema]=\"schema?.cardSchema\">\n      </ab-editor>\n    </panel-body>\n  </ab-panel>\n</div>\n<form [formGroup]=\"observationForm\"\n      (submit)=\"onAddComment()\">\n  <ab-modal [title]=\"'Observacións sobre ' + selectedBooking.owner.name\"\n            [active]=\"showCommentsModal\"\n            (close)=\"showCommentsModal = false\"\n            *ngIf=\"selectedBooking\">\n    <modal-content>\n      <div class=\"form-group observation-input\">\n        <label class=\"form-label\">Observacións</label>\n        <textarea class=\"form-input\"\n                  formControlName=\"observation\"\n                  placeholder=\"Observacións\"\n                  rows=\"3\"></textarea>\n      </div>\n    </modal-content>\n    <modal-footer>\n      <button type=\"submit\"\n              class=\"btn btn-primary\"\n              [disabled]=\"observationForm.invalid\">Gardar observacións</button>\n    </modal-footer>\n  </ab-modal>\n</form>\n"

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
/* harmony import */ var app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/tools/components/schema.service */ "./src/app/tools/components/schema.service.ts");
/* harmony import */ var app_views_me_me_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/views/me/me.service */ "./src/app/views/me/me.service.ts");
/* harmony import */ var app_tools_security_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/tools/security.service */ "./src/app/tools/security.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_tools_bus_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/tools/bus.service */ "./src/app/tools/bus.service.ts");
/* harmony import */ var app_views_organization_organization_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/views/organization/organization.service */ "./src/app/views/organization/organization.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
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
            observation: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required]
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
        startDate.setDate(startDate.getDate() - 2);
        endingDate.setDate(endingDate.getDate() + 2);
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
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"],
            app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_1__["SchemaService"],
            app_views_organization_organization_service__WEBPACK_IMPORTED_MODULE_6__["OrganizationService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            app_views_me_me_service__WEBPACK_IMPORTED_MODULE_2__["MeService"],
            app_tools_security_service__WEBPACK_IMPORTED_MODULE_3__["SecurityService"],
            app_tools_bus_service__WEBPACK_IMPORTED_MODULE_5__["BusService"]])
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

module.exports = ""

/***/ }),

/***/ "./src/app/views/me/events/events.component.html":
/*!*******************************************************!*\
  !*** ./src/app/views/me/events/events.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ab-panel [schema]=\"panelSchema\">\n  <panel-body>\n    <ab-editor [actionSchema]=\"actionSchema\"\n               [tableData]=\"events\"\n               [reportSchema]=\"reportSchema\"\n               [createFormSchema]=\"\"\n               [cardSchema]=\"cardSchema\"\n               [filterSchema]=\"'events_filter'\"\n               (filter)=\"onFilter($event)\"\n               (rowAction)=\"onRowAction($event)\"\n               (delete)=\"onDelete($event)\">\n    </ab-editor>\n  </panel-body>\n</ab-panel>\n"

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

module.exports = "<ab-dashboard [schemas]=\"widgetsSchema\"\n              (send)=\"onSend($event)\">\n</ab-dashboard>\n<aside *ngIf=\"schemas\">\n  <ab-modal [title]=\"user?.name\"\n            [active]=\"logOutActive\"\n            (close)=\"logOutActive=false\">\n    <modal-content>\n      <ab-card [data]=\"user\"\n               [schema]=\"schemas?.card\">\n      </ab-card>\n    </modal-content>\n    <modal-footer>\n      <ab-action [schema]=\"{label:'Quedar'}\"\n                 btnClass=\"btn-link\"\n                 (action)=\"logOutActive=false\"></ab-action>\n      <ab-action [schema]=\"{label:'Saír'}\"\n                 (action)=\"onLogOutClick()\"></ab-action>\n    </modal-footer>\n  </ab-modal>\n</aside>\n<aside>\n  <ab-modal [title]=\"schemas?.changePassword.title\"\n            [active]=\"changePasswordActive\"\n            (close)=\"changePasswordActive=false\">\n    <modal-content>\n      <ab-form [formSchema]=\"schemas?.changePassword\"\n               (send)=\"onChangePasswordClick($event)\">\n      </ab-form>\n    </modal-content>\n    <modal-footer>\n      <ab-action [schema]=\"{label:'Non cambiar'}\"\n                 btnClass=\"btn-link\"\n                 (action)=\"changePasswordActive=false\"></ab-action>\n    </modal-footer>\n  </ab-modal>\n</aside>\n<aside>\n  <ab-modal [title]=\"schemas?.editProfile.title\"\n            [active]=\"editProfileActive\"\n            (close)=\"editProfileActive=false\">\n    <modal-content>\n      <ab-form [formSchema]=\"editProfile\"\n               (send)=\"onEditProfileClick($event)\">\n      </ab-form>\n    </modal-content>\n    <modal-footer>\n      <ab-action [schema]=\"{label:'Non cambiar'}\"\n                 btnClass=\"btn-link\"\n                 (action)=\"editProfileActive=false\"></ab-action>\n    </modal-footer>\n  </ab-modal>\n</aside>\n"

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
/* harmony import */ var app_tools_security_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/tools/security.service */ "./src/app/tools/security.service.ts");
/* harmony import */ var app_tools_bus_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/tools/bus.service */ "./src/app/tools/bus.service.ts");
/* harmony import */ var app_views_me_me_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/views/me/me.service */ "./src/app/views/me/me.service.ts");
/* harmony import */ var app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/tools/components/schema.service */ "./src/app/tools/components/schema.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





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
    // tslint:disable-next-line:cyclomatic-complexity
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
                    // roleSchema[0].actions[0].link = `me/organization/${this.organization.slug}`;
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
        __metadata("design:paramtypes", [app_tools_security_service__WEBPACK_IMPORTED_MODULE_1__["SecurityService"],
            app_views_me_me_service__WEBPACK_IMPORTED_MODULE_3__["MeService"],
            app_tools_bus_service__WEBPACK_IMPORTED_MODULE_2__["BusService"],
            app_tools_components_schema_service__WEBPACK_IMPORTED_MODULE_4__["SchemaService"]])
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

module.exports = ".second {\n  margin-top: 30px;\n}\n"

/***/ }),

/***/ "./src/app/views/me/organization/organization.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/views/me/organization/organization.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section *ngIf=\"loadedMetadata;else loading\">\n  <ab-panel [schema]=\"schemas\">\n    <panel-body>\n      <ab-form [formSchema]=\"schemas.form\"\n               (send)=\"onSend($event)\">\n      </ab-form>\n    </panel-body>\n  </ab-panel>\n</section>\n<ng-template #loading>\n  <ab-load-empty-state [schema]=\"loadingPanelSchema\">\n  </ab-load-empty-state>\n</ng-template>\n"

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

module.exports = ""

/***/ }),

/***/ "./src/app/views/me/organizations/organizations.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/views/me/organizations/organizations.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ab-panel [schema]=\"panelSchema\">\n  <panel-body>\n    <ab-editor [actionSchema]=\"actionSchema\"\n               [tableData]=\"organizations\"\n               [reportSchema]=\"reportSchema\"\n               (rowAction)=\"onRowAction($event)\"\n               [createFormSchema]=\"createFormSchema\"\n               [cardSchema]=\"cardSchema\"\n               (create)=\"onCreate($event)\"\n               (delete)=\"onDelete($event)\">\n    </ab-editor>\n    <aside *ngIf=\"setAdminFormSchema\">\n      <ab-modal [title]=\"setAdminFormSchema.title\"\n                [active]=\"activeSetAdminModal\"\n                (close)=\"onCloseSetAdminModal(null)\">\n        <modal-content>\n          <ab-form [formSchema]=\"setAdminFormSchema\"\n                   (send)=\"onCloseSetAdminModal($event)\">\n          </ab-form>\n        </modal-content>\n      </ab-modal>\n    </aside>\n  </panel-body>\n</ab-panel>\n"

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

module.exports = "\n"

/***/ }),

/***/ "./src/app/views/me/users/users.component.html":
/*!*****************************************************!*\
  !*** ./src/app/views/me/users/users.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ab-panel [schema]=\"panelSchema\">\n  <panel-body>\n    <ab-editor [actionSchema]=\"actionSchema\"\n               [tableData]=\"users\"\n               [reportSchema]=\"reportSchema\"\n               (rowAction)=\"onRowAction($event)\"\n               [createFormSchema]=\"createFormSchema\"\n               [cardSchema]=\"cardSchema\"\n               [filterSchema]=\"'users_filter'\"\n               (filter)=\"onFilter($event)\"\n               (create)=\"onCreate($event)\"\n               (delete)=\"onDelete($event)\">\n    </ab-editor>\n  </panel-body>\n</ab-panel>\n"

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