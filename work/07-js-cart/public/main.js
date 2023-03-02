/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addCat": () => (/* binding */ addCat),
/* harmony export */   "fetchCatList": () => (/* binding */ fetchCatList)
/* harmony export */ });
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");

function fetchCatList() {
  return fetch("/products")["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (info) {
        return Promise.reject(info);
      });
    }
    return response.json();
  });
}
;
function addCat(name) {
  _state__WEBPACK_IMPORTED_MODULE_0__["default"].updateCart(name);
}
;

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var state = {
  cats: {},
  cart: {}
};

// cart = {'noodle': {}, 'orange': <cat>}

var storage = __webpack_require__(/*! ./storage */ "./src/storage.js");
state.updateCats = function () {
  state.cats = storage;
};
state.updateCart = function (name) {
  if (state.cart.hasOwnProperty(name)) {
    state.cart[name].data = storage[name];
  } else {
    state.cart[name] = {
      'data': storage[name]
    };
  }
  if (!state.cart[name].hasOwnProperty('quantity')) {
    state.cart[name].quantity = 0;
  }
  state.cart[name].quantity += 1;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((module) => {

var cats = {
  "Noodle": {
    "name": "Noodle",
    "img": "http://placekitten.com/150/150?image=1",
    "thumbnail": "http://placekitten.com/50/50?image=1",
    "price": 0.99
  },
  "Orange": {
    "name": "Orange",
    "img": "http://placekitten.com/150/150?image=2",
    "thumbnail": "http://placekitten.com/50/50?image=2",
    "price": 3.14
  },
  "Apple": {
    "name": "Apple",
    "img": "http://placekitten.com/150/150?image=3",
    "thumbnail": "http://placekitten.com/50/50?image=3",
    "price": 2.73
  }
};
module.exports = cats;

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function render(state, rootEl) {
  var cats = state.cats; // Destructure cats property from state into new variable
  var html = generateCatCardsHtml(cats);
  rootEl.innerHTML = html;
}
function generateCatCardsHtml(cats) {
  var listHtml = Object.keys(cats).map(function (name) {
    return "\n      <li class=\"card\">\n          ".concat(generateCatCardHtml(cats[name]), "\n        </button>\n      </li>\n    ");
  }).join('');
  return "\n    <ul class=\"cards\">\n      ".concat(listHtml, "\n    </ul>\n    <button>View Cart</button>\n  ");
}
function generateCatCardHtml(cat) {
  var imgHtml = cat.img ? "<span class=\"card__color\"> <img src=".concat(cat.img, "></span>") : "";
  var price = cat.price ? "<span class=\"card__age\">Price: ".concat(cat.price, "</span>") : "";
  var button = "<button class=\"cat__add\" data-name=\"".concat(cat.name, "\">Add to Cart</button>");
  var html = "\n    <h2 class=\"card__name\">".concat(cat.name, "</h2>\n    ").concat(imgHtml, "\n    ").concat(price, "\n    ").concat(button, "\n  ");
  return html;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view */ "./src/view.js");



var rootEl = document.querySelector('.main');
rootEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('cat__add')) {
    var name = e.target.dataset.name;
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.addCat)(name);
  }
});
(0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchCatList)().then(function (cats) {
  _state__WEBPACK_IMPORTED_MODULE_0__["default"].updateCats(cats);
  (0,_view__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
})["catch"](function (error) {
  console.warn("replace this with actual error reporting", error);
});
})();

/******/ })()
;
//# sourceMappingURL=main.js.map