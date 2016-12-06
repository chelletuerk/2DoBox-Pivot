/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	var helpers = __webpack_require__(5);

	var Idea = __webpack_require__(6);
	var Ideas = __webpack_require__(7);
	var ideas = new Ideas();

	var Sort = __webpack_require__(8);
	var sort = new Sort();

	var Counter = __webpack_require__(9);
	var counter = new Counter();

	var Paint = __webpack_require__(10);
	var paint = new Paint(ideas, helpers);

	var Render = __webpack_require__(11);
	var render = new Render(helpers, paint.createCard);

	var $title = $('#title');
	var $body = $('#body');

	$('#save').click(function (e) {
	  var title = $title.val();
	  var body = $body.val();
	  var idea = new Idea(title, body);
	  ideas.storeIdea(idea);
	  $title.val('');
	  $body.val('');
	});

	$('#all-ideas').on('click', function (e) {
	  render.ten = false;
	  render.render(ideas.all);
	});

	$('#show-completed-btn').on('click', function (e) {
	  helpers.emptyIdeas();
	  paint.completeIdeas(e, ideas, paint.createCard);
	});

	$('#sort').click(function (e) {
	  return sort.flip(render.render, ideas.all);
	});
	$('#critical').click(function (e) {
	  return paint.ideasByQuality(e, 'critical');
	});
	$('#high').click(function (e) {
	  return paint.ideasByQuality(e, 'high');
	});
	$('#norm').click(function (e) {
	  return paint.ideasByQuality(e, 'normal');
	});
	$('#low').click(function (e) {
	  return paint.ideasByQuality(e, 'low');
	});
	$('#none').click(function (e) {
	  return paint.ideasByQuality(e, 'none');
	});

	$('#ideas').on('click', '#delete-btn', function (e) {
	  return ideas.deleteOnClick(e);
	});
	$('#ideas').on('click', '#complete-btn', function (e) {
	  return paint.completeAnIdea(e, ideas);
	});
	$('#ideas').on('click', '#up-btn', function (e) {
	  return ideas.changeQuality(e, sort, 'up');
	});
	$('#ideas').on('click', '#down-btn', function (e) {
	  return ideas.changeQuality(e, sort, 'down');
	});

	$('#search').keyup(function (e) {
	  return paint.searchedIdeas(e, render);
	});
	$('#title, #body').keyup(function (e) {
	  return helpers.checkField();
	});

	$('#title').on('keyup', function (e) {
	  return counter.countTitle();
	});
	$('#body').on('keyup', function (e) {
	  return counter.countBody();
	});

	$('#ideas').on('blur', '#idea-title', function (e) {
	  return ideas.editIdea(e, 'title');
	});
	$('#ideas').on('blur', '#idea-body', function (e) {
	  return ideas.editIdea(e, 'body');
	});

	render.loadPage(ideas.all);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./styles.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./styles.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	var checkField = function checkField() {
	  var checkTitle = /\S/.test($("#title").val());
	  var checkBody = /\S/.test($("#body").val());
	  var countTitle = $('#title').val();
	  var countBody = $('#body').val();

	  if (checkTitle && checkBody && countTitle.length <= 120 && countBody.length <= 120) {
	    $("#save").attr("disabled", false);
	  } else {
	    $("#save").attr("disabled", true);
	  }
	};

	var emptyIdeas = function emptyIdeas() {
	  return $('#ideas').empty();
	};

	module.exports = {
	  checkField: checkField,
	  emptyIdeas: emptyIdeas
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Idea = function Idea(title, body) {
	  _classCallCheck(this, Idea);

	  this.id = new Date().getTime();
	  this.title = title;
	  this.body = body;
	  this.quality = 'normal';
	  this.completed = false;
	};

	module.exports = Idea;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Ideas = function () {
	  function Ideas() {
	    _classCallCheck(this, Ideas);

	    if (!localStorage.ideaArray) localStorage.ideaArray = "[]";
	    var holdingValue = JSON.parse(localStorage.ideaArray);
	    if (holdingValue) {
	      this.all = holdingValue;
	    } else {
	      this.all = [];
	    }
	  }

	  _createClass(Ideas, [{
	    key: 'storeIdea',
	    value: function storeIdea(idea) {
	      this.all.push(idea);
	      localStorage.ideaArray = JSON.stringify(this.all);
	    }
	  }, {
	    key: 'deleteIdea',
	    value: function deleteIdea(id) {
	      this.all = this.all.filter(function (e) {
	        return +e.id !== +id;
	      });
	      localStorage.ideaArray = JSON.stringify(this.all);
	    }
	  }, {
	    key: 'findIdeaById',
	    value: function findIdeaById(id) {
	      return this.all.filter(function (idea) {
	        return idea.id === id;
	      })[0];
	    }
	  }, {
	    key: 'findIdeaByQuality',
	    value: function findIdeaByQuality(quality) {
	      return this.all.filter(function (e) {
	        return e.quality === quality;
	      });
	    }
	  }, {
	    key: 'renderCompletedIdeas',
	    value: function renderCompletedIdeas(createCard) {
	      var renderArray = this.all.filter(function (e) {
	        return e.completed === true;
	      });
	      renderArray.forEach(function (e) {
	        $('ideas').prepend(createCard(e));
	      });
	    }
	  }, {
	    key: 'changeQuality',
	    value: function changeQuality(e, sort, direction) {
	      var id = +e.currentTarget.closest('article').id;
	      var currentIdea = this.findIdeaById(id);
	      var ideaQuality = currentIdea.quality;
	      var nextQuality = sort.qualityChangers[direction][ideaQuality];
	      var nearestQualityElement = e.target.parentElement.querySelector('#quality');
	      this.all.forEach(function (idea) {
	        if (idea.id === id) {
	          idea.quality = nextQuality;
	        }
	      });
	      nearestQualityElement.innerText = 'quality: ' + nextQuality;
	      localStorage.ideaArray = JSON.stringify(this.all);
	    }
	  }, {
	    key: 'editIdea',
	    value: function editIdea(e, property) {
	      e.preventDefault();
	      var id = +e.target.dataset.id;
	      var currentIdea = this.findIdeaById(id);
	      var newTitle = e.target.innerText;
	      this.all.forEach(function (idea) {
	        if (idea.id === id) idea[property] = newTitle;
	      });
	      localStorage.ideaArray = JSON.stringify(this.all);
	    }
	  }, {
	    key: 'deleteOnClick',
	    value: function deleteOnClick(e) {
	      e.currentTarget.closest("article").remove();
	      var id = e.currentTarget.closest("article").id;
	      this.deleteIdea(id);
	    }
	  }]);

	  return Ideas;
	}();

	module.exports = Ideas;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Sort = function () {
	  function Sort() {
	    _classCallCheck(this, Sort);

	    this.order = false;
	    this.qualityChangers = {
	      up: { critical: "critical", high: "critical", normal: "high", low: "normal", none: "low" },
	      down: { critical: "high", high: "normal", normal: "low", low: "none", none: "none" }
	    };
	    this.sortKey = {
	      critical: 4,
	      high: 3,
	      normal: 2,
	      low: 1,
	      none: 0
	    };
	  }

	  _createClass(Sort, [{
	    key: "upSort",
	    value: function upSort(ideaArray) {
	      var _this = this;

	      return ideaArray.sort(function (a, b) {
	        return _this.sortKey[a.quality] < _this.sortKey[b.quality];
	      });
	    }
	  }, {
	    key: "downSort",
	    value: function downSort(ideaArray) {
	      var _this2 = this;

	      return ideaArray.sort(function (a, b) {
	        return _this2.sortKey[a.quality] > _this2.sortKey[b.quality];
	      });
	    }
	  }, {
	    key: "flip",
	    value: function flip(render, ideaArray) {
	      if (!this.order) {
	        render(this.downSort(ideaArray));
	        this.order = true;
	      } else {
	        render(this.upSort(ideaArray));
	        this.order = false;
	      }
	    }
	  }]);

	  return Sort;
	}();

	module.exports = Sort;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Counter = function () {
	  function Counter() {
	    _classCallCheck(this, Counter);
	  }

	  _createClass(Counter, [{
	    key: 'countTitle',
	    value: function countTitle() {
	      var total = document.getElementById('title').value;
	      total = total.replace(/\s/g, '');
	      document.getElementById('titleCount').innerHTML = 'Total Characters: ' + total.length;
	    }
	  }, {
	    key: 'countBody',
	    value: function countBody() {
	      var total = document.getElementById('body').value;
	      total = total.replace(/\s/g, '');
	      document.getElementById('bodyCount').innerHTML = 'Total Characters: ' + total.length;
	    }
	  }]);

	  return Counter;
	}();

	module.exports = Counter;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Paint = function () {
	  function Paint(ideas, helpers) {
	    _classCallCheck(this, Paint);

	    this.ideas = ideas;
	    this.helpers = helpers;
	  }

	  _createClass(Paint, [{
	    key: 'completeIdeas',
	    value: function completeIdeas(e, ideas) {
	      var id = +$(e.target).closest("article").attr('id');
	      ideas.renderCompletedIdeas(this.createCard);
	      $('#show-completed-btn').attr('disabled', true);
	    }
	  }, {
	    key: 'ideasByQuality',
	    value: function ideasByQuality(e, quality) {
	      var _this = this;

	      this.helpers.emptyIdeas();
	      this.ideas.findIdeaByQuality(quality).forEach(function (e) {
	        $('ideas').prepend(_this.createCard(e));
	      });
	    }
	  }, {
	    key: 'searchedIdeas',
	    value: function searchedIdeas(e, render) {
	      var searchText = e.target.value.toLowerCase();
	      if (searchText === '') return render.render(this.ideas.all);
	      var matches = this.ideas.all.filter(function (idea) {
	        return idea.body.toLowerCase().includes(searchText) || idea.title.toLowerCase().includes(searchText);
	      });
	      render.render([], matches);
	    }
	  }, {
	    key: 'completeAnIdea',
	    value: function completeAnIdea(e, ideas) {
	      var id = +$(e.target).closest("article").attr('id');
	      var createdCard = $(e.target).closest("article");
	      var currentIdea = ideas.findIdeaById(id);
	      currentIdea.completed = true;
	      createdCard.toggleClass('completed');
	      localStorage.ideaArray = JSON.stringify(ideas.all);
	    }
	  }, {
	    key: 'createCard',
	    value: function createCard(idea) {
	      $('#ideas').prepend('<article class="newIdea" id=' + idea.id + '>\n      <div id = "card-top">\n        <h1 id="idea-title" data-id=' + idea.id + ' contenteditable>' + idea.title + '</h1>\n        <button id="delete-btn"></button>\n      </div>\n      <div id = "card-middle">\n        <p id="idea-body" data-id=' + idea.id + ' contenteditable>' + idea.body + '</p>\n      </div>\n      <div id = "card-bottom">\n        <button id="up-btn"></button>\n        <button id="down-btn"></button>\n        <h2 id="quality">quality: ' + idea.quality + '</h2>\n        <button id=\'complete-btn\'>Completed Task</button>\n      </div>\n    </article>');
	    }
	  }]);

	  return Paint;
	}();

	module.exports = Paint;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Render = function () {
	  function Render(helpers, createCard) {
	    _classCallCheck(this, Render);

	    this.helpers = helpers;
	    this.ten = true;
	    this.createCard = createCard;
	    this.render = this.render.bind(this);
	    this.loadPage = this.loadPage.bind(this);
	  }

	  _createClass(Render, [{
	    key: "firstTen",
	    value: function firstTen(ideas) {
	      var incompleteIdeas = ideas.filter(function (e) {
	        return e.completed === false;
	      });
	      if (incompleteIdeas.length < 10) {
	        return incompleteIdeas;
	      } else {
	        return incompleteIdeas.slice(0, 10);
	      }
	    }
	  }, {
	    key: "render",
	    value: function render(givenArray, completed) {
	      var _this = this;

	      var incompleteGiven = void 0;
	      if (this.ten) incompleteGiven = this.firstTen(givenArray);
	      if (!this.ten) incompleteGiven = givenArray.filter(function (e) {
	        return e.completed === false;
	      });
	      this.helpers.emptyIdeas();
	      if (completed) return completed.forEach(function (e) {
	        return _this.createCard(e);
	      });
	      if (incompleteGiven) return incompleteGiven.forEach(function (e) {
	        return _this.createCard(e);
	      });
	    }
	  }, {
	    key: "loadPage",
	    value: function loadPage(ideaArray) {
	      this.render(ideaArray);
	    }
	  }]);

	  return Render;
	}();

	module.exports = Render;

/***/ }
/******/ ]);