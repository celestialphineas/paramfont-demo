(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["gridpaper"] = factory();
	else
		root["gridpaper"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./test/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/GlyphOutline.ts":
/*!*****************************!*\
  !*** ./src/GlyphOutline.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar GlyphOutline = (function () {\n    function GlyphOutline(glyphName, shapes) {\n        this.advanceWidth = 600;\n        this.glyphName = 'default';\n        this.shapes = {};\n        if (glyphName)\n            this.glyphName = glyphName;\n        if (shapes)\n            this.shapes = JSON.parse(JSON.stringify(shapes));\n    }\n    GlyphOutline.prototype.transformedShapes = function (transformFunction, additionalOffset) {\n        var result = {};\n        var offset = additionalOffset || [0, 0];\n        for (var property in this.shapes) {\n            result[property] = this.shapes[property].map(function (path) { return path.map(function (segment) { return segment.map(function (point) { return transformFunction((function (pt) { return [pt[0] + offset[0], pt[1] + offset[1]]; })(point)); }); }); });\n        }\n        return result;\n    };\n    GlyphOutline.getDefault = function (name) {\n        return defaultGlyphs[name || 'circle'] || defaultGlyphs['circle'];\n    };\n    return GlyphOutline;\n}());\nexports.default = GlyphOutline;\nvar cRatio = 0.55191502449;\nvar cRadius = 300;\nvar hRadius = 200;\nvar defaultGlyphs = {\n    'circle': new GlyphOutline('circle', {\n        'main': [\n            [\n                [[cRadius, 0], [cRadius * (1 - cRatio), 0], [0, cRadius * (1 - cRatio)], [0, cRadius]],\n                [[0, cRadius], [0, cRadius * (1 + cRatio)], [cRadius * (1 - cRatio), 2 * cRadius], [cRadius, 2 * cRadius]],\n                [[cRadius, 2 * cRadius], [cRadius * (1 + cRatio), 2 * cRadius], [2 * cRadius, cRadius * (1 + cRatio)], [2 * cRadius, cRadius]],\n                [[2 * cRadius, cRadius], [2 * cRadius, cRadius * (1 - cRatio)], [cRadius * (1 + cRatio), 0], [cRadius, 0]]\n            ]\n        ]\n    }),\n    'ring': new GlyphOutline('ring', {\n        'main': [\n            [\n                [[cRadius, 0], [cRadius * (1 - cRatio), 0], [0, cRadius * (1 - cRatio)], [0, cRadius]],\n                [[0, cRadius], [0, cRadius * (1 + cRatio)], [cRadius * (1 - cRatio), 2 * cRadius], [cRadius, 2 * cRadius]],\n                [[cRadius, 2 * cRadius], [cRadius * (1 + cRatio), 2 * cRadius], [2 * cRadius, cRadius * (1 + cRatio)], [2 * cRadius, cRadius]],\n                [[2 * cRadius, cRadius], [2 * cRadius, cRadius * (1 - cRatio)], [cRadius * (1 + cRatio), 0], [cRadius, 0]]\n            ],\n            [\n                [[cRadius, cRadius - hRadius], [cRadius + hRadius * cRatio, cRadius - hRadius], [cRadius + hRadius, cRadius - hRadius * cRatio], [cRadius + hRadius, cRadius]],\n                [[cRadius - hRadius + 2 * hRadius, cRadius], [cRadius - hRadius + 2 * hRadius, cRadius + hRadius * cRatio], [cRadius + hRadius * cRatio, cRadius - hRadius + 2 * hRadius], [cRadius, cRadius + hRadius]],\n                [[cRadius, cRadius + hRadius], [cRadius - hRadius * cRatio, cRadius - hRadius + 2 * hRadius], [cRadius - hRadius, cRadius + hRadius * cRatio], [cRadius - hRadius, cRadius]],\n                [[cRadius - hRadius, cRadius], [cRadius - hRadius, cRadius - hRadius * cRatio], [cRadius - hRadius * cRatio, cRadius - hRadius], [cRadius, cRadius - hRadius]],\n            ]\n        ]\n    })\n};\n\n\n//# sourceURL=webpack://gridpaper/./src/GlyphOutline.ts?");

/***/ }),

