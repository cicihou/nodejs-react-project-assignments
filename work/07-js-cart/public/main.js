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
/* harmony export */   "fetchCatList": () => (/* binding */ fetchCatList)
/* harmony export */ });
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
/* harmony export */   "generateCartHtml": () => (/* binding */ generateCartHtml),
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
function render(state, rootEl) {
  var cats = state.cats,
    cart = state.cart;
  rootEl.innerHTML = generateCatCardsHtml(cats, cart);
  document.querySelector('.cart__panel').style.display = 'none';
}
function generateCatCardsHtml(cats, cart) {
  var btn = cart ? "<button class=\"cart__view\">View Cart (<span class=\"cart__count\"></span>)</button>" : "";
  var listHtml = Object.keys(cats).map(function (name) {
    return "\n      <li class=\"card\">\n          ".concat(generateCatCardHtml(cats[name]), "\n        </button>\n      </li>\n    ");
  }).join('');
  return "\n    <ul class=\"cards\">\n      ".concat(listHtml, "\n    </ul>\n    ").concat(btn, "\n    <div class=\"cart__panel\"></div>\n  ");
}
function generateCatCardHtml(cat) {
  var imgHtml = cat.img ? "<span class=\"card__color\"> <img src=".concat(cat.img, "></span>") : "";
  var price = cat.price ? "<span class=\"card__age\">Price: ".concat(cat.price, "</span>") : "";
  var button = "<button class=\"cat__add\" data-name=\"".concat(cat.name, "\">Add to Cart</button>");
  return "\n    <h2 class=\"card__name\">".concat(cat.name, "</h2>\n    ").concat(imgHtml, "\n    ").concat(price, "\n    ").concat(button, "\n  ");
}
function generateCartHtml(cart, cartRoot) {
  var totalCost = 0;
  var cartPanel = Object.keys(cart).map(function (name) {
    var info = cart[name].data;
    var totalPrice = Number((cart[name].quantity * info.price).toFixed(2));
    console.log(totalPrice);
    totalCost = (Number(totalCost) + totalPrice).toFixed(2);
    return "\n      <li class=\"cart__item\">\n        <div class=\"cart__item_info\">\n          <img src=".concat(info.thumbnail, ">\n          <div class=\"info\">\n            <p>").concat(info.name, "</p>\n            <p>Price: ").concat(info.price, "</p>\n          </div>\n        </div>\n        <div class=\"cart__item_op\">\n            <div class=\"quantity\">\n                Quantity: \n                <span class=\"quantity__number\">").concat(cart[name].quantity, "</span>\n                <span class=\"quantity__add\" data-name=\"").concat(info.name, "\">+</span>\n                <span class=\"quantity__decrease\" data-name=\"").concat(info.name, "\">-</span>\n            </div>\n            <div class=\"total\">total price: <span class=\"total__price\">").concat(totalPrice, "</span></div>\n        </div>\n      </li>\n    ");
  }).join('');
  var nullMessage = "<p>Nothing in the cart</p>";
  var hideCartBtn = "<button class=\"cart__hide\">Hide Cart</button>";
  var checkoutBtn = "<button class=\"cart__checkout\">Checkout</button>";
  cartRoot.innerHTML = "\n    <div class=\"cart__head\">\n        <div class=\"cart_btn\">\n            ".concat(hideCartBtn, "\n            ").concat(checkoutBtn, "\n        </div>\n        <div class=\"total\">total cost: <span class=\"total__price\">").concat(totalCost, "</span></div>\n    </div>\n    <ul class=\"cart__list\">\n        ").concat(cartPanel || nullMessage, "\n    </ul>\n  ");
}


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
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].updateCart(name);
    var count = document.getElementsByClassName('cart__count')[0].innerText;
    document.getElementsByClassName('cart__count')[0].innerText = Number(count) + 1;
    (0,_view__WEBPACK_IMPORTED_MODULE_2__.generateCartHtml)(_state__WEBPACK_IMPORTED_MODULE_0__["default"].cart, document.querySelector('.cart__panel'));
  }
  if (e.target.classList.contains('cart__view')) {
    e.target.style.display = 'none';
    var cartRoot = document.querySelector('.cart__panel');
    (0,_view__WEBPACK_IMPORTED_MODULE_2__.generateCartHtml)(_state__WEBPACK_IMPORTED_MODULE_0__["default"].cart, cartRoot);
    cartRoot.style.display = 'block';
  }
  if (e.target.classList.contains('cart__hide')) {
    document.querySelector('.cart__panel').style.display = 'none';
    document.querySelector('.cart__view').style.display = 'block';
  }
  if (e.target.classList.contains('cart__checkout')) {
    document.querySelector('.cart__panel').style.display = 'none';
    document.querySelector('.cart__view').style.display = 'block';
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].cart = {};
    document.getElementsByClassName('cart__count')[0].innerText = '';
  }
  if (e.target.classList.contains('quantity__add')) {
    var _name = e.target.dataset.name;
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].cart[_name].quantity += 1;
    var _count = document.getElementsByClassName('cart__count')[0].innerText;
    document.getElementsByClassName('cart__count')[0].innerText = Number(_count) + 1;
    var _cartRoot = document.querySelector('.cart__panel');
    (0,_view__WEBPACK_IMPORTED_MODULE_2__.generateCartHtml)(_state__WEBPACK_IMPORTED_MODULE_0__["default"].cart, _cartRoot);
  }
  if (e.target.classList.contains('quantity__decrease')) {
    var _name2 = e.target.dataset.name;
    if (_state__WEBPACK_IMPORTED_MODULE_0__["default"].cart[_name2].quantity === 1) {
      delete _state__WEBPACK_IMPORTED_MODULE_0__["default"].cart[_name2];
    } else {
      _state__WEBPACK_IMPORTED_MODULE_0__["default"].cart[_name2].quantity -= 1;
    }
    var _count2 = document.getElementsByClassName('cart__count')[0].innerText;
    document.getElementsByClassName('cart__count')[0].innerText = Number(_count2) === 1 ? '' : Number(_count2) - 1;
    var _cartRoot2 = document.querySelector('.cart__panel');
    (0,_view__WEBPACK_IMPORTED_MODULE_2__.generateCartHtml)(_state__WEBPACK_IMPORTED_MODULE_0__["default"].cart, _cartRoot2);
  }
});
(0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchCatList)().then(function (cats) {
  _state__WEBPACK_IMPORTED_MODULE_0__["default"].updateCats(cats);
  (0,_view__WEBPACK_IMPORTED_MODULE_2__.render)(_state__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
})["catch"](function (error) {
  console.warn("replace this with actual error reporting", error);
});
})();

/******/ })()
;
//# sourceMappingURL=main.js.map