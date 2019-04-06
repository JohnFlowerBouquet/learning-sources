/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\n//Entry Class\nvar entriesGlobal;\n\nfunction getList() {\n  var entries = [];\n  var endpoint = \"https://raw.githubusercontent.com/JohnFlowerBouquet/learning-sources/master/sources.json\";\n  fetch(endpoint).then(function (response) {\n    return response.json();\n  }).then(function (data) {\n    entries.push.apply(entries, _toConsumableArray(data));\n    UI.displayResults(data);\n  }).catch(function (error) {\n    console.log(error);\n  });\n  entriesGlobal = entries;\n  return entries;\n}\n\nvar Entry = function Entry(title, link, category, technology, year) {\n  _classCallCheck(this, Entry);\n\n  this.title = title;\n  this.link = link;\n  this.category = category;\n  this.technology = technology;\n  this.year = year;\n}; //UI Class\n\n\nvar UI =\n/*#__PURE__*/\nfunction () {\n  function UI() {\n    _classCallCheck(this, UI);\n  }\n\n  _createClass(UI, null, [{\n    key: \"displayResults\",\n    value: function displayResults(results) {\n      var searchInput = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n      var resultNumber = results.length;\n      var pageIndex = 1;\n      document.querySelectorAll(\".removable\").forEach(function (el) {\n        return el.remove();\n      });\n\n      if (resultNumber > 0) {\n        var spliced = [[]];\n\n        while (resultNumber > 0) {\n          var chunk = results.splice(0, 5);\n          spliced.push(chunk);\n          var liElement = document.createElement(\"li\");\n          liElement.className = \"page-item removable\";\n          var pageButton = document.createElement(\"button\");\n          pageButton.className = \"page-link\";\n          pageButton.dataset.pageNumber = pageIndex;\n          pageButton.textContent = pageIndex;\n          pageButton.addEventListener(\"click\", function () {\n            UI.displayList(spliced[this.dataset.pageNumber], searchInput);\n          });\n          liElement.appendChild(pageButton);\n          pagination.insertBefore(liElement, pagination.lastElementChild);\n          resultNumber = results.length;\n          pageIndex++;\n        }\n\n        UI.displayList(spliced[1], searchInput);\n      } else {\n        UI.displayList(results, searchInput);\n      }\n    }\n  }, {\n    key: \"findMatches\",\n    value: function findMatches(wordToMatch) {\n      listShow.innerHTML = \"\";\n      return Store.getEntries().filter(function (entry) {\n        var regex = new RegExp(wordToMatch, \"gi\");\n        return entry.title.match(regex) || entry.category.match(regex);\n      });\n    }\n  }, {\n    key: \"displayList\",\n    value: function displayList(listToShow) {\n      var searchInput = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n      var titleHighlight;\n      var technologyHighlight;\n      var list = document.querySelector(\"#list-show\");\n\n      if (window.innerWidth > 768) {\n        var listTemplate = Array.from(listToShow).map(function (entry) {\n          if (searchInput) {\n            var regex = new RegExp(searchInput, \"gi\");\n            titleHighlight = entry.title.replace(regex, \"<strong class=\\\"text-primary\\\">\".concat(searchInput, \"</strong>\"));\n            technologyHighlight = entry.category.replace(regex, \"<strong class=\\\"text-primary\\\">\".concat(searchInput, \"</strong>\"));\n          }\n\n          return \"\\n      <tr class=\\\"table-dark\\\">\\n        <th scope=\\\"row\\\">\\n          <a href=\\\"\".concat(entry.link, \"\\\">\").concat(titleHighlight || entry.title, \"</a>\\n        </th>\\n        <td>\").concat(entry.category, \"</td>\\n        <td>\").concat(technologyHighlight || entry.technology, \"</td>\\n        <td>\").concat(entry.year, \"</td>\\n        <td>\\n          <button type=\\\"button\\\" class=\\\"badge badge-danger d-none delete\\\">\\n            Delete\\n          </button>\\n        </td>\\n      </tr>\");\n        }).join(\"\");\n        list.innerHTML = listTemplate;\n      } else {\n        document.getElementById(\"searchButton\").setAttribute(\"data-toggle\", \"collapse\");\n\n        var _listTemplate = Array.from(listToShow).map(function (entry, index) {\n          if (searchInput) {\n            var regex = new RegExp(searchInput, \"gi\");\n            titleHighlight = entry.title.replace(regex, \"<strong class=\\\"text-primary\\\">\".concat(searchInput, \"</strong>\"));\n            technologyHighlight = entry.category.replace(regex, \"<strong class=\\\"text-primary\\\">\".concat(searchInput, \"</strong>\"));\n          }\n\n          return \"\\n          <tr data-toggle=\\\"collapse\\\" data-target=\\\"#accordion\".concat(index, \"\\\" class=\\\"table-dark clickable\\\">\\n            <td>\\n              <a href=\\\"\").concat(entry.link, \"\\\">\").concat(titleHighlight || entry.title, \"</a>\\n              <div id=\\\"accordion\").concat(index, \"\\\" class=\\\"collapse\\\">\\n                <p>Category: \").concat(entry.category, \"</p>\\n                <p>Technologies: \").concat(technologyHighlight || entry.technology, \"</p>\\n                <p>Year: \").concat(entry.year, \"</p>\\n                <button type=\\\"button\\\" class=\\\"badge badge-danger d-none delete\\\">Delete</button>\\n              </div>\\n            </td>\\n          </tr>\");\n        }).join(\"\");\n\n        list.innerHTML = _listTemplate;\n      }\n    }\n  }, {\n    key: \"addEntry\",\n    value: function addEntry(entry) {\n      Store.addEntry(entry);\n      console.log(\"entry added\");\n    }\n  }, {\n    key: \"deleteEntry\",\n    value: function deleteEntry(event) {\n      var link;\n\n      if (event.target.parentElement.classList.contains(\"collapse\")) {\n        link = event.target.parentElement.parentElement.parentElement.firstElementChild.getAttribute(\"href\");\n        event.target.parentElement.parentElement.parentElement.remove();\n      } else {\n        link = event.target.parentElement.parentElement.firstElementChild.getAttribute(\"href\");\n        event.target.parentElement.parentElement.remove();\n      }\n\n      console.log(link);\n      Store.removeEntry(link);\n    }\n  }, {\n    key: \"showModal\",\n    value: function showModal() {\n      var modalAnchorNode = document.createElement(\"a\");\n      modalAnchorNode.setAttribute(\"data-toggle\", \"modal\");\n      modalAnchorNode.setAttribute(\"data-target\", \"#modalAnchor\");\n      document.body.appendChild(modalAnchorNode);\n      modalAnchorNode.click();\n      modalAnchorNode.remove();\n      var title = document.querySelector(\"#input-title\").value;\n      var link = document.querySelector(\"#input-link\").value;\n      var category = document.querySelector(\"#input-category\").value;\n      var technology = document.querySelector(\"#input-technology\").value;\n      var year = document.querySelector(\"#input-year\").value;\n      document.querySelector(\"#modal-form\").addEventListener(\"submit\", function (e) {\n        e.preventDefault();\n\n        if (UI.validation(title, link, category, technology, year)) {\n          var entry = new Entry(title, link, category, technology, year);\n          UI.addEntry(entry);\n          UI.showAlert(\"Entry Added\", \"primary\");\n          UI.clearFields();\n        } else {\n          UI.showAlert(\"Please fill in all fields corectly\", \"danger\");\n        }\n      });\n    }\n  }, {\n    key: \"showAlert\",\n    value: function showAlert(message, className) {\n      var time;\n\n      if (!document.querySelector(\".alert\")) {\n        var div = document.createElement(\"div\");\n        div.className = \"alert alert-\".concat(className, \" mt-4\");\n        div.appendChild(document.createTextNode(message));\n        var form = document.querySelector(\"#modal-form\");\n        form.appendChild(div);\n        time = setTimeout(function () {\n          return document.querySelector(\".alert\").remove();\n        }, 3000);\n      } else {\n        clearTimeout(time);\n      }\n    }\n  }, {\n    key: \"clearFields\",\n    value: function clearFields() {\n      document.querySelector(\"#input-title\").value = \"\";\n      document.querySelector(\"#input-link\").value = \"\";\n      document.querySelector(\"#input-technology\").value = \"\";\n      document.querySelector(\"#input-year\").value = \"\";\n    }\n  }, {\n    key: \"validation\",\n    value: function validation(title, link, technology, year) {\n      if (title === \"\" || link === \"\" || technology === \"\" || year === \"\") {\n        return false;\n      } else {\n        return true;\n      }\n    }\n  }]);\n\n  return UI;\n}(); //Store Class\n\n\nvar Store =\n/*#__PURE__*/\nfunction () {\n  function Store() {\n    _classCallCheck(this, Store);\n  }\n\n  _createClass(Store, null, [{\n    key: \"getEntries\",\n    value: function getEntries() {\n      var entries;\n\n      if (entriesGlobal) {\n        console.log(\"local\");\n        return entriesGlobal;\n      } else {\n        console.log(\"fetch\");\n        entries = getList();\n      }\n\n      return entries;\n    }\n  }, {\n    key: \"addEntry\",\n    value: function addEntry(entry) {\n      entriesGlobal.push(entry);\n    }\n  }, {\n    key: \"removeEntry\",\n    value: function removeEntry(link) {\n      entriesGlobal.forEach(function (entry, index) {\n        if (entry.link === link) {\n          entriesGlobal.splice(index, 1);\n        }\n      });\n    }\n  }, {\n    key: \"saveJSON\",\n    value: function saveJSON() {\n      var data = \"data:text/json;charset=utf-8,\" + encodeURIComponent(JSON.stringify(entriesGlobal));\n      var downloadAnchorNode = document.createElement(\"a\");\n      downloadAnchorNode.setAttribute(\"href\", data);\n      downloadAnchorNode.setAttribute(\"download\", \"sources\" + \".json\");\n      document.body.appendChild(downloadAnchorNode); // required for firefox\n\n      downloadAnchorNode.click();\n      downloadAnchorNode.remove();\n    }\n  }]);\n\n  return Store;\n}(); //Anchors\n\n\nvar listShow = document.querySelector(\"#list-show\");\nvar pagination = document.querySelector(\"#pagination\");\nlistShow.addEventListener(\"click\", function (e) {\n  if (e.target.classList.contains(\"delete\")) {\n    UI.deleteEntry(e);\n  }\n}); //Save JSON\n\nvar JSONbutton = document.getElementById(\"saveJSON\");\nJSONbutton.addEventListener(\"click\", Store.saveJSON); //OnLoad\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  UI.displayResults(Store.getEntries());\n}); //Add Entry\n\nvar addEntryButton = document.querySelector(\"#addEntryButton\");\naddEntryButton.addEventListener(\"click\", UI.showModal); //Event: Search\n\nvar searchForm = document.querySelector(\"#search-form\");\nsearchForm.addEventListener(\"submit\", function (e) {\n  e.preventDefault();\n  var searchInput = document.querySelector(\"#search-input\").value;\n\n  if (searchInput == \"admin\") {\n    console.log(\"GODMODE ON\");\n    document.querySelectorAll(\".d-none\").forEach(function (item) {\n      return item.tagName == \"TR\" || item.classList.remove(\"d-none\");\n    });\n  } else {\n    UI.displayResults(UI.findMatches(searchInput), searchInput);\n  }\n});\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ })

/******/ });