/***/ "./src/math/VectorMath.ts":
/*!********************************!*\
  !*** ./src/math/VectorMath.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar WrappedVector = (function () {\n    function WrappedVector(vObj) {\n        this.vObj = vObj;\n        this.addPoint = function (pt1, pt2) { return [pt1[0] + pt2[0], pt1[1] + pt2[1]]; };\n        var err = Error(vObj + \" is not a Vectorial object.\");\n        if (!vObj)\n            throw err;\n        var first = vObj;\n        var count = -1;\n        while (first.constructor === Array) {\n            first = first[0];\n            count++;\n        }\n        try {\n            this.type = ['Point', 'Segment', 'Path', 'Shape'][count];\n        }\n        catch (error) {\n            throw err;\n        }\n    }\n    WrappedVector.prototype.get = function () { return this.vObj; };\n    WrappedVector.prototype.add = function (direction) {\n        var _this = this;\n        switch (this.type) {\n            case 'Point': return vec(this.addPoint(this.vObj, direction));\n            case 'Segment': return vec(this.vObj.map(function (pt) { return _this.addPoint(pt, direction); }));\n            case 'Path': return vec(this.vObj.map(function (segment) { return vec(segment).add(direction).get(); }));\n            case 'Shape': return vec(this.vObj.map(function (path) { return vec(path).add(direction).get(); }));\n        }\n    };\n    WrappedVector.prototype.inv = function () {\n        switch (this.type) {\n            case 'Point': return vec([-this.vObj[0], -this.vObj[1]]);\n            case 'Segment': return vec(this.vObj.map(function (pt) { return vec(pt).inv().get(); }));\n            case 'Path': return vec(this.vObj.map(function (segment) { return vec(segment).inv().get(); }));\n            case 'Shape': return vec(this.vObj.map(function (path) { return vec(path).inv().get(); }));\n        }\n    };\n    WrappedVector.prototype.sub = function (direction) {\n        return this.add(vec(direction).inv().get());\n    };\n    WrappedVector.prototype.mul = function (scaleX, scaleY) {\n        if (!scaleY)\n            scaleY = scaleX;\n        switch (this.type) {\n            case 'Point': return vec([this.vObj[0] * scaleX, this.vObj[1] * scaleY]);\n            case 'Segment': return vec(this.vObj.map(function (pt) { return vec(pt).mul(scaleX, scaleY).get(); }));\n            case 'Path': return vec(this.vObj.map(function (segment) { return vec(segment).mul(scaleX, scaleY).get(); }));\n            case 'Shape': return vec(this.vObj.map(function (path) { return vec(path).mul(scaleX, scaleY).get(); }));\n        }\n    };\n    WrappedVector.prototype.lmat = function (matrix) {\n        switch (this.type) {\n            case 'Point': {\n                var _a = this.vObj, x = _a[0], y = _a[1];\n                if (matrix) {\n                    var _b = matrix, _c = _b[0], a = _c[0], b = _c[1], _d = _b[1], c = _d[0], d = _d[1];\n                    return vec([a * x + b * y, c * x + d * y]);\n                }\n                else {\n                    var _e = matrix, _f = _e[0], a = _f[0], b = _f[1], c = _f[2], _g = _e[1], d = _g[0], e = _g[1], f = _g[2], _h = _e[2], g = _h[0], h = _h[1], i = _h[2];\n                    var t1 = a * x + b * y + c;\n                    var t2 = d * x + e * y + f;\n                    var t3 = g * x + h * y + i;\n                    return vec([t1 / t3, t2 / t3]);\n                }\n            }\n            case 'Segment': return vec(this.vObj.map(function (pt) { return vec(pt).lmat(matrix).get(); }));\n            case 'Path': return vec(this.vObj.map(function (segment) { return vec(segment).lmat(matrix).get(); }));\n            case 'Shape': return vec(this.vObj.map(function (path) { return vec(path).lmat(matrix).get(); }));\n        }\n    };\n    WrappedVector.prototype.rot = function (center, rad) {\n        var cx = center[0], cy = center[1];\n        var _a = [Math.cos(rad), Math.sin(rad)], cost = _a[0], sint = _a[1];\n        var mat = [\n            [cost, -sint, cx - cost * cx + sint * cy],\n            [sint, cost, cy - sint * cx - cost * cy],\n            [0, 0, 1]\n        ];\n        return this.lmat(mat);\n    };\n    return WrappedVector;\n}());\nfunction vec(vObj) {\n    return new WrappedVector(vObj);\n}\nexports.default = vec;\n\n\n//# sourceURL=webpack://gridpaper/./src/math/VectorMath.ts?");

/***/ }),

