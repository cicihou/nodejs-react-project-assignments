/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkSession": () => (/* binding */ checkSession),
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "getStoredWord": () => (/* binding */ getStoredWord),
/* harmony export */   "logout": () => (/* binding */ logout),
/* harmony export */   "updatesStoredWord": () => (/* binding */ updatesStoredWord)
/* harmony export */ });
function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json' // set this header when sending JSON in the body of request
    },

    body: JSON.stringify({
      username: username
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json(); // happy status code means resolve with data from service
  });
}

function checkSession() {
  return fetch('/api/session/', {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject({
          error: 'Please notice ' + err.error.split('-').join(' ')
        });
      });
    }
    return response.json();
  });
}
function logout() {
  return fetch('/api/session/', {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject({
          error: 'Please notice ' + err.error.split('-').join(' ')
        });
      });
    }
    return response.json();
  });
}
function getStoredWord() {
  return fetch('/api/word', {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject({
          error: 'Please notice ' + err.error.split('-').join(' ')
        });
      });
    }
    return response.json();
  });
}
function updatesStoredWord(word) {
  return fetch('/api/word', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      word: word
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject({
          error: 'Please notice ' + err.error.split('-').join(' ')
        });
      });
    }
    return response.json();
  });
}

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderHome": () => (/* binding */ renderHome),
/* harmony export */   "renderLogin": () => (/* binding */ renderLogin)
/* harmony export */ });
function renderLogin(rootEl) {
  rootEl.innerHTML = "\n    <header class=\"page__header\"><h2>Welcome!</h2><p>Please login.</p></header>\n    <main class=\"main\">\n      <div class=\"login__panel\">\n        <p class=\"prompt\">Please Log in: </p>\n        <div class=\"login__form\">\n          <label>\n              Username:\n              <input class=\"info__input\" type=\"text\" name=\"username\" required>\n          </label>\n          <button class=\"login__button\">Submit</button>\n          <span class=\"login__msg\"></span>\n        </div>\n      </div>\n    </main>\n  ";
}
function renderHome(rootEl, info) {
  rootEl.innerHTML = "\n    <header class=\"page__header\"><h2>Welcome! ".concat(info.username, "</h2><button class=\"logout__button\">Log out</button></header>\n    <main class=\"main\">\n      <div class=\"home__panel\">\n        <p class=\"prompt\">stored word: </p>\n        <h3 class=\"stored__word\">").concat(info.storedWord, "</h3>\n        <input class=\"word__input\" type=\"text\" required>\n        <button class=\"update__button\">Update</button>\n      </div>\n      <span class=\"update__msg\"></span>\n    </main>\n  ");
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ "./src/view.js");


var rootEl = document.querySelector('#root');
rootEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('login__button')) {
    var username = document.getElementsByClassName('info__input')[0].value;
    doLogin(username);
  }
  if (e.target.classList.contains('logout__button')) {
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.logout)().then(function (res) {
      (0,_view__WEBPACK_IMPORTED_MODULE_1__.renderLogin)(rootEl);
    });
  }
  if (e.target.classList.contains('update__button')) {
    var newWord = document.getElementsByClassName('word__input')[0].value;
    doUpdateWord(newWord);
  }
});
function doLogin(username) {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function (res) {
    getHome();
    document.getElementsByClassName('login__msg')[0].innerText = '';
  })["catch"](function (error) {
    document.getElementsByClassName('login__msg')[0].innerText = error.error;
  });
}
function getHome() {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.getStoredWord)().then(function (res) {
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.renderHome)(rootEl, res);
  })["catch"](function (error) {});
}
function doUpdateWord(word) {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.updatesStoredWord)(word).then(function (res) {
    document.getElementsByClassName('stored__word')[0].innerText = word;
    document.getElementsByClassName('update__msg')[0].innerText = '';
    document.getElementsByClassName('word__input')[0].value = '';
  })["catch"](function (error) {
    document.getElementsByClassName('update__msg')[0].innerText = error.error;
  });
}
(0,_services__WEBPACK_IMPORTED_MODULE_0__.checkSession)().then(function (res) {
  getHome(res.username);
})["catch"](function (error) {
  (0,_view__WEBPACK_IMPORTED_MODULE_1__.renderLogin)(rootEl);
});
})();

/******/ })()
;
//# sourceMappingURL=main.js.map