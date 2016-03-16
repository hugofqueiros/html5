/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ function(module, exports, __webpack_require__) {

	var module1 = __webpack_require__(/*! ./module1.js */ 1);
	
	var random = Math.random();
	
	console.log('main,js', random);
	document.write('<div class="main">main</div>');


/***/ },
/* 1 */
/*!********************!*\
  !*** ./module1.js ***!
  \********************/
/***/ function(module, exports, __webpack_require__) {

	var module2 = __webpack_require__(/*! ./module2.js */ 2);
	
	console.log('module1.js -> module2 require', module2);
	document.write('<div class="module1">module 1</div>');


/***/ },
/* 2 */
/*!********************!*\
  !*** ./module2.js ***!
  \********************/
/***/ function(module, exports) {

	console.log('module2.js');
	document.write('<div class="module2">module 2</div>');


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map