/***/ "./test/index.ts":
/*!***********************!*\
  !*** ./test/index.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\n    result[\"default\"] = mod;\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar test = __importStar(__webpack_require__(/*! ./math-unit */ \"./test/math-unit.ts\"));\nconsole.log(test.name + \" done\");\n\n\n//# sourceURL=webpack://gridpaper/./test/index.ts?");

/***/ }),

/***/ "./test/math-unit.ts":
/*!***************************!*\
  !*** ./test/math-unit.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.name = 'VectorMath unit test';\nvar VectorMath_1 = __importDefault(__webpack_require__(/*! ../src/math/VectorMath */ \"./src/math/VectorMath.ts\"));\nvar GlyphOutline_1 = __importDefault(__webpack_require__(/*! ../src/GlyphOutline */ \"./src/GlyphOutline.ts\"));\nconsole.log('1.1: Point add');\nconsole.log(VectorMath_1.default([1, 2]).add([2, 3]).get());\nconsole.log('1.2: Segment add');\nconsole.log(VectorMath_1.default([[1, 2], [-2, -3], [0, 0], [NaN, Infinity]]).add([2, 3]).get());\nconsole.log('1.3: Path add');\nconsole.log(VectorMath_1.default([\n    [[1, 2], [-2, -3], [0, 0], [NaN, Infinity]],\n    [[1, 2], [-2, -3], [0, 0], [NaN, Infinity]],\n    [[1, 2], [-2, -3], [0, 0], [NaN, Infinity]]\n]).add([2, 3]).get());\nconsole.log('1.4: Shape add');\nconsole.log(VectorMath_1.default(GlyphOutline_1.default.getDefault('ring').shapes['main']).add([2, 3]).get());\nconsole.log('1.5: NaN add');\ntry {\n    console.log(VectorMath_1.default(NaN).add([2, 3]).get());\n}\ncatch (error) {\n    console.log(error);\n}\nconsole.log('1.6: null add');\ntry {\n    console.log(VectorMath_1.default(null).add([2, 3]).get());\n}\ncatch (error) {\n    console.log(error);\n}\nconsole.log('1.7: undefined add');\ntry {\n    console.log(VectorMath_1.default(undefined).add([2, 3]).get());\n}\ncatch (error) {\n    console.log(error);\n}\nconsole.log('1.8: Infinity add');\ntry {\n    console.log(VectorMath_1.default(Infinity).add([2, 3]).get());\n}\ncatch (error) {\n    console.log(error);\n}\nconsole.log('2.1: Point inverse');\nconsole.log(VectorMath_1.default([1, 2]).inv().get());\nconsole.log('2.2: Segment inverse');\nconsole.log(VectorMath_1.default([[1, 2], [-2, -3], [0, 0], [NaN, Infinity]]).inv().get());\nconsole.log('3.2: Segment substract');\nconsole.log(VectorMath_1.default([[1, 2], [-2, -3], [0, 0], [NaN, Infinity]]).sub([1, 2]).get());\nconsole.log('3.3: Path scalar multiplication');\nconsole.log(VectorMath_1.default(GlyphOutline_1.default.getDefault('ring').shapes['main'][0]).mul(2, 3).get());\nconsole.log('5.3: Path rotation multiplication');\nconsole.log(VectorMath_1.default(GlyphOutline_1.default.getDefault('ring').shapes['main'][0]).mul(1 / 600, 1 / 200).rot([200, 300], Math.PI / 3).get());\n\n\n//# sourceURL=webpack://gridpaper/./test/math-unit.ts?");

/***/ })

/******/ });
});