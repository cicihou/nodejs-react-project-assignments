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
/* harmony export */   "fetchUsers": () => (/* binding */ fetchUsers),
/* harmony export */   "logout": () => (/* binding */ logout)
/* harmony export */ });
function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
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
        return Promise.reject(err);
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
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchUsers() {
  return fetch('/api/users/', {
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
        return Promise.reject(err);
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
/* harmony export */   "renderLogin": () => (/* binding */ renderLogin),
/* harmony export */   "renderMsgList": () => (/* binding */ renderMsgList),
/* harmony export */   "renderUserList": () => (/* binding */ renderUserList)
/* harmony export */ });
function renderLogin(rootEl) {
  rootEl.innerHTML = "\n    <header class=\"page__header\"><h2>Welcome!</h2><p>Please login.</p></header>\n    <main class=\"main\">\n      <div class=\"login__panel\">\n        <p class=\"prompt\">Please Log in: </p>\n        <div class=\"login__form\">\n          <label>\n              Username:\n              <input class=\"info__input\" type=\"text\" name=\"username\" required>\n          </label>\n          <button class=\"login__button\">Submit</button>\n          <span class=\"login__msg\"></span>\n        </div>\n      </div>\n    </main>\n  ";
}
function renderHome(rootEl, username) {
  rootEl.innerHTML = "\n    <header class=\"page__header\"><h2>Welcome! ".concat(username, "</h2><button class=\"logout__button\">Log out</button></header>\n    <main class=\"main\">\n      <div class=\"chat\">\n        <ul class=\"user__list\"></ul>\n        <div class=\"message\">\n            <ul class=\"msg__list\"></ul>\n            <div class=\"msg__input\">\n                <input class=\"input__msg\"/>\n                <button class=\"send_msg\">Send</button>\n            </div>\n        </div>\n      </div>\n    </main>\n  ");
}
function renderUserList(users) {
  var userList = document.querySelector('.user__list');
  userList.innerHTML = users.map(function (user) {
    return "<li class=\"user__list__item\">".concat(user.username, "</li>");
  }).join("");
}
function renderMsgList() {
  var msgList = document.querySelector('.msg__list');
  msgList.innerHTML = "\n    <li class=\"msg__list__item\">\n        <p class=\"msg__user\">user1</p>\n        <p class=\"msg__text\">hello word!</p>\n    </li>\n    <li class=\"msg__list__item\">\n        <p class=\"msg__user\">user1</p>\n        <p class=\"msg__text\">hello word!hello word!hello word!hello word!hello word!hello word!hello word!hello word!hello word!</p>\n    </li>\n  ";
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
var loading = document.querySelector('.loading');
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
});
function doLogin(username) {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function (res) {
    document.getElementsByClassName('login__msg')[0].innerText = '';
    getHome(res.username);
  })["catch"](function (error) {
    document.getElementsByClassName('login__msg')[0].innerText = error.error;
  });
}
function getHome(username) {
  (0,_view__WEBPACK_IMPORTED_MODULE_1__.renderHome)(rootEl, username);
  doFetchUsers();
  doFetchMessages();
}
function doFetchUsers() {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchUsers)().then(function (res) {
    console.log(res);
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.renderUserList)(res.users);
  })["catch"](function (error) {});
}
function doFetchMessages() {
  (0,_view__WEBPACK_IMPORTED_MODULE_1__.renderMsgList)();
}
(0,_services__WEBPACK_IMPORTED_MODULE_0__.checkSession)().then(function (res) {
  getHome(res.username);
  loading.style.display = 'none';
})["catch"](function (error) {
  (0,_view__WEBPACK_IMPORTED_MODULE_1__.renderLogin)(rootEl);
  loading.style.display = 'none';
});
})();

/******/ })()
;
//# sourceMappingURL=main.js.map