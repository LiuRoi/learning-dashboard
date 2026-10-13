"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a2, b) => (typeof require !== "undefined" ? require : a2)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e2) {
      throw mod = 0, e2;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/lazysizes/lazysizes.js
  var require_lazysizes = __commonJS({
    "node_modules/lazysizes/lazysizes.js"(exports, module) {
      (function(window2, factory) {
        var lazySizes2 = factory(window2, window2.document, Date);
        window2.lazySizes = lazySizes2;
        if (typeof module == "object" && module.exports) {
          module.exports = lazySizes2;
        }
      })(
        typeof window != "undefined" ? window : {},
        /**
         * import("./types/global")
         * @typedef { import("./types/lazysizes-config").LazySizesConfigPartial } LazySizesConfigPartial
         */
        function l2(window2, document2, Date2) {
          "use strict";
          var lazysizes, lazySizesCfg;
          (function() {
            var prop;
            var lazySizesDefaults = {
              lazyClass: "lazyload",
              loadedClass: "lazyloaded",
              loadingClass: "lazyloading",
              preloadClass: "lazypreload",
              errorClass: "lazyerror",
              //strictClass: 'lazystrict',
              autosizesClass: "lazyautosizes",
              fastLoadedClass: "ls-is-cached",
              iframeLoadMode: 0,
              srcAttr: "data-src",
              srcsetAttr: "data-srcset",
              sizesAttr: "data-sizes",
              //preloadAfterLoad: false,
              minSize: 40,
              customMedia: {},
              init: true,
              expFactor: 1.5,
              hFac: 0.8,
              loadMode: 2,
              loadHidden: true,
              ricTimeout: 0,
              throttleDelay: 125
            };
            lazySizesCfg = window2.lazySizesConfig || window2.lazysizesConfig || {};
            for (prop in lazySizesDefaults) {
              if (!(prop in lazySizesCfg)) {
                lazySizesCfg[prop] = lazySizesDefaults[prop];
              }
            }
          })();
          if (!document2 || !document2.getElementsByClassName) {
            return {
              init: function() {
              },
              /**
               * @type { LazySizesConfigPartial }
               */
              cfg: lazySizesCfg,
              /**
               * @type { true }
               */
              noSupport: true
            };
          }
          var docElem = document2.documentElement;
          var supportPicture = window2.HTMLPictureElement;
          var _addEventListener = "addEventListener";
          var _getAttribute = "getAttribute";
          var addEventListener = window2[_addEventListener].bind(window2);
          var setTimeout2 = window2.setTimeout;
          var requestAnimationFrame2 = window2.requestAnimationFrame || setTimeout2;
          var requestIdleCallback = window2.requestIdleCallback;
          var regPicture = /^picture$/i;
          var loadEvents = ["load", "error", "lazyincluded", "_lazyloaded"];
          var regClassCache = {};
          var forEach = Array.prototype.forEach;
          var hasClass = function(ele, cls) {
            if (!regClassCache[cls]) {
              regClassCache[cls] = new RegExp("(\\s|^)" + cls + "(\\s|$)");
            }
            return regClassCache[cls].test(ele[_getAttribute]("class") || "") && regClassCache[cls];
          };
          var addClass = function(ele, cls) {
            if (!hasClass(ele, cls)) {
              ele.setAttribute("class", (ele[_getAttribute]("class") || "").trim() + " " + cls);
            }
          };
          var removeClass = function(ele, cls) {
            var reg;
            if (reg = hasClass(ele, cls)) {
              ele.setAttribute("class", (ele[_getAttribute]("class") || "").replace(reg, " "));
            }
          };
          var addRemoveLoadEvents = function(dom, fn, add) {
            var action = add ? _addEventListener : "removeEventListener";
            if (add) {
              addRemoveLoadEvents(dom, fn);
            }
            loadEvents.forEach(function(evt) {
              dom[action](evt, fn);
            });
          };
          var triggerEvent = function(elem, name, detail, noBubbles, noCancelable) {
            var event = document2.createEvent("Event");
            if (!detail) {
              detail = {};
            }
            detail.instance = lazysizes;
            event.initEvent(name, !noBubbles, !noCancelable);
            event.detail = detail;
            elem.dispatchEvent(event);
            return event;
          };
          var updatePolyfill = function(el, full) {
            var polyfill;
            if (!supportPicture && (polyfill = window2.picturefill || lazySizesCfg.pf)) {
              if (full && full.src && !el[_getAttribute]("srcset")) {
                el.setAttribute("srcset", full.src);
              }
              polyfill({ reevaluate: true, elements: [el] });
            } else if (full && full.src) {
              el.src = full.src;
            }
          };
          var getCSS = function(elem, style) {
            return (getComputedStyle(elem, null) || {})[style];
          };
          var getWidth = function(elem, parent, width) {
            width = width || elem.offsetWidth;
            while (width < lazySizesCfg.minSize && parent && !elem._lazysizesWidth) {
              width = parent.offsetWidth;
              parent = parent.parentNode;
            }
            return width;
          };
          var rAF = (function() {
            var running, waiting;
            var firstFns = [];
            var secondFns = [];
            var fns = firstFns;
            var run = function() {
              var runFns = fns;
              fns = firstFns.length ? secondFns : firstFns;
              running = true;
              waiting = false;
              while (runFns.length) {
                runFns.shift()();
              }
              running = false;
            };
            var rafBatch = function(fn, queue) {
              if (running && !queue) {
                fn.apply(this, arguments);
              } else {
                fns.push(fn);
                if (!waiting) {
                  waiting = true;
                  (document2.hidden ? setTimeout2 : requestAnimationFrame2)(run);
                }
              }
            };
            rafBatch._lsFlush = run;
            return rafBatch;
          })();
          var rAFIt = function(fn, simple) {
            return simple ? function() {
              rAF(fn);
            } : function() {
              var that = this;
              var args = arguments;
              rAF(function() {
                fn.apply(that, args);
              });
            };
          };
          var throttle = function(fn) {
            var running;
            var lastTime = 0;
            var gDelay = lazySizesCfg.throttleDelay;
            var rICTimeout = lazySizesCfg.ricTimeout;
            var run = function() {
              running = false;
              lastTime = Date2.now();
              fn();
            };
            var idleCallback = requestIdleCallback && rICTimeout > 49 ? function() {
              requestIdleCallback(run, { timeout: rICTimeout });
              if (rICTimeout !== lazySizesCfg.ricTimeout) {
                rICTimeout = lazySizesCfg.ricTimeout;
              }
            } : rAFIt(function() {
              setTimeout2(run);
            }, true);
            return function(isPriority) {
              var delay;
              if (isPriority = isPriority === true) {
                rICTimeout = 33;
              }
              if (running) {
                return;
              }
              running = true;
              delay = gDelay - (Date2.now() - lastTime);
              if (delay < 0) {
                delay = 0;
              }
              if (isPriority || delay < 9) {
                idleCallback();
              } else {
                setTimeout2(idleCallback, delay);
              }
            };
          };
          var debounce = function(func) {
            var timeout, timestamp;
            var wait = 99;
            var run = function() {
              timeout = null;
              func();
            };
            var later = function() {
              var last = Date2.now() - timestamp;
              if (last < wait) {
                setTimeout2(later, wait - last);
              } else {
                (requestIdleCallback || run)(run);
              }
            };
            return function() {
              timestamp = Date2.now();
              if (!timeout) {
                timeout = setTimeout2(later, wait);
              }
            };
          };
          var loader = (function() {
            var preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;
            var eLvW, elvH, eLtop, eLleft, eLright, eLbottom, isBodyHidden;
            var regImg = /^img$/i;
            var regIframe = /^iframe$/i;
            var supportScroll = "onscroll" in window2 && !/(gle|ing)bot/.test(navigator.userAgent);
            var shrinkExpand = 0;
            var currentExpand = 0;
            var isLoading = 0;
            var lowRuns = -1;
            var resetPreloading = function(e2) {
              isLoading--;
              if (!e2 || isLoading < 0 || !e2.target) {
                isLoading = 0;
              }
            };
            var isVisible = function(elem) {
              if (isBodyHidden == null) {
                isBodyHidden = getCSS(document2.body, "visibility") == "hidden";
              }
              return isBodyHidden || !(getCSS(elem.parentNode, "visibility") == "hidden" && getCSS(elem, "visibility") == "hidden");
            };
            var isNestedVisible = function(elem, elemExpand) {
              var outerRect;
              var parent = elem;
              var visible = isVisible(elem);
              eLtop -= elemExpand;
              eLbottom += elemExpand;
              eLleft -= elemExpand;
              eLright += elemExpand;
              while (visible && (parent = parent.offsetParent) && parent != document2.body && parent != docElem) {
                visible = (getCSS(parent, "opacity") || 1) > 0;
                if (visible && getCSS(parent, "overflow") != "visible") {
                  outerRect = parent.getBoundingClientRect();
                  visible = eLright > outerRect.left && eLleft < outerRect.right && eLbottom > outerRect.top - 1 && eLtop < outerRect.bottom + 1;
                }
              }
              return visible;
            };
            var checkElements = function() {
              var eLlen, i3, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal, beforeExpandVal, defaultExpand, preloadExpand, hFac;
              var lazyloadElems = lazysizes.elements;
              if ((loadMode = lazySizesCfg.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)) {
                i3 = 0;
                lowRuns++;
                for (; i3 < eLlen; i3++) {
                  if (!lazyloadElems[i3] || lazyloadElems[i3]._lazyRace) {
                    continue;
                  }
                  if (!supportScroll || lazysizes.prematureUnveil && lazysizes.prematureUnveil(lazyloadElems[i3])) {
                    unveilElement(lazyloadElems[i3]);
                    continue;
                  }
                  if (!(elemExpandVal = lazyloadElems[i3][_getAttribute]("data-expand")) || !(elemExpand = elemExpandVal * 1)) {
                    elemExpand = currentExpand;
                  }
                  if (!defaultExpand) {
                    defaultExpand = !lazySizesCfg.expand || lazySizesCfg.expand < 1 ? docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370 : lazySizesCfg.expand;
                    lazysizes._defEx = defaultExpand;
                    preloadExpand = defaultExpand * lazySizesCfg.expFactor;
                    hFac = lazySizesCfg.hFac;
                    isBodyHidden = null;
                    if (currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document2.hidden) {
                      currentExpand = preloadExpand;
                      lowRuns = 0;
                    } else if (loadMode > 1 && lowRuns > 1 && isLoading < 6) {
                      currentExpand = defaultExpand;
                    } else {
                      currentExpand = shrinkExpand;
                    }
                  }
                  if (beforeExpandVal !== elemExpand) {
                    eLvW = innerWidth + elemExpand * hFac;
                    elvH = innerHeight + elemExpand;
                    elemNegativeExpand = elemExpand * -1;
                    beforeExpandVal = elemExpand;
                  }
                  rect = lazyloadElems[i3].getBoundingClientRect();
                  if ((eLbottom = rect.bottom) >= elemNegativeExpand && (eLtop = rect.top) <= elvH && (eLright = rect.right) >= elemNegativeExpand * hFac && (eLleft = rect.left) <= eLvW && (eLbottom || eLright || eLleft || eLtop) && (lazySizesCfg.loadHidden || isVisible(lazyloadElems[i3])) && (isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4) || isNestedVisible(lazyloadElems[i3], elemExpand))) {
                    unveilElement(lazyloadElems[i3]);
                    loadedSomething = true;
                    if (isLoading > 9) {
                      break;
                    }
                  } else if (!loadedSomething && isCompleted && !autoLoadElem && isLoading < 4 && lowRuns < 4 && loadMode > 2 && (preloadElems[0] || lazySizesCfg.preloadAfterLoad) && (preloadElems[0] || !elemExpandVal && (eLbottom || eLright || eLleft || eLtop || lazyloadElems[i3][_getAttribute](lazySizesCfg.sizesAttr) != "auto"))) {
                    autoLoadElem = preloadElems[0] || lazyloadElems[i3];
                  }
                }
                if (autoLoadElem && !loadedSomething) {
                  unveilElement(autoLoadElem);
                }
              }
            };
            var throttledCheckElements = throttle(checkElements);
            var switchLoadingClass = function(e2) {
              var elem = e2.target;
              if (elem._lazyCache) {
                delete elem._lazyCache;
                return;
              }
              resetPreloading(e2);
              addClass(elem, lazySizesCfg.loadedClass);
              removeClass(elem, lazySizesCfg.loadingClass);
              addRemoveLoadEvents(elem, rafSwitchLoadingClass);
              triggerEvent(elem, "lazyloaded");
            };
            var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
            var rafSwitchLoadingClass = function(e2) {
              rafedSwitchLoadingClass({ target: e2.target });
            };
            var changeIframeSrc = function(elem, src) {
              var loadMode2 = elem.getAttribute("data-load-mode") || lazySizesCfg.iframeLoadMode;
              if (loadMode2 == 0) {
                elem.contentWindow.location.replace(src);
              } else if (loadMode2 == 1) {
                elem.src = src;
              }
            };
            var handleSources = function(source) {
              var customMedia;
              var sourceSrcset = source[_getAttribute](lazySizesCfg.srcsetAttr);
              if (customMedia = lazySizesCfg.customMedia[source[_getAttribute]("data-media") || source[_getAttribute]("media")]) {
                source.setAttribute("media", customMedia);
              }
              if (sourceSrcset) {
                source.setAttribute("srcset", sourceSrcset);
              }
            };
            var lazyUnveil = rAFIt(function(elem, detail, isAuto, sizes, isImg) {
              var src, srcset, parent, isPicture, event, firesLoad;
              if (!(event = triggerEvent(elem, "lazybeforeunveil", detail)).defaultPrevented) {
                if (sizes) {
                  if (isAuto) {
                    addClass(elem, lazySizesCfg.autosizesClass);
                  } else {
                    elem.setAttribute("sizes", sizes);
                  }
                }
                srcset = elem[_getAttribute](lazySizesCfg.srcsetAttr);
                src = elem[_getAttribute](lazySizesCfg.srcAttr);
                if (isImg) {
                  parent = elem.parentNode;
                  isPicture = parent && regPicture.test(parent.nodeName || "");
                }
                firesLoad = detail.firesLoad || "src" in elem && (srcset || src || isPicture);
                event = { target: elem };
                addClass(elem, lazySizesCfg.loadingClass);
                if (firesLoad) {
                  clearTimeout(resetPreloadingTimer);
                  resetPreloadingTimer = setTimeout2(resetPreloading, 2500);
                  addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
                }
                if (isPicture) {
                  forEach.call(parent.getElementsByTagName("source"), handleSources);
                }
                if (srcset) {
                  elem.setAttribute("srcset", srcset);
                } else if (src && !isPicture) {
                  if (regIframe.test(elem.nodeName)) {
                    changeIframeSrc(elem, src);
                  } else {
                    elem.src = src;
                  }
                }
                if (isImg && (srcset || isPicture)) {
                  updatePolyfill(elem, { src });
                }
              }
              if (elem._lazyRace) {
                delete elem._lazyRace;
              }
              removeClass(elem, lazySizesCfg.lazyClass);
              rAF(function() {
                var isLoaded = elem.complete && elem.naturalWidth > 1;
                if (!firesLoad || isLoaded) {
                  if (isLoaded) {
                    addClass(elem, lazySizesCfg.fastLoadedClass);
                  }
                  switchLoadingClass(event);
                  elem._lazyCache = true;
                  setTimeout2(function() {
                    if ("_lazyCache" in elem) {
                      delete elem._lazyCache;
                    }
                  }, 9);
                }
                if (elem.loading == "lazy") {
                  isLoading--;
                }
              }, true);
            });
            var unveilElement = function(elem) {
              if (elem._lazyRace) {
                return;
              }
              var detail;
              var isImg = regImg.test(elem.nodeName);
              var sizes = isImg && (elem[_getAttribute](lazySizesCfg.sizesAttr) || elem[_getAttribute]("sizes"));
              var isAuto = sizes == "auto";
              if ((isAuto || !isCompleted) && isImg && (elem[_getAttribute]("src") || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesCfg.errorClass) && hasClass(elem, lazySizesCfg.lazyClass)) {
                return;
              }
              detail = triggerEvent(elem, "lazyunveilread").detail;
              if (isAuto) {
                autoSizer.updateElem(elem, true, elem.offsetWidth);
              }
              elem._lazyRace = true;
              isLoading++;
              lazyUnveil(elem, detail, isAuto, sizes, isImg);
            };
            var afterScroll = debounce(function() {
              lazySizesCfg.loadMode = 3;
              throttledCheckElements();
            });
            var altLoadmodeScrollListner = function() {
              if (lazySizesCfg.loadMode == 3) {
                lazySizesCfg.loadMode = 2;
              }
              afterScroll();
            };
            var onload = function() {
              if (isCompleted) {
                return;
              }
              if (Date2.now() - started < 999) {
                setTimeout2(onload, 999);
                return;
              }
              isCompleted = true;
              lazySizesCfg.loadMode = 3;
              throttledCheckElements();
              addEventListener("scroll", altLoadmodeScrollListner, true);
            };
            return {
              _: function() {
                started = Date2.now();
                lazysizes.elements = document2.getElementsByClassName(lazySizesCfg.lazyClass);
                preloadElems = document2.getElementsByClassName(lazySizesCfg.lazyClass + " " + lazySizesCfg.preloadClass);
                addEventListener("scroll", throttledCheckElements, true);
                addEventListener("resize", throttledCheckElements, true);
                addEventListener("pageshow", function(e2) {
                  if (e2.persisted) {
                    var loadingElements = document2.querySelectorAll("." + lazySizesCfg.loadingClass);
                    if (loadingElements.length && loadingElements.forEach) {
                      requestAnimationFrame2(function() {
                        loadingElements.forEach(function(img) {
                          if (img.complete) {
                            unveilElement(img);
                          }
                        });
                      });
                    }
                  }
                });
                if (window2.MutationObserver) {
                  new MutationObserver(throttledCheckElements).observe(docElem, { childList: true, subtree: true, attributes: true });
                } else {
                  docElem[_addEventListener]("DOMNodeInserted", throttledCheckElements, true);
                  docElem[_addEventListener]("DOMAttrModified", throttledCheckElements, true);
                  setInterval(throttledCheckElements, 999);
                }
                addEventListener("hashchange", throttledCheckElements, true);
                ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(name) {
                  document2[_addEventListener](name, throttledCheckElements, true);
                });
                if (/d$|^c/.test(document2.readyState)) {
                  onload();
                } else {
                  addEventListener("load", onload);
                  document2[_addEventListener]("DOMContentLoaded", throttledCheckElements);
                  setTimeout2(onload, 2e4);
                }
                if (lazysizes.elements.length) {
                  checkElements();
                  rAF._lsFlush();
                } else {
                  throttledCheckElements();
                }
              },
              checkElems: throttledCheckElements,
              unveil: unveilElement,
              _aLSL: altLoadmodeScrollListner
            };
          })();
          var autoSizer = (function() {
            var autosizesElems;
            var sizeElement = rAFIt(function(elem, parent, event, width) {
              var sources, i3, len;
              elem._lazysizesWidth = width;
              width += "px";
              elem.setAttribute("sizes", width);
              if (regPicture.test(parent.nodeName || "")) {
                sources = parent.getElementsByTagName("source");
                for (i3 = 0, len = sources.length; i3 < len; i3++) {
                  sources[i3].setAttribute("sizes", width);
                }
              }
              if (!event.detail.dataAttr) {
                updatePolyfill(elem, event.detail);
              }
            });
            var getSizeElement = function(elem, dataAttr, width) {
              var event;
              var parent = elem.parentNode;
              if (parent) {
                width = getWidth(elem, parent, width);
                event = triggerEvent(elem, "lazybeforesizes", { width, dataAttr: !!dataAttr });
                if (!event.defaultPrevented) {
                  width = event.detail.width;
                  if (width && width !== elem._lazysizesWidth) {
                    sizeElement(elem, parent, event, width);
                  }
                }
              }
            };
            var updateElementsSizes = function() {
              var i3;
              var len = autosizesElems.length;
              if (len) {
                i3 = 0;
                for (; i3 < len; i3++) {
                  getSizeElement(autosizesElems[i3]);
                }
              }
            };
            var debouncedUpdateElementsSizes = debounce(updateElementsSizes);
            return {
              _: function() {
                autosizesElems = document2.getElementsByClassName(lazySizesCfg.autosizesClass);
                addEventListener("resize", debouncedUpdateElementsSizes);
              },
              checkElems: debouncedUpdateElementsSizes,
              updateElem: getSizeElement
            };
          })();
          var init2 = function() {
            if (!init2.i && document2.getElementsByClassName) {
              init2.i = true;
              autoSizer._();
              loader._();
            }
          };
          setTimeout2(function() {
            if (lazySizesCfg.init) {
              init2();
            }
          });
          lazysizes = {
            /**
             * @type { LazySizesConfigPartial }
             */
            cfg: lazySizesCfg,
            autoSizer,
            loader,
            init: init2,
            uP: updatePolyfill,
            aC: addClass,
            rC: removeClass,
            hC: hasClass,
            fire: triggerEvent,
            gW: getWidth,
            rAF
          };
          return lazysizes;
        }
      );
    }
  });

  // node_modules/lazysizes/plugins/native-loading/ls.native-loading.js
  var require_ls_native_loading = __commonJS({
    "node_modules/lazysizes/plugins/native-loading/ls.native-loading.js"(exports, module) {
      (function(window2, factory) {
        var globalInstall = function() {
          factory(window2.lazySizes);
          window2.removeEventListener("lazyunveilread", globalInstall, true);
        };
        factory = factory.bind(null, window2, window2.document);
        if (typeof module == "object" && module.exports) {
          factory(require_lazysizes());
        } else if (typeof define == "function" && define.amd) {
          define(["lazysizes"], factory);
        } else if (window2.lazySizes) {
          globalInstall();
        } else {
          window2.addEventListener("lazyunveilread", globalInstall, true);
        }
      })(window, function(window2, document2, lazySizes2) {
        "use strict";
        var imgSupport = "loading" in HTMLImageElement.prototype;
        var iframeSupport = "loading" in HTMLIFrameElement.prototype;
        var isConfigSet = false;
        var oldPrematureUnveil = lazySizes2.prematureUnveil;
        var cfg = lazySizes2.cfg;
        var listenerMap = {
          focus: 1,
          mouseover: 1,
          click: 1,
          load: 1,
          transitionend: 1,
          animationend: 1,
          scroll: 1,
          resize: 1
        };
        if (!cfg.nativeLoading) {
          cfg.nativeLoading = {};
        }
        if (!window2.addEventListener || !window2.MutationObserver || !imgSupport && !iframeSupport) {
          return;
        }
        function disableEvents() {
          var loader = lazySizes2.loader;
          var throttledCheckElements = loader.checkElems;
          var removeALSL = function() {
            setTimeout(function() {
              window2.removeEventListener("scroll", loader._aLSL, true);
            }, 1e3);
          };
          var currentListenerMap = typeof cfg.nativeLoading.disableListeners == "object" ? cfg.nativeLoading.disableListeners : listenerMap;
          if (currentListenerMap.scroll) {
            window2.addEventListener("load", removeALSL);
            removeALSL();
            window2.removeEventListener("scroll", throttledCheckElements, true);
          }
          if (currentListenerMap.resize) {
            window2.removeEventListener("resize", throttledCheckElements, true);
          }
          Object.keys(currentListenerMap).forEach(function(name) {
            if (currentListenerMap[name]) {
              document2.removeEventListener(name, throttledCheckElements, true);
            }
          });
        }
        function runConfig() {
          if (isConfigSet) {
            return;
          }
          isConfigSet = true;
          if (imgSupport && iframeSupport && cfg.nativeLoading.disableListeners) {
            if (cfg.nativeLoading.disableListeners === true) {
              cfg.nativeLoading.setLoadingAttribute = true;
            }
            disableEvents();
          }
          if (cfg.nativeLoading.setLoadingAttribute) {
            window2.addEventListener("lazybeforeunveil", function(e2) {
              var element = e2.target;
              if ("loading" in element && !element.getAttribute("loading")) {
                element.setAttribute("loading", "lazy");
              }
            }, true);
          }
        }
        lazySizes2.prematureUnveil = function prematureUnveil(element) {
          if (!isConfigSet) {
            runConfig();
          }
          if ("loading" in element && (cfg.nativeLoading.setLoadingAttribute || element.getAttribute("loading")) && (element.getAttribute("data-sizes") != "auto" || element.offsetWidth)) {
            return true;
          }
          if (oldPrematureUnveil) {
            return oldPrematureUnveil(element);
          }
        };
      });
    }
  });

  // node_modules/clipboard/dist/clipboard.js
  var require_clipboard = __commonJS({
    "node_modules/clipboard/dist/clipboard.js"(exports, module) {
      (function webpackUniversalModuleDefinition(root, factory) {
        if (typeof exports === "object" && typeof module === "object")
          module.exports = factory();
        else if (typeof define === "function" && define.amd)
          define([], factory);
        else if (typeof exports === "object")
          exports["ClipboardJS"] = factory();
        else
          root["ClipboardJS"] = factory();
      })(exports, function() {
        return (
          /******/
          (function() {
            var __webpack_modules__ = {
              /***/
              686: (
                /***/
                (function(__unused_webpack_module, __webpack_exports__, __webpack_require__2) {
                  "use strict";
                  __webpack_require__2.d(__webpack_exports__, {
                    "default": function() {
                      return (
                        /* binding */
                        clipboard
                      );
                    }
                  });
                  var tiny_emitter = __webpack_require__2(279);
                  var tiny_emitter_default = /* @__PURE__ */ __webpack_require__2.n(tiny_emitter);
                  var listen = __webpack_require__2(370);
                  var listen_default = /* @__PURE__ */ __webpack_require__2.n(listen);
                  var src_select = __webpack_require__2(817);
                  var select_default = /* @__PURE__ */ __webpack_require__2.n(src_select);
                  ;
                  function command(type) {
                    try {
                      return document.execCommand(type);
                    } catch (err) {
                      return false;
                    }
                  }
                  ;
                  var ClipboardActionCut = function ClipboardActionCut2(target) {
                    var selectedText = select_default()(target);
                    command("cut");
                    return selectedText;
                  };
                  var actions_cut = ClipboardActionCut;
                  ;
                  function createFakeElement(value) {
                    var isRTL = document.documentElement.getAttribute("dir") === "rtl";
                    var fakeElement = document.createElement("textarea");
                    fakeElement.style.fontSize = "12pt";
                    fakeElement.style.border = "0";
                    fakeElement.style.padding = "0";
                    fakeElement.style.margin = "0";
                    fakeElement.style.position = "absolute";
                    fakeElement.style[isRTL ? "right" : "left"] = "-9999px";
                    var yPosition = window.pageYOffset || document.documentElement.scrollTop;
                    fakeElement.style.top = "".concat(yPosition, "px");
                    fakeElement.setAttribute("readonly", "");
                    fakeElement.value = value;
                    return fakeElement;
                  }
                  ;
                  var fakeCopyAction = function fakeCopyAction2(value, options) {
                    var fakeElement = createFakeElement(value);
                    options.container.appendChild(fakeElement);
                    var selectedText = select_default()(fakeElement);
                    command("copy");
                    fakeElement.remove();
                    return selectedText;
                  };
                  var ClipboardActionCopy = function ClipboardActionCopy2(target) {
                    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                      container: document.body
                    };
                    var selectedText = "";
                    if (typeof target === "string") {
                      selectedText = fakeCopyAction(target, options);
                    } else if (target instanceof HTMLInputElement && !["text", "search", "url", "tel", "password"].includes(target === null || target === void 0 ? void 0 : target.type)) {
                      selectedText = fakeCopyAction(target.value, options);
                    } else {
                      selectedText = select_default()(target);
                      command("copy");
                    }
                    return selectedText;
                  };
                  var actions_copy = ClipboardActionCopy;
                  ;
                  function _typeof(obj) {
                    "@babel/helpers - typeof";
                    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                      _typeof = function _typeof2(obj2) {
                        return typeof obj2;
                      };
                    } else {
                      _typeof = function _typeof2(obj2) {
                        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
                      };
                    }
                    return _typeof(obj);
                  }
                  var ClipboardActionDefault = function ClipboardActionDefault2() {
                    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                    var _options$action = options.action, action = _options$action === void 0 ? "copy" : _options$action, container = options.container, target = options.target, text = options.text;
                    if (action !== "copy" && action !== "cut") {
                      throw new Error('Invalid "action" value, use either "copy" or "cut"');
                    }
                    if (target !== void 0) {
                      if (target && _typeof(target) === "object" && target.nodeType === 1) {
                        if (action === "copy" && target.hasAttribute("disabled")) {
                          throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                        }
                        if (action === "cut" && (target.hasAttribute("readonly") || target.hasAttribute("disabled"))) {
                          throw new Error(`Invalid "target" attribute. You can't cut text from elements with "readonly" or "disabled" attributes`);
                        }
                      } else {
                        throw new Error('Invalid "target" value, use a valid Element');
                      }
                    }
                    if (text) {
                      return actions_copy(text, {
                        container
                      });
                    }
                    if (target) {
                      return action === "cut" ? actions_cut(target) : actions_copy(target, {
                        container
                      });
                    }
                  };
                  var actions_default = ClipboardActionDefault;
                  ;
                  function clipboard_typeof(obj) {
                    "@babel/helpers - typeof";
                    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                      clipboard_typeof = function _typeof2(obj2) {
                        return typeof obj2;
                      };
                    } else {
                      clipboard_typeof = function _typeof2(obj2) {
                        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
                      };
                    }
                    return clipboard_typeof(obj);
                  }
                  function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) {
                      throw new TypeError("Cannot call a class as a function");
                    }
                  }
                  function _defineProperties(target, props) {
                    for (var i3 = 0; i3 < props.length; i3++) {
                      var descriptor = props[i3];
                      descriptor.enumerable = descriptor.enumerable || false;
                      descriptor.configurable = true;
                      if ("value" in descriptor) descriptor.writable = true;
                      Object.defineProperty(target, descriptor.key, descriptor);
                    }
                  }
                  function _createClass(Constructor, protoProps, staticProps) {
                    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) _defineProperties(Constructor, staticProps);
                    return Constructor;
                  }
                  function _inherits(subClass, superClass) {
                    if (typeof superClass !== "function" && superClass !== null) {
                      throw new TypeError("Super expression must either be null or a function");
                    }
                    subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
                    if (superClass) _setPrototypeOf(subClass, superClass);
                  }
                  function _setPrototypeOf(o2, p) {
                    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o3, p2) {
                      o3.__proto__ = p2;
                      return o3;
                    };
                    return _setPrototypeOf(o2, p);
                  }
                  function _createSuper(Derived) {
                    var hasNativeReflectConstruct = _isNativeReflectConstruct();
                    return function _createSuperInternal() {
                      var Super = _getPrototypeOf(Derived), result;
                      if (hasNativeReflectConstruct) {
                        var NewTarget = _getPrototypeOf(this).constructor;
                        result = Reflect.construct(Super, arguments, NewTarget);
                      } else {
                        result = Super.apply(this, arguments);
                      }
                      return _possibleConstructorReturn(this, result);
                    };
                  }
                  function _possibleConstructorReturn(self2, call) {
                    if (call && (clipboard_typeof(call) === "object" || typeof call === "function")) {
                      return call;
                    }
                    return _assertThisInitialized(self2);
                  }
                  function _assertThisInitialized(self2) {
                    if (self2 === void 0) {
                      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    }
                    return self2;
                  }
                  function _isNativeReflectConstruct() {
                    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
                    if (Reflect.construct.sham) return false;
                    if (typeof Proxy === "function") return true;
                    try {
                      Date.prototype.toString.call(Reflect.construct(Date, [], function() {
                      }));
                      return true;
                    } catch (e2) {
                      return false;
                    }
                  }
                  function _getPrototypeOf(o2) {
                    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o3) {
                      return o3.__proto__ || Object.getPrototypeOf(o3);
                    };
                    return _getPrototypeOf(o2);
                  }
                  function getAttributeValue(suffix, element) {
                    var attribute = "data-clipboard-".concat(suffix);
                    if (!element.hasAttribute(attribute)) {
                      return;
                    }
                    return element.getAttribute(attribute);
                  }
                  var Clipboard2 = /* @__PURE__ */ (function(_Emitter) {
                    _inherits(Clipboard3, _Emitter);
                    var _super = _createSuper(Clipboard3);
                    function Clipboard3(trigger, options) {
                      var _this;
                      _classCallCheck(this, Clipboard3);
                      _this = _super.call(this);
                      _this.resolveOptions(options);
                      _this.listenClick(trigger);
                      return _this;
                    }
                    _createClass(Clipboard3, [{
                      key: "resolveOptions",
                      value: function resolveOptions() {
                        var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                        this.action = typeof options.action === "function" ? options.action : this.defaultAction;
                        this.target = typeof options.target === "function" ? options.target : this.defaultTarget;
                        this.text = typeof options.text === "function" ? options.text : this.defaultText;
                        this.container = clipboard_typeof(options.container) === "object" ? options.container : document.body;
                      }
                      /**
                       * Adds a click event listener to the passed trigger.
                       * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
                       */
                    }, {
                      key: "listenClick",
                      value: function listenClick(trigger) {
                        var _this2 = this;
                        this.listener = listen_default()(trigger, "click", function(e2) {
                          return _this2.onClick(e2);
                        });
                      }
                      /**
                       * Defines a new `ClipboardAction` on each click event.
                       * @param {Event} e
                       */
                    }, {
                      key: "onClick",
                      value: function onClick(e2) {
                        var trigger = e2.delegateTarget || e2.currentTarget;
                        var action = this.action(trigger) || "copy";
                        var text = actions_default({
                          action,
                          container: this.container,
                          target: this.target(trigger),
                          text: this.text(trigger)
                        });
                        this.emit(text ? "success" : "error", {
                          action,
                          text,
                          trigger,
                          clearSelection: function clearSelection() {
                            if (trigger) {
                              trigger.focus();
                            }
                            window.getSelection().removeAllRanges();
                          }
                        });
                      }
                      /**
                       * Default `action` lookup function.
                       * @param {Element} trigger
                       */
                    }, {
                      key: "defaultAction",
                      value: function defaultAction(trigger) {
                        return getAttributeValue("action", trigger);
                      }
                      /**
                       * Default `target` lookup function.
                       * @param {Element} trigger
                       */
                    }, {
                      key: "defaultTarget",
                      value: function defaultTarget(trigger) {
                        var selector = getAttributeValue("target", trigger);
                        if (selector) {
                          return document.querySelector(selector);
                        }
                      }
                      /**
                       * Allow fire programmatically a copy action
                       * @param {String|HTMLElement} target
                       * @param {Object} options
                       * @returns Text copied.
                       */
                    }, {
                      key: "defaultText",
                      /**
                       * Default `text` lookup function.
                       * @param {Element} trigger
                       */
                      value: function defaultText(trigger) {
                        return getAttributeValue("text", trigger);
                      }
                      /**
                       * Destroy lifecycle.
                       */
                    }, {
                      key: "destroy",
                      value: function destroy() {
                        this.listener.destroy();
                      }
                    }], [{
                      key: "copy",
                      value: function copy(target) {
                        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                          container: document.body
                        };
                        return actions_copy(target, options);
                      }
                      /**
                       * Allow fire programmatically a cut action
                       * @param {String|HTMLElement} target
                       * @returns Text cutted.
                       */
                    }, {
                      key: "cut",
                      value: function cut(target) {
                        return actions_cut(target);
                      }
                      /**
                       * Returns the support of the given action, or all actions if no action is
                       * given.
                       * @param {String} [action]
                       */
                    }, {
                      key: "isSupported",
                      value: function isSupported() {
                        var action = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ["copy", "cut"];
                        var actions = typeof action === "string" ? [action] : action;
                        var support = !!document.queryCommandSupported;
                        actions.forEach(function(action2) {
                          support = support && !!document.queryCommandSupported(action2);
                        });
                        return support;
                      }
                    }]);
                    return Clipboard3;
                  })(tiny_emitter_default());
                  var clipboard = Clipboard2;
                })
              ),
              /***/
              828: (
                /***/
                (function(module2) {
                  var DOCUMENT_NODE_TYPE = 9;
                  if (typeof Element !== "undefined" && !Element.prototype.matches) {
                    var proto = Element.prototype;
                    proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
                  }
                  function closest(element, selector) {
                    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
                      if (typeof element.matches === "function" && element.matches(selector)) {
                        return element;
                      }
                      element = element.parentNode;
                    }
                  }
                  module2.exports = closest;
                })
              ),
              /***/
              438: (
                /***/
                (function(module2, __unused_webpack_exports, __webpack_require__2) {
                  var closest = __webpack_require__2(828);
                  function _delegate(element, selector, type, callback, useCapture) {
                    var listenerFn = listener.apply(this, arguments);
                    element.addEventListener(type, listenerFn, useCapture);
                    return {
                      destroy: function() {
                        element.removeEventListener(type, listenerFn, useCapture);
                      }
                    };
                  }
                  function delegate(elements, selector, type, callback, useCapture) {
                    if (typeof elements.addEventListener === "function") {
                      return _delegate.apply(null, arguments);
                    }
                    if (typeof type === "function") {
                      return _delegate.bind(null, document).apply(null, arguments);
                    }
                    if (typeof elements === "string") {
                      elements = document.querySelectorAll(elements);
                    }
                    return Array.prototype.map.call(elements, function(element) {
                      return _delegate(element, selector, type, callback, useCapture);
                    });
                  }
                  function listener(element, selector, type, callback) {
                    return function(e2) {
                      e2.delegateTarget = closest(e2.target, selector);
                      if (e2.delegateTarget) {
                        callback.call(element, e2);
                      }
                    };
                  }
                  module2.exports = delegate;
                })
              ),
              /***/
              879: (
                /***/
                (function(__unused_webpack_module, exports2) {
                  exports2.node = function(value) {
                    return value !== void 0 && value instanceof HTMLElement && value.nodeType === 1;
                  };
                  exports2.nodeList = function(value) {
                    var type = Object.prototype.toString.call(value);
                    return value !== void 0 && (type === "[object NodeList]" || type === "[object HTMLCollection]") && "length" in value && (value.length === 0 || exports2.node(value[0]));
                  };
                  exports2.string = function(value) {
                    return typeof value === "string" || value instanceof String;
                  };
                  exports2.fn = function(value) {
                    var type = Object.prototype.toString.call(value);
                    return type === "[object Function]";
                  };
                })
              ),
              /***/
              370: (
                /***/
                (function(module2, __unused_webpack_exports, __webpack_require__2) {
                  var is = __webpack_require__2(879);
                  var delegate = __webpack_require__2(438);
                  function listen(target, type, callback) {
                    if (!target && !type && !callback) {
                      throw new Error("Missing required arguments");
                    }
                    if (!is.string(type)) {
                      throw new TypeError("Second argument must be a String");
                    }
                    if (!is.fn(callback)) {
                      throw new TypeError("Third argument must be a Function");
                    }
                    if (is.node(target)) {
                      return listenNode(target, type, callback);
                    } else if (is.nodeList(target)) {
                      return listenNodeList(target, type, callback);
                    } else if (is.string(target)) {
                      return listenSelector(target, type, callback);
                    } else {
                      throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
                    }
                  }
                  function listenNode(node, type, callback) {
                    node.addEventListener(type, callback);
                    return {
                      destroy: function() {
                        node.removeEventListener(type, callback);
                      }
                    };
                  }
                  function listenNodeList(nodeList, type, callback) {
                    Array.prototype.forEach.call(nodeList, function(node) {
                      node.addEventListener(type, callback);
                    });
                    return {
                      destroy: function() {
                        Array.prototype.forEach.call(nodeList, function(node) {
                          node.removeEventListener(type, callback);
                        });
                      }
                    };
                  }
                  function listenSelector(selector, type, callback) {
                    return delegate(document.body, selector, type, callback);
                  }
                  module2.exports = listen;
                })
              ),
              /***/
              817: (
                /***/
                (function(module2) {
                  function select(element) {
                    var selectedText;
                    if (element.nodeName === "SELECT") {
                      element.focus();
                      selectedText = element.value;
                    } else if (element.nodeName === "INPUT" || element.nodeName === "TEXTAREA") {
                      var isReadOnly = element.hasAttribute("readonly");
                      if (!isReadOnly) {
                        element.setAttribute("readonly", "");
                      }
                      element.select();
                      element.setSelectionRange(0, element.value.length);
                      if (!isReadOnly) {
                        element.removeAttribute("readonly");
                      }
                      selectedText = element.value;
                    } else {
                      if (element.hasAttribute("contenteditable")) {
                        element.focus();
                      }
                      var selection = window.getSelection();
                      var range = document.createRange();
                      range.selectNodeContents(element);
                      selection.removeAllRanges();
                      selection.addRange(range);
                      selectedText = selection.toString();
                    }
                    return selectedText;
                  }
                  module2.exports = select;
                })
              ),
              /***/
              279: (
                /***/
                (function(module2) {
                  function E() {
                  }
                  E.prototype = {
                    on: function(name, callback, ctx) {
                      var e2 = this.e || (this.e = {});
                      (e2[name] || (e2[name] = [])).push({
                        fn: callback,
                        ctx
                      });
                      return this;
                    },
                    once: function(name, callback, ctx) {
                      var self2 = this;
                      function listener() {
                        self2.off(name, listener);
                        callback.apply(ctx, arguments);
                      }
                      ;
                      listener._ = callback;
                      return this.on(name, listener, ctx);
                    },
                    emit: function(name) {
                      var data = [].slice.call(arguments, 1);
                      var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
                      var i3 = 0;
                      var len = evtArr.length;
                      for (i3; i3 < len; i3++) {
                        evtArr[i3].fn.apply(evtArr[i3].ctx, data);
                      }
                      return this;
                    },
                    off: function(name, callback) {
                      var e2 = this.e || (this.e = {});
                      var evts = e2[name];
                      var liveEvents = [];
                      if (evts && callback) {
                        for (var i3 = 0, len = evts.length; i3 < len; i3++) {
                          if (evts[i3].fn !== callback && evts[i3].fn._ !== callback)
                            liveEvents.push(evts[i3]);
                        }
                      }
                      liveEvents.length ? e2[name] = liveEvents : delete e2[name];
                      return this;
                    }
                  };
                  module2.exports = E;
                  module2.exports.TinyEmitter = E;
                })
              )
              /******/
            };
            var __webpack_module_cache__ = {};
            function __webpack_require__(moduleId) {
              if (__webpack_module_cache__[moduleId]) {
                return __webpack_module_cache__[moduleId].exports;
              }
              var module2 = __webpack_module_cache__[moduleId] = {
                /******/
                // no module.id needed
                /******/
                // no module.loaded needed
                /******/
                exports: {}
                /******/
              };
              __webpack_modules__[moduleId](module2, module2.exports, __webpack_require__);
              return module2.exports;
            }
            !(function() {
              __webpack_require__.n = function(module2) {
                var getter = module2 && module2.__esModule ? (
                  /******/
                  function() {
                    return module2["default"];
                  }
                ) : (
                  /******/
                  function() {
                    return module2;
                  }
                );
                __webpack_require__.d(getter, { a: getter });
                return getter;
              };
            })();
            !(function() {
              __webpack_require__.d = function(exports2, definition) {
                for (var key in definition) {
                  if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports2, key)) {
                    Object.defineProperty(exports2, key, { enumerable: true, get: definition[key] });
                  }
                }
              };
            })();
            !(function() {
              __webpack_require__.o = function(obj, prop) {
                return Object.prototype.hasOwnProperty.call(obj, prop);
              };
            })();
            return __webpack_require__(686);
          })().default
        );
      });
    }
  });

  // node_modules/basiclightbox/dist/basicLightbox.min.js
  var require_basicLightbox_min = __commonJS({
    "node_modules/basiclightbox/dist/basicLightbox.min.js"(exports, module) {
      !(function(e2) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = e2();
        else if ("function" == typeof define && define.amd) define([], e2);
        else {
          ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).basicLightbox = e2();
        }
      })((function() {
        return (function e2(n2, t2, o2) {
          function r2(c3, u2) {
            if (!t2[c3]) {
              if (!n2[c3]) {
                var s2 = "function" == typeof __require && __require;
                if (!u2 && s2) return s2(c3, true);
                if (i3) return i3(c3, true);
                var a2 = new Error("Cannot find module '" + c3 + "'");
                throw a2.code = "MODULE_NOT_FOUND", a2;
              }
              var l2 = t2[c3] = { exports: {} };
              n2[c3][0].call(l2.exports, (function(e3) {
                return r2(n2[c3][1][e3] || e3);
              }), l2, l2.exports, e2, n2, t2, o2);
            }
            return t2[c3].exports;
          }
          for (var i3 = "function" == typeof __require && __require, c2 = 0; c2 < o2.length; c2++) r2(o2[c2]);
          return r2;
        })({ 1: [function(e2, n2, t2) {
          "use strict";
          Object.defineProperty(t2, "__esModule", { value: true }), t2.create = t2.visible = void 0;
          var o2 = function(e3) {
            var n3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], t3 = document.createElement("div");
            return t3.innerHTML = e3.trim(), true === n3 ? t3.children : t3.firstChild;
          }, r2 = function(e3, n3) {
            var t3 = e3.children;
            return 1 === t3.length && t3[0].tagName === n3;
          }, i3 = function(e3) {
            return null != (e3 = e3 || document.querySelector(".basicLightbox")) && true === e3.ownerDocument.body.contains(e3);
          };
          t2.visible = i3;
          t2.create = function(e3, n3) {
            var t3 = (function(e4, n4) {
              var t4 = o2('\n		<div class="basicLightbox '.concat(n4.className, '">\n			<div class="basicLightbox__placeholder" role="dialog"></div>\n		</div>\n	')), i4 = t4.querySelector(".basicLightbox__placeholder");
              e4.forEach((function(e5) {
                return i4.appendChild(e5);
              }));
              var c3 = r2(i4, "IMG"), u3 = r2(i4, "VIDEO"), s2 = r2(i4, "IFRAME");
              return true === c3 && t4.classList.add("basicLightbox--img"), true === u3 && t4.classList.add("basicLightbox--video"), true === s2 && t4.classList.add("basicLightbox--iframe"), t4;
            })(e3 = (function(e4) {
              var n4 = "string" == typeof e4, t4 = e4 instanceof HTMLElement == 1;
              if (false === n4 && false === t4) throw new Error("Content must be a DOM element/node or string");
              return true === n4 ? Array.from(o2(e4, true)) : "TEMPLATE" === e4.tagName ? [e4.content.cloneNode(true)] : Array.from(e4.children);
            })(e3), n3 = (function() {
              var e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              if (null == (e4 = Object.assign({}, e4)).closable && (e4.closable = true), null == e4.className && (e4.className = ""), null == e4.onShow && (e4.onShow = function() {
              }), null == e4.onClose && (e4.onClose = function() {
              }), "boolean" != typeof e4.closable) throw new Error("Property `closable` must be a boolean");
              if ("string" != typeof e4.className) throw new Error("Property `className` must be a string");
              if ("function" != typeof e4.onShow) throw new Error("Property `onShow` must be a function");
              if ("function" != typeof e4.onClose) throw new Error("Property `onClose` must be a function");
              return e4;
            })(n3)), c2 = function(e4) {
              return false !== n3.onClose(u2) && (function(e5, n4) {
                return e5.classList.remove("basicLightbox--visible"), setTimeout((function() {
                  return false === i3(e5) || e5.parentElement.removeChild(e5), n4();
                }), 410), true;
              })(t3, (function() {
                if ("function" == typeof e4) return e4(u2);
              }));
            };
            true === n3.closable && t3.addEventListener("click", (function(e4) {
              e4.target === t3 && c2();
            }));
            var u2 = { element: function() {
              return t3;
            }, visible: function() {
              return i3(t3);
            }, show: function(e4) {
              return false !== n3.onShow(u2) && (function(e5, n4) {
                return document.body.appendChild(e5), setTimeout((function() {
                  requestAnimationFrame((function() {
                    return e5.classList.add("basicLightbox--visible"), n4();
                  }));
                }), 10), true;
              })(t3, (function() {
                if ("function" == typeof e4) return e4(u2);
              }));
            }, close: c2 };
            return u2;
          };
        }, {}] }, {}, [1])(1);
      }));
    }
  });

  // node_modules/quicklink/dist/quicklink.mjs
  function e(e2, r2) {
    (null == r2 || r2 > e2.length) && (r2 = e2.length);
    for (var n2 = 0, t2 = Array(r2); n2 < r2; n2++) t2[n2] = e2[n2];
    return t2;
  }
  function r(r2, n2) {
    var t2 = "undefined" != typeof Symbol && r2[Symbol.iterator] || r2["@@iterator"];
    if (t2) return (t2 = t2.call(r2)).next.bind(t2);
    if (Array.isArray(r2) || (t2 = (function(r3, n3) {
      if (r3) {
        if ("string" == typeof r3) return e(r3, n3);
        var t3 = {}.toString.call(r3).slice(8, -1);
        return "Object" === t3 && r3.constructor && (t3 = r3.constructor.name), "Map" === t3 || "Set" === t3 ? Array.from(r3) : "Arguments" === t3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t3) ? e(r3, n3) : void 0;
      }
    })(r2)) || n2) {
      t2 && (r2 = t2);
      var o2 = 0;
      return function() {
        return o2 >= r2.length ? { done: true } : { done: false, value: r2[o2++] };
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function n(e2, r2, n2, t2) {
    var o2 = { headers: { accept: "*/*" } };
    return r2 || (o2.mode = "no-cors"), n2 && (o2.credentials = "include"), o2.priority = t2 ? "high" : "low", window.fetch ? fetch(e2, o2) : (function(e3, r3) {
      return new Promise(function(n3, t3, o3) {
        (o3 = new XMLHttpRequest()).open("GET", e3, o3.withCredentials = r3), o3.setRequestHeader("Accept", "*/*"), o3.onload = function() {
          200 === o3.status ? n3() : t3();
        }, o3.send();
      });
    })(e2, n2);
  }
  var t;
  var o = (t = document.createElement("link")).relList && t.relList.supports && t.relList.supports("prefetch") ? function(e2, r2) {
    return new Promise(function(n2, t2, o2) {
      (o2 = document.createElement("link")).rel = "prefetch", o2.href = e2, r2 && o2.setAttribute("crossorigin", "anonymous"), o2.onload = n2, o2.onerror = t2, document.head.append(o2);
    });
  } : n;
  var i = window.requestIdleCallback || function(e2) {
    var r2 = Date.now();
    return setTimeout(function() {
      e2({ didTimeout: false, timeRemaining: function() {
        return Math.max(0, 50 - (Date.now() - r2));
      } });
    }, 1);
  };
  var a = /* @__PURE__ */ new Set();
  var c = /* @__PURE__ */ new Set();
  var s = false;
  function u(e2, r2) {
    return Array.isArray(r2) ? r2.some(function(r3) {
      return u(e2, r3);
    }) : (r2.test || r2).call(r2, e2.href, e2);
  }
  function l(e2) {
    return !e2 || (e2.saveData ? new Error("Save-Data is enabled") : !/2g/.test(e2.effectiveType) || new Error("network conditions are poor"));
  }
  function f(e2) {
    if (void 0 === e2 && (e2 = {}), !window.IntersectionObserver || !("isIntersecting" in IntersectionObserverEntry.prototype)) return function() {
    };
    var n2 = (function(e3) {
      e3 = e3 || 1;
      var r2 = [], n3 = 0;
      function t3() {
        n3 < e3 && r2.length > 0 && (r2.shift()(), n3++);
      }
      return [function(e4) {
        r2.push(e4) > 1 || t3();
      }, function() {
        n3--, t3();
      }];
    })(e2.throttle || 1 / 0), t2 = n2[0], o2 = n2[1], l2 = e2.limit || 1 / 0, f2 = e2.threshold || 0, h = e2.origins || [location.hostname], m = e2.ignores || [], p = e2.delay || 0, g = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map(), y = e2.timeoutFn || i, E = "function" == typeof e2.hrefFn && e2.hrefFn, b = e2.prerender || false;
    s = e2.prerenderAndPrefetch || false;
    var A = new IntersectionObserver(function(n3) {
      for (var i3, u2 = function() {
        var n4 = i3.value, u3 = g.get(n4.target.href) || /* @__PURE__ */ new Set();
        g.set(n4.target.href, u3), n4.isIntersecting ? (n4 = n4.target, u3.add(n4), (function(e3, r2) {
          r2 ? setTimeout(e3, r2) : e3();
        })(function() {
          u3 && u3.size && (b || s || A.unobserve(n4), (s || b) && c.size < l2 && !w.has(n4.href) ? v(E ? E(n4) : n4.href, e2.eagerness).then(function(e3) {
            for (var n5, t3 = r(e3); !(n5 = t3()).done; ) {
              var o3 = n5.value, i4 = o3[0], a2 = o3[1];
              w.set(i4, a2);
            }
          }).catch(function(r2) {
            if (!e2.onError) throw r2;
            e2.onError(r2);
          }) : a.size < l2 && !b && t2(function() {
            d(E ? E(n4) : n4.href, e2.priority, e2.checkAccessControlAllowOrigin, e2.checkAccessControlAllowCredentials, e2.onlyOnMouseover).then(o2).catch(function(r2) {
              o2(), e2.onError && e2.onError(r2);
            });
          }));
        }, p)) : (n4 = n4.target, u3.delete(n4), w.has(n4.href) && w.set((function(e3, r2) {
          var n5 = e3.get(r2);
          try {
            n5.remove(), e3.delete(r2);
          } catch (e4) {
            return e4;
          }
          return e3;
        })(w, n4.href)));
      }, f3 = r(n3); !(i3 = f3()).done; ) u2();
    }, { threshold: f2 });
    return y(function() {
      for (var n3, t3 = r(e2.el && e2.el.length > 0 && "A" === e2.el[0].nodeName ? e2.el : (e2.el || document).querySelectorAll("a")); !(n3 = t3()).done; ) {
        var o3 = n3.value;
        h.length && !h.includes(o3.hostname) || u(o3, m) || A.observe(o3);
      }
    }, { timeout: e2.timeout || 2e3 }), function() {
      a.clear(), A.disconnect();
    };
  }
  function d(e2, t2, i3, u2, f2) {
    var d2 = l(navigator.connection);
    return d2 instanceof Error ? Promise.reject(new Error("Cannot prefetch, " + d2.message)) : (c.size > 0 && !s && console.warn("[Warning] You are using both prefetching and prerendering on the same document"), Promise.all([e2].flat().map(function(e3) {
      return a.has(e3) ? [] : (a.add(e3), (function(e4, n2, t3) {
        for (var o2 = arguments.length, i4 = new Array(o2 > 3 ? o2 - 3 : 0), a2 = 3; a2 < o2; a2++) i4[a2 - 3] = arguments[a2];
        if (!t3) return e4.apply(void 0, [n2].concat(i4));
        for (var c2, s2 = document.querySelectorAll('a[href="' + n2 + '"]'), u3 = /* @__PURE__ */ new Map(), l2 = function() {
          var r2 = c2.value, t4 = function() {
            var a3 = setTimeout(function() {
              return r2.removeEventListener("mouseenter", t4), r2.removeEventListener("mouseleave", o3), e4.apply(void 0, [n2].concat(i4));
            }, 200);
            u3.set(r2, a3);
          }, o3 = function() {
            var e5 = u3.get(r2);
            e5 && (clearTimeout(e5), u3.delete(r2));
          };
          r2.addEventListener("mouseenter", t4), r2.addEventListener("mouseleave", o3);
        }, f3 = r(s2); !(c2 = f3()).done; ) l2();
      })(t2 ? n : o, new URL(e3, location.href).toString(), f2, i3, u2, t2));
    })));
  }
  function v(e2, n2) {
    void 0 === n2 && (n2 = "immediate"), e2 = [e2].flat();
    var t2 = l(navigator.connection);
    if (t2 instanceof Error) return Promise.reject(new Error("Cannot prerender, " + t2.message));
    if (!HTMLScriptElement.supports("speculationrules")) return d(e2, true, false, false, "moderate" === n2 || "conservative" === n2), Promise.reject(new Error("This browser does not support the speculation rules API. Falling back to prefetch."));
    for (var o2, i3 = r(e2); !(o2 = i3()).done; ) {
      var u2 = o2.value;
      c.add(u2);
    }
    a.size > 0 && !s && console.warn("[Warning] You are using both prefetching and prerendering on the same document");
    var f2 = (function(e3, n3) {
      var t3 = /* @__PURE__ */ new Map();
      try {
        for (var o3, i4 = r(e3); !(o3 = i4()).done; ) {
          var a2 = o3.value, c2 = document.createElement("script");
          c2.type = "speculationrules", c2.text = JSON.stringify({ prerender: [{ source: "list", urls: [a2], eagerness: n3 }] }), document.head.append(c2), t3.set(a2, c2);
        }
      } catch (e4) {
        return e4;
      }
      return t3;
    })(e2, n2);
    return f2.size > 0 ? Promise.resolve(f2) : Promise.reject(f2);
  }

  // node_modules/@thulite/core/assets/js/core.js
  var import_lazysizes = __toESM(require_lazysizes());
  var import_ls = __toESM(require_ls_native_loading());
  f({
    ignores: [
      /\/api\/?/,
      (uri) => uri.includes(".zip"),
      (uri, elem) => elem.hasAttribute("noprefetch"),
      (uri, elem) => elem.hash && elem.pathname === window.location.pathname
    ]
  });
  try {
    import_lazysizes.default.cfg.nativeLoading = {
      setLoadingAttribute: true,
      disableListeners: {
        scroll: true
      }
    };
    import_lazysizes.default.cfg.lazyClass = "lazyload";
    import_lazysizes.default.cfg.loadedClass = "lazyloaded";
    import_lazysizes.default.cfg.loadingClass = "lazyloading";
    import_lazysizes.default.cfg.expFactor = 1.5;
    if (typeof document !== "undefined") {
      document.documentElement.classList.add("lazysizes-enabled");
    }
  } catch (error) {
    if (typeof console !== "undefined" && console.warn) {
      console.warn("lazySizes initialization failed:", error);
    }
  }

  // ns-hugo-imp:C:\WorkSpace\AAAAAAA\ALL\learning-dashboard\node_modules\@thulite\doks-core\assets\js\clipboard.js
  var import_clipboard = __toESM(require_clipboard());
  (() => {
    "use strict";
    var cb = document.getElementsByClassName("highlight");
    for (var i3 = 0; i3 < cb.length; ++i3) {
      var element = cb[i3];
      element.insertAdjacentHTML(
        "afterbegin",
        '<div class="copy"><button title="Copy to clipboard" class="btn-copy" aria-label="Clipboard button"><div></div></button></div>'
      );
    }
    var clipboard = new import_clipboard.default(".btn-copy", {
      target: function(trigger) {
        return trigger.parentNode.nextElementSibling;
      }
    });
    clipboard.on("success", function(e2) {
      e2.clearSelection();
    });
    clipboard.on("error", function(e2) {
      console.error("Action:", e2.action);
      console.error("Trigger:", e2.trigger);
    });
  })();

  // ns-hugo-imp:C:\WorkSpace\AAAAAAA\ALL\learning-dashboard\node_modules\@thulite\doks-core\assets\js\to-top.js
  var topButton = document.getElementById("toTop");
  if (topButton !== null) {
    topButton.classList.remove("fade");
    window.onscroll = function() {
      scrollFunction();
    };
    topButton.addEventListener("click", topFunction);
  }
  function scrollFunction() {
    if (document.body.scrollTop > 270 || document.documentElement.scrollTop > 270) {
      topButton.classList.add("fade");
    } else {
      topButton.classList.remove("fade");
    }
  }
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  // ns-hugo-imp:C:\WorkSpace\AAAAAAA\ALL\learning-dashboard\node_modules\@thulite\doks-core\assets\js\tabs.js
  var i2;
  var allTabs = document.querySelectorAll("[data-toggle-tab]");
  var allPanes = document.querySelectorAll("[data-pane]");
  function toggleTabs(event) {
    if (event.target) {
      event.preventDefault();
      var clickedTab = event.currentTarget;
      var targetKey = clickedTab.getAttribute("data-toggle-tab");
    } else {
      var targetKey = event;
    }
    if (window.localStorage) {
      window.localStorage.setItem("configLangPref", targetKey);
    }
    var selectedTabs = document.querySelectorAll("[data-toggle-tab=" + targetKey + "]");
    var selectedPanes = document.querySelectorAll("[data-pane=" + targetKey + "]");
    for (var i3 = 0; i3 < allTabs.length; i3++) {
      allTabs[i3].classList.remove("active");
      allPanes[i3].classList.remove("active");
    }
    for (var i3 = 0; i3 < selectedTabs.length; i3++) {
      selectedTabs[i3].classList.add("active");
      selectedPanes[i3].classList.add("show", "active");
    }
  }
  for (i2 = 0; i2 < allTabs.length; i2++) {
    allTabs[i2].addEventListener("click", toggleTabs);
  }
  if (window.localStorage.getItem("configLangPref")) {
    toggleTabs(window.localStorage.getItem("configLangPref"));
  }

  // ns-hugo-imp:C:\WorkSpace\AAAAAAA\ALL\learning-dashboard\node_modules\@thulite\doks-core\assets\js\toc.js
  document.addEventListener("click", function(e2) {
    const tocMobile = e2.target.closest(".toc-mobile");
    if (tocMobile && e2.target.tagName === "A") {
      const details = tocMobile.querySelector("details");
      if (details && details.open) {
        details.open = false;
      }
    }
  });

  // ns-hugo-imp:C:\WorkSpace\AAAAAAA\ALL\learning-dashboard\node_modules\@thulite\doks-core\assets\js\copy-markdown.js
  var copyMarkdownBtn = document.getElementById("copy-markdown");
  if (copyMarkdownBtn) {
    copyMarkdownBtn.addEventListener("click", function(e2) {
      e2.preventDefault();
      const button = this;
      const currentPath = window.location.pathname;
      const markdownPath = currentPath.endsWith("/") ? currentPath + "index.md" : currentPath + "/index.md";
      button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-1 me-1"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 6l0 -3" /><path d="M16.25 7.75l2.15 -2.15" /><path d="M18 12l3 0" /><path d="M16.25 16.25l2.15 2.15" /><path d="M12 18l0 3" /><path d="M7.75 16.25l-2.15 2.15" /><path d="M6 12l-3 0" /><path d="M7.75 7.75l-2.15 -2.15" /></svg> Loading...';
      fetch(markdownPath).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      }).then((markdown) => {
        return navigator.clipboard.writeText(markdown);
      }).then(() => {
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-1 me-1"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg> Copied!';
        setTimeout(() => {
          button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-1 me-1"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667l0 -8.666" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /></svg> Copy Markdown';
        }, 2e3);
      }).catch((err) => {
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-1 me-1"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg> Error';
        console.error("Failed to copy markdown:", err);
        setTimeout(() => {
          button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-1 me-1"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667l0 -8.666" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /></svg> Copy Markdown';
        }, 2e3);
      });
    });
  }

  // ns-hugo-imp:C:\WorkSpace\AAAAAAA\ALL\learning-dashboard\node_modules\@thulite\doks-core\assets\js\basiclightbox.js
  var basicLightbox = __toESM(require_basicLightbox_min());
  var images = document.querySelectorAll(".lightbox img, img.lightbox");
  images.forEach((img) => {
    const html = img.outerHTML;
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        instance.close();
      }
    };
    const instance = basicLightbox.create(html, {
      onShow: () => {
        document.addEventListener("keydown", handleEscapeKey);
      },
      onClose: () => {
        document.removeEventListener("keydown", handleEscapeKey);
      }
    });
    img.onclick = () => {
      instance.show();
    };
  });

  // ns-hugo-imp:C:\WorkSpace\AAAAAAA\ALL\learning-dashboard\assets\js\custom.js
  var STORAGE_KEY = "learning-dashboard-v1";
  var SEED_DONE = ["ch01-0", "ch01-1", "ch01-2", "ch01-3", "ch01-4"];
  function defaultState() {
    const done = {};
    for (const key of SEED_DONE) done[key] = true;
    return { done, savedAt: null };
  }
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      return {
        done: parsed.done && typeof parsed.done === "object" ? parsed.done : {},
        savedAt: parsed.savedAt || null
      };
    } catch (e2) {
      return defaultState();
    }
  }
  function saveState(state2) {
    state2.savedAt = (/* @__PURE__ */ new Date()).toISOString();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state2));
    } catch (e2) {
    }
  }
  var state = loadState();
  function applyChecked() {
    document.querySelectorAll(".dash-checklist input[type=checkbox]").forEach((cb) => {
      cb.checked = Boolean(state.done[cb.dataset.taskKey]);
    });
  }
  function refresh() {
    let overallDone = 0;
    let overallTotal = 0;
    document.querySelectorAll(".dash-checklist").forEach((list) => {
      const boxes = list.querySelectorAll("input[type=checkbox]");
      const total = boxes.length;
      let done = 0;
      boxes.forEach((b) => {
        if (b.checked) done++;
      });
      overallDone += done;
      overallTotal += total;
      const card = list.closest(".dash-card");
      const scope = card || list.parentElement;
      const fill = scope && scope.querySelector(".dash-progress-fill");
      if (fill) fill.style.width = `${total ? done / total * 100 : 0}%`;
      if (card) {
        const badge = card.querySelector(".dash-card-badge");
        if (badge) badge.textContent = `${done}/${total}`;
        card.classList.toggle("dash-complete", done === total);
      }
    });
    const pct = overallTotal ? Math.round(overallDone / overallTotal * 100) : 0;
    const overallFill = document.getElementById("dashOverallFill");
    if (overallFill) {
      overallFill.style.width = `${pct}%`;
      overallFill.classList.toggle("dash-done", pct === 100);
      const text = document.getElementById("dashOverallText");
      const pctEl = document.getElementById("dashOverallPct");
      if (text) text.textContent = `\u5DF2\u5B8C\u6210 ${overallDone} / ${overallTotal} \u4E2A\u4EFB\u52A1`;
      if (pctEl) pctEl.textContent = `${pct}%`;
    }
    const updatedAt = document.getElementById("dashUpdatedAt");
    if (updatedAt) {
      updatedAt.textContent = state.savedAt ? `\u4E0A\u6B21\u4FDD\u5B58\uFF1A${new Date(state.savedAt).toLocaleString("zh-CN", { hour12: false })}` : "";
    }
  }
  function init() {
    applyChecked();
    document.addEventListener("change", (e2) => {
      const cb = e2.target;
      if (cb.type !== "checkbox" || !cb.dataset.taskKey) return;
      if (cb.checked) state.done[cb.dataset.taskKey] = true;
      else delete state.done[cb.dataset.taskKey];
      saveState(state);
      refresh();
    });
    document.addEventListener("click", (e2) => {
      const head = e2.target.closest(".dash-card-head");
      if (!head) return;
      const card = head.closest(".dash-card");
      if (!card) return;
      const open = card.classList.toggle("open");
      head.setAttribute("aria-expanded", String(open));
    });
    const resetBtn = document.getElementById("dashReset");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (!window.confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u5168\u90E8\u8FDB\u5EA6\u5417\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002")) return;
        localStorage.removeItem(STORAGE_KEY);
        window.location.reload();
      });
    }
    const firstOpen = document.querySelector(".dash-card:not(.dash-complete)");
    if (firstOpen) {
      firstOpen.classList.add("open");
      const head = firstOpen.querySelector(".dash-card-head");
      if (head) head.setAttribute("aria-expanded", "true");
    }
    refresh();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
/*! Bundled license information:

clipboard/dist/clipboard.js:
  (*!
   * clipboard.js v2.0.11
   * https://clipboardjs.com/
   *
   * Licensed MIT © Zeno Rocha
   *)

@thulite/doks-core/assets/js/clipboard.js:
  (*!
   * clipboard.js for Bootstrap based Thulite sites
   * Copyright 2021-2024 Thulite
   * Licensed under the MIT License
   *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL2xhenlzaXplcy9sYXp5c2l6ZXMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2xhenlzaXplcy9wbHVnaW5zL25hdGl2ZS1sb2FkaW5nL2xzLm5hdGl2ZS1sb2FkaW5nLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jbGlwYm9hcmQvZGlzdC9jbGlwYm9hcmQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2Jhc2ljbGlnaHRib3gvZGlzdC9iYXNpY0xpZ2h0Ym94Lm1pbi5qcyIsICIuLi9ub2RlX21vZHVsZXMvcXVpY2tsaW5rL2Rpc3QvcXVpY2tsaW5rLm1qcyIsICIuLi9ub2RlX21vZHVsZXMvQHRodWxpdGUvY29yZS9hc3NldHMvanMvY29yZS5qcyIsICJucy1odWdvLWltcDpDOlxcV29ya1NwYWNlXFxBQUFBQUFBXFxBTExcXGxlYXJuaW5nLWRhc2hib2FyZFxcbm9kZV9tb2R1bGVzXFxAdGh1bGl0ZVxcZG9rcy1jb3JlXFxhc3NldHNcXGpzXFxjbGlwYm9hcmQuanMiLCAibnMtaHVnby1pbXA6QzpcXFdvcmtTcGFjZVxcQUFBQUFBQVxcQUxMXFxsZWFybmluZy1kYXNoYm9hcmRcXG5vZGVfbW9kdWxlc1xcQHRodWxpdGVcXGRva3MtY29yZVxcYXNzZXRzXFxqc1xcdG8tdG9wLmpzIiwgIm5zLWh1Z28taW1wOkM6XFxXb3JrU3BhY2VcXEFBQUFBQUFcXEFMTFxcbGVhcm5pbmctZGFzaGJvYXJkXFxub2RlX21vZHVsZXNcXEB0aHVsaXRlXFxkb2tzLWNvcmVcXGFzc2V0c1xcanNcXHRhYnMuanMiLCAibnMtaHVnby1pbXA6QzpcXFdvcmtTcGFjZVxcQUFBQUFBQVxcQUxMXFxsZWFybmluZy1kYXNoYm9hcmRcXG5vZGVfbW9kdWxlc1xcQHRodWxpdGVcXGRva3MtY29yZVxcYXNzZXRzXFxqc1xcdG9jLmpzIiwgIm5zLWh1Z28taW1wOkM6XFxXb3JrU3BhY2VcXEFBQUFBQUFcXEFMTFxcbGVhcm5pbmctZGFzaGJvYXJkXFxub2RlX21vZHVsZXNcXEB0aHVsaXRlXFxkb2tzLWNvcmVcXGFzc2V0c1xcanNcXGNvcHktbWFya2Rvd24uanMiLCAibnMtaHVnby1pbXA6QzpcXFdvcmtTcGFjZVxcQUFBQUFBQVxcQUxMXFxsZWFybmluZy1kYXNoYm9hcmRcXG5vZGVfbW9kdWxlc1xcQHRodWxpdGVcXGRva3MtY29yZVxcYXNzZXRzXFxqc1xcYmFzaWNsaWdodGJveC5qcyIsICJucy1odWdvLWltcDpDOlxcV29ya1NwYWNlXFxBQUFBQUFBXFxBTExcXGxlYXJuaW5nLWRhc2hib2FyZFxcYXNzZXRzXFxqc1xcY3VzdG9tLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIoZnVuY3Rpb24od2luZG93LCBmYWN0b3J5KSB7XG5cdHZhciBsYXp5U2l6ZXMgPSBmYWN0b3J5KHdpbmRvdywgd2luZG93LmRvY3VtZW50LCBEYXRlKTtcblx0d2luZG93LmxhenlTaXplcyA9IGxhenlTaXplcztcblx0aWYodHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyl7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBsYXp5U2l6ZXM7XG5cdH1cbn0odHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyA/XG4gICAgICB3aW5kb3cgOiB7fSwgXG4vKipcbiAqIGltcG9ydChcIi4vdHlwZXMvZ2xvYmFsXCIpXG4gKiBAdHlwZWRlZiB7IGltcG9ydChcIi4vdHlwZXMvbGF6eXNpemVzLWNvbmZpZ1wiKS5MYXp5U2l6ZXNDb25maWdQYXJ0aWFsIH0gTGF6eVNpemVzQ29uZmlnUGFydGlhbFxuICovXG5mdW5jdGlvbiBsKHdpbmRvdywgZG9jdW1lbnQsIERhdGUpIHsgLy8gUGFzcyBpbiB0aGUgd2luZG93IERhdGUgZnVuY3Rpb24gYWxzbyBmb3IgU1NSIGJlY2F1c2UgdGhlIERhdGUgY2xhc3MgY2FuIGJlIGxvc3Rcblx0J3VzZSBzdHJpY3QnO1xuXHQvKmpzaGludCBlcW51bGw6dHJ1ZSAqL1xuXG5cdHZhciBsYXp5c2l6ZXMsXG5cdFx0LyoqXG5cdFx0ICogQHR5cGUgeyBMYXp5U2l6ZXNDb25maWdQYXJ0aWFsIH1cblx0XHQgKi9cblx0XHRsYXp5U2l6ZXNDZmc7XG5cblx0KGZ1bmN0aW9uKCl7XG5cdFx0dmFyIHByb3A7XG5cblx0XHR2YXIgbGF6eVNpemVzRGVmYXVsdHMgPSB7XG5cdFx0XHRsYXp5Q2xhc3M6ICdsYXp5bG9hZCcsXG5cdFx0XHRsb2FkZWRDbGFzczogJ2xhenlsb2FkZWQnLFxuXHRcdFx0bG9hZGluZ0NsYXNzOiAnbGF6eWxvYWRpbmcnLFxuXHRcdFx0cHJlbG9hZENsYXNzOiAnbGF6eXByZWxvYWQnLFxuXHRcdFx0ZXJyb3JDbGFzczogJ2xhenllcnJvcicsXG5cdFx0XHQvL3N0cmljdENsYXNzOiAnbGF6eXN0cmljdCcsXG5cdFx0XHRhdXRvc2l6ZXNDbGFzczogJ2xhenlhdXRvc2l6ZXMnLFxuXHRcdFx0ZmFzdExvYWRlZENsYXNzOiAnbHMtaXMtY2FjaGVkJyxcblx0XHRcdGlmcmFtZUxvYWRNb2RlOiAwLFxuXHRcdFx0c3JjQXR0cjogJ2RhdGEtc3JjJyxcblx0XHRcdHNyY3NldEF0dHI6ICdkYXRhLXNyY3NldCcsXG5cdFx0XHRzaXplc0F0dHI6ICdkYXRhLXNpemVzJyxcblx0XHRcdC8vcHJlbG9hZEFmdGVyTG9hZDogZmFsc2UsXG5cdFx0XHRtaW5TaXplOiA0MCxcblx0XHRcdGN1c3RvbU1lZGlhOiB7fSxcblx0XHRcdGluaXQ6IHRydWUsXG5cdFx0XHRleHBGYWN0b3I6IDEuNSxcblx0XHRcdGhGYWM6IDAuOCxcblx0XHRcdGxvYWRNb2RlOiAyLFxuXHRcdFx0bG9hZEhpZGRlbjogdHJ1ZSxcblx0XHRcdHJpY1RpbWVvdXQ6IDAsXG5cdFx0XHR0aHJvdHRsZURlbGF5OiAxMjUsXG5cdFx0fTtcblxuXHRcdGxhenlTaXplc0NmZyA9IHdpbmRvdy5sYXp5U2l6ZXNDb25maWcgfHwgd2luZG93LmxhenlzaXplc0NvbmZpZyB8fCB7fTtcblxuXHRcdGZvcihwcm9wIGluIGxhenlTaXplc0RlZmF1bHRzKXtcblx0XHRcdGlmKCEocHJvcCBpbiBsYXp5U2l6ZXNDZmcpKXtcblx0XHRcdFx0bGF6eVNpemVzQ2ZnW3Byb3BdID0gbGF6eVNpemVzRGVmYXVsdHNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9KSgpO1xuXG5cdGlmICghZG9jdW1lbnQgfHwgIWRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aW5pdDogZnVuY3Rpb24gKCkge30sXG5cdFx0XHQvKipcblx0XHRcdCAqIEB0eXBlIHsgTGF6eVNpemVzQ29uZmlnUGFydGlhbCB9XG5cdFx0XHQgKi9cblx0XHRcdGNmZzogbGF6eVNpemVzQ2ZnLFxuXHRcdFx0LyoqXG5cdFx0XHQgKiBAdHlwZSB7IHRydWUgfVxuXHRcdFx0ICovXG5cdFx0XHRub1N1cHBvcnQ6IHRydWUsXG5cdFx0fTtcblx0fVxuXG5cdHZhciBkb2NFbGVtID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cdHZhciBzdXBwb3J0UGljdHVyZSA9IHdpbmRvdy5IVE1MUGljdHVyZUVsZW1lbnQ7XG5cblx0dmFyIF9hZGRFdmVudExpc3RlbmVyID0gJ2FkZEV2ZW50TGlzdGVuZXInO1xuXG5cdHZhciBfZ2V0QXR0cmlidXRlID0gJ2dldEF0dHJpYnV0ZSc7XG5cblx0LyoqXG5cdCAqIFVwZGF0ZSB0byBiaW5kIHRvIHdpbmRvdyBiZWNhdXNlICd0aGlzJyBiZWNvbWVzIG51bGwgZHVyaW5nIFNTUlxuXHQgKiBidWlsZHMuXG5cdCAqL1xuXHR2YXIgYWRkRXZlbnRMaXN0ZW5lciA9IHdpbmRvd1tfYWRkRXZlbnRMaXN0ZW5lcl0uYmluZCh3aW5kb3cpO1xuXG5cdHZhciBzZXRUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQ7XG5cblx0dmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgc2V0VGltZW91dDtcblxuXHR2YXIgcmVxdWVzdElkbGVDYWxsYmFjayA9IHdpbmRvdy5yZXF1ZXN0SWRsZUNhbGxiYWNrO1xuXG5cdHZhciByZWdQaWN0dXJlID0gL15waWN0dXJlJC9pO1xuXG5cdHZhciBsb2FkRXZlbnRzID0gWydsb2FkJywgJ2Vycm9yJywgJ2xhenlpbmNsdWRlZCcsICdfbGF6eWxvYWRlZCddO1xuXG5cdHZhciByZWdDbGFzc0NhY2hlID0ge307XG5cblx0dmFyIGZvckVhY2ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaDtcblxuXHQvKipcblx0ICogQHBhcmFtIGVsZSB7RWxlbWVudH1cblx0ICogQHBhcmFtIGNscyB7c3RyaW5nfVxuXHQgKi9cblx0dmFyIGhhc0NsYXNzID0gZnVuY3Rpb24oZWxlLCBjbHMpIHtcblx0XHRpZighcmVnQ2xhc3NDYWNoZVtjbHNdKXtcblx0XHRcdHJlZ0NsYXNzQ2FjaGVbY2xzXSA9IG5ldyBSZWdFeHAoJyhcXFxcc3xeKScrY2xzKycoXFxcXHN8JCknKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlZ0NsYXNzQ2FjaGVbY2xzXS50ZXN0KGVsZVtfZ2V0QXR0cmlidXRlXSgnY2xhc3MnKSB8fCAnJykgJiYgcmVnQ2xhc3NDYWNoZVtjbHNdO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0gZWxlIHtFbGVtZW50fVxuXHQgKiBAcGFyYW0gY2xzIHtzdHJpbmd9XG5cdCAqL1xuXHR2YXIgYWRkQ2xhc3MgPSBmdW5jdGlvbihlbGUsIGNscykge1xuXHRcdGlmICghaGFzQ2xhc3MoZWxlLCBjbHMpKXtcblx0XHRcdGVsZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgKGVsZVtfZ2V0QXR0cmlidXRlXSgnY2xhc3MnKSB8fCAnJykudHJpbSgpICsgJyAnICsgY2xzKTtcblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIEBwYXJhbSBlbGUge0VsZW1lbnR9XG5cdCAqIEBwYXJhbSBjbHMge3N0cmluZ31cblx0ICovXG5cdHZhciByZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKGVsZSwgY2xzKSB7XG5cdFx0dmFyIHJlZztcblx0XHRpZiAoKHJlZyA9IGhhc0NsYXNzKGVsZSxjbHMpKSkge1xuXHRcdFx0ZWxlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAoZWxlW19nZXRBdHRyaWJ1dGVdKCdjbGFzcycpIHx8ICcnKS5yZXBsYWNlKHJlZywgJyAnKSk7XG5cdFx0fVxuXHR9O1xuXG5cdHZhciBhZGRSZW1vdmVMb2FkRXZlbnRzID0gZnVuY3Rpb24oZG9tLCBmbiwgYWRkKXtcblx0XHR2YXIgYWN0aW9uID0gYWRkID8gX2FkZEV2ZW50TGlzdGVuZXIgOiAncmVtb3ZlRXZlbnRMaXN0ZW5lcic7XG5cdFx0aWYoYWRkKXtcblx0XHRcdGFkZFJlbW92ZUxvYWRFdmVudHMoZG9tLCBmbik7XG5cdFx0fVxuXHRcdGxvYWRFdmVudHMuZm9yRWFjaChmdW5jdGlvbihldnQpe1xuXHRcdFx0ZG9tW2FjdGlvbl0oZXZ0LCBmbik7XG5cdFx0fSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIEBwYXJhbSBlbGVtIHsgRWxlbWVudCB9XG5cdCAqIEBwYXJhbSBuYW1lIHsgc3RyaW5nIH1cblx0ICogQHBhcmFtIGRldGFpbCB7IGFueSB9XG5cdCAqIEBwYXJhbSBub0J1YmJsZXMgeyBib29sZWFuIH1cblx0ICogQHBhcmFtIG5vQ2FuY2VsYWJsZSB7IGJvb2xlYW4gfVxuXHQgKiBAcmV0dXJucyB7IEN1c3RvbUV2ZW50IH1cblx0ICovXG5cdHZhciB0cmlnZ2VyRXZlbnQgPSBmdW5jdGlvbihlbGVtLCBuYW1lLCBkZXRhaWwsIG5vQnViYmxlcywgbm9DYW5jZWxhYmxlKXtcblx0XHR2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcblxuXHRcdGlmKCFkZXRhaWwpe1xuXHRcdFx0ZGV0YWlsID0ge307XG5cdFx0fVxuXG5cdFx0ZGV0YWlsLmluc3RhbmNlID0gbGF6eXNpemVzO1xuXG5cdFx0ZXZlbnQuaW5pdEV2ZW50KG5hbWUsICFub0J1YmJsZXMsICFub0NhbmNlbGFibGUpO1xuXG5cdFx0ZXZlbnQuZGV0YWlsID0gZGV0YWlsO1xuXG5cdFx0ZWxlbS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblx0XHRyZXR1cm4gZXZlbnQ7XG5cdH07XG5cblx0dmFyIHVwZGF0ZVBvbHlmaWxsID0gZnVuY3Rpb24gKGVsLCBmdWxsKXtcblx0XHR2YXIgcG9seWZpbGw7XG5cdFx0aWYoICFzdXBwb3J0UGljdHVyZSAmJiAoIHBvbHlmaWxsID0gKHdpbmRvdy5waWN0dXJlZmlsbCB8fCBsYXp5U2l6ZXNDZmcucGYpICkgKXtcblx0XHRcdGlmKGZ1bGwgJiYgZnVsbC5zcmMgJiYgIWVsW19nZXRBdHRyaWJ1dGVdKCdzcmNzZXQnKSl7XG5cdFx0XHRcdGVsLnNldEF0dHJpYnV0ZSgnc3Jjc2V0JywgZnVsbC5zcmMpO1xuXHRcdFx0fVxuXHRcdFx0cG9seWZpbGwoe3JlZXZhbHVhdGU6IHRydWUsIGVsZW1lbnRzOiBbZWxdfSk7XG5cdFx0fSBlbHNlIGlmKGZ1bGwgJiYgZnVsbC5zcmMpe1xuXHRcdFx0ZWwuc3JjID0gZnVsbC5zcmM7XG5cdFx0fVxuXHR9O1xuXG5cdHZhciBnZXRDU1MgPSBmdW5jdGlvbiAoZWxlbSwgc3R5bGUpe1xuXHRcdHJldHVybiAoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtLCBudWxsKSB8fCB7fSlbc3R5bGVdO1xuXHR9O1xuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gZWxlbSB7IEVsZW1lbnQgfVxuXHQgKiBAcGFyYW0gcGFyZW50IHsgRWxlbWVudCB9XG5cdCAqIEBwYXJhbSBbd2lkdGhdIHtudW1iZXJ9XG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XG5cdCAqL1xuXHR2YXIgZ2V0V2lkdGggPSBmdW5jdGlvbihlbGVtLCBwYXJlbnQsIHdpZHRoKXtcblx0XHR3aWR0aCA9IHdpZHRoIHx8IGVsZW0ub2Zmc2V0V2lkdGg7XG5cblx0XHR3aGlsZSh3aWR0aCA8IGxhenlTaXplc0NmZy5taW5TaXplICYmIHBhcmVudCAmJiAhZWxlbS5fbGF6eXNpemVzV2lkdGgpe1xuXHRcdFx0d2lkdGggPSAgcGFyZW50Lm9mZnNldFdpZHRoO1xuXHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHdpZHRoO1xuXHR9O1xuXG5cdHZhciByQUYgPSAoZnVuY3Rpb24oKXtcblx0XHR2YXIgcnVubmluZywgd2FpdGluZztcblx0XHR2YXIgZmlyc3RGbnMgPSBbXTtcblx0XHR2YXIgc2Vjb25kRm5zID0gW107XG5cdFx0dmFyIGZucyA9IGZpcnN0Rm5zO1xuXG5cdFx0dmFyIHJ1biA9IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgcnVuRm5zID0gZm5zO1xuXG5cdFx0XHRmbnMgPSBmaXJzdEZucy5sZW5ndGggPyBzZWNvbmRGbnMgOiBmaXJzdEZucztcblxuXHRcdFx0cnVubmluZyA9IHRydWU7XG5cdFx0XHR3YWl0aW5nID0gZmFsc2U7XG5cblx0XHRcdHdoaWxlKHJ1bkZucy5sZW5ndGgpe1xuXHRcdFx0XHRydW5GbnMuc2hpZnQoKSgpO1xuXHRcdFx0fVxuXG5cdFx0XHRydW5uaW5nID0gZmFsc2U7XG5cdFx0fTtcblxuXHRcdHZhciByYWZCYXRjaCA9IGZ1bmN0aW9uKGZuLCBxdWV1ZSl7XG5cdFx0XHRpZihydW5uaW5nICYmICFxdWV1ZSl7XG5cdFx0XHRcdGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmbnMucHVzaChmbik7XG5cblx0XHRcdFx0aWYoIXdhaXRpbmcpe1xuXHRcdFx0XHRcdHdhaXRpbmcgPSB0cnVlO1xuXHRcdFx0XHRcdChkb2N1bWVudC5oaWRkZW4gPyBzZXRUaW1lb3V0IDogcmVxdWVzdEFuaW1hdGlvbkZyYW1lKShydW4pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJhZkJhdGNoLl9sc0ZsdXNoID0gcnVuO1xuXG5cdFx0cmV0dXJuIHJhZkJhdGNoO1xuXHR9KSgpO1xuXG5cdHZhciByQUZJdCA9IGZ1bmN0aW9uKGZuLCBzaW1wbGUpe1xuXHRcdHJldHVybiBzaW1wbGUgP1xuXHRcdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJBRihmbik7XG5cdFx0XHR9IDpcblx0XHRcdGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHZhciB0aGF0ID0gdGhpcztcblx0XHRcdFx0dmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cdFx0XHRcdHJBRihmdW5jdGlvbigpe1xuXHRcdFx0XHRcdGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHQ7XG5cdH07XG5cblx0dmFyIHRocm90dGxlID0gZnVuY3Rpb24oZm4pe1xuXHRcdHZhciBydW5uaW5nO1xuXHRcdHZhciBsYXN0VGltZSA9IDA7XG5cdFx0dmFyIGdEZWxheSA9IGxhenlTaXplc0NmZy50aHJvdHRsZURlbGF5O1xuXHRcdHZhciBySUNUaW1lb3V0ID0gbGF6eVNpemVzQ2ZnLnJpY1RpbWVvdXQ7XG5cdFx0dmFyIHJ1biA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRydW5uaW5nID0gZmFsc2U7XG5cdFx0XHRsYXN0VGltZSA9IERhdGUubm93KCk7XG5cdFx0XHRmbigpO1xuXHRcdH07XG5cdFx0dmFyIGlkbGVDYWxsYmFjayA9IHJlcXVlc3RJZGxlQ2FsbGJhY2sgJiYgcklDVGltZW91dCA+IDQ5ID9cblx0XHRcdGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHJlcXVlc3RJZGxlQ2FsbGJhY2socnVuLCB7dGltZW91dDogcklDVGltZW91dH0pO1xuXG5cdFx0XHRcdGlmKHJJQ1RpbWVvdXQgIT09IGxhenlTaXplc0NmZy5yaWNUaW1lb3V0KXtcblx0XHRcdFx0XHRySUNUaW1lb3V0ID0gbGF6eVNpemVzQ2ZnLnJpY1RpbWVvdXQ7XG5cdFx0XHRcdH1cblx0XHRcdH0gOlxuXHRcdFx0ckFGSXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0c2V0VGltZW91dChydW4pO1xuXHRcdFx0fSwgdHJ1ZSlcblx0XHQ7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24oaXNQcmlvcml0eSl7XG5cdFx0XHR2YXIgZGVsYXk7XG5cblx0XHRcdGlmKChpc1ByaW9yaXR5ID0gaXNQcmlvcml0eSA9PT0gdHJ1ZSkpe1xuXHRcdFx0XHRySUNUaW1lb3V0ID0gMzM7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHJ1bm5pbmcpe1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHJ1bm5pbmcgPSAgdHJ1ZTtcblxuXHRcdFx0ZGVsYXkgPSBnRGVsYXkgLSAoRGF0ZS5ub3coKSAtIGxhc3RUaW1lKTtcblxuXHRcdFx0aWYoZGVsYXkgPCAwKXtcblx0XHRcdFx0ZGVsYXkgPSAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihpc1ByaW9yaXR5IHx8IGRlbGF5IDwgOSl7XG5cdFx0XHRcdGlkbGVDYWxsYmFjaygpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2V0VGltZW91dChpZGxlQ2FsbGJhY2ssIGRlbGF5KTtcblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXG5cdC8vYmFzZWQgb24gaHR0cDovL21vZGVybmphdmFzY3JpcHQuYmxvZ3Nwb3QuZGUvMjAxMy8wOC9idWlsZGluZy1iZXR0ZXItZGVib3VuY2UuaHRtbFxuXHR2YXIgZGVib3VuY2UgPSBmdW5jdGlvbihmdW5jKSB7XG5cdFx0dmFyIHRpbWVvdXQsIHRpbWVzdGFtcDtcblx0XHR2YXIgd2FpdCA9IDk5O1xuXHRcdHZhciBydW4gPSBmdW5jdGlvbigpe1xuXHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRmdW5jKCk7XG5cdFx0fTtcblx0XHR2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBsYXN0ID0gRGF0ZS5ub3coKSAtIHRpbWVzdGFtcDtcblxuXHRcdFx0aWYgKGxhc3QgPCB3YWl0KSB7XG5cdFx0XHRcdHNldFRpbWVvdXQobGF0ZXIsIHdhaXQgLSBsYXN0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdChyZXF1ZXN0SWRsZUNhbGxiYWNrIHx8IHJ1bikocnVuKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdFx0dGltZXN0YW1wID0gRGF0ZS5ub3coKTtcblxuXHRcdFx0aWYgKCF0aW1lb3V0KSB7XG5cdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXG5cdHZhciBsb2FkZXIgPSAoZnVuY3Rpb24oKXtcblx0XHR2YXIgcHJlbG9hZEVsZW1zLCBpc0NvbXBsZXRlZCwgcmVzZXRQcmVsb2FkaW5nVGltZXIsIGxvYWRNb2RlLCBzdGFydGVkO1xuXG5cdFx0dmFyIGVMdlcsIGVsdkgsIGVMdG9wLCBlTGxlZnQsIGVMcmlnaHQsIGVMYm90dG9tLCBpc0JvZHlIaWRkZW47XG5cblx0XHR2YXIgcmVnSW1nID0gL15pbWckL2k7XG5cdFx0dmFyIHJlZ0lmcmFtZSA9IC9eaWZyYW1lJC9pO1xuXG5cdFx0dmFyIHN1cHBvcnRTY3JvbGwgPSAoJ29uc2Nyb2xsJyBpbiB3aW5kb3cpICYmICEoLyhnbGV8aW5nKWJvdC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSk7XG5cblx0XHR2YXIgc2hyaW5rRXhwYW5kID0gMDtcblx0XHR2YXIgY3VycmVudEV4cGFuZCA9IDA7XG5cblx0XHR2YXIgaXNMb2FkaW5nID0gMDtcblx0XHR2YXIgbG93UnVucyA9IC0xO1xuXG5cdFx0dmFyIHJlc2V0UHJlbG9hZGluZyA9IGZ1bmN0aW9uKGUpe1xuXHRcdFx0aXNMb2FkaW5nLS07XG5cdFx0XHRpZighZSB8fCBpc0xvYWRpbmcgPCAwIHx8ICFlLnRhcmdldCl7XG5cdFx0XHRcdGlzTG9hZGluZyA9IDA7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciBpc1Zpc2libGUgPSBmdW5jdGlvbiAoZWxlbSkge1xuXHRcdFx0aWYgKGlzQm9keUhpZGRlbiA9PSBudWxsKSB7XG5cdFx0XHRcdGlzQm9keUhpZGRlbiA9IGdldENTUyhkb2N1bWVudC5ib2R5LCAndmlzaWJpbGl0eScpID09ICdoaWRkZW4nO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gaXNCb2R5SGlkZGVuIHx8ICEoZ2V0Q1NTKGVsZW0ucGFyZW50Tm9kZSwgJ3Zpc2liaWxpdHknKSA9PSAnaGlkZGVuJyAmJiBnZXRDU1MoZWxlbSwgJ3Zpc2liaWxpdHknKSA9PSAnaGlkZGVuJyk7XG5cdFx0fTtcblxuXHRcdHZhciBpc05lc3RlZFZpc2libGUgPSBmdW5jdGlvbihlbGVtLCBlbGVtRXhwYW5kKXtcblx0XHRcdHZhciBvdXRlclJlY3Q7XG5cdFx0XHR2YXIgcGFyZW50ID0gZWxlbTtcblx0XHRcdHZhciB2aXNpYmxlID0gaXNWaXNpYmxlKGVsZW0pO1xuXG5cdFx0XHRlTHRvcCAtPSBlbGVtRXhwYW5kO1xuXHRcdFx0ZUxib3R0b20gKz0gZWxlbUV4cGFuZDtcblx0XHRcdGVMbGVmdCAtPSBlbGVtRXhwYW5kO1xuXHRcdFx0ZUxyaWdodCArPSBlbGVtRXhwYW5kO1xuXG5cdFx0XHR3aGlsZSh2aXNpYmxlICYmIChwYXJlbnQgPSBwYXJlbnQub2Zmc2V0UGFyZW50KSAmJiBwYXJlbnQgIT0gZG9jdW1lbnQuYm9keSAmJiBwYXJlbnQgIT0gZG9jRWxlbSl7XG5cdFx0XHRcdHZpc2libGUgPSAoKGdldENTUyhwYXJlbnQsICdvcGFjaXR5JykgfHwgMSkgPiAwKTtcblxuXHRcdFx0XHRpZih2aXNpYmxlICYmIGdldENTUyhwYXJlbnQsICdvdmVyZmxvdycpICE9ICd2aXNpYmxlJyl7XG5cdFx0XHRcdFx0b3V0ZXJSZWN0ID0gcGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0XHRcdHZpc2libGUgPSBlTHJpZ2h0ID4gb3V0ZXJSZWN0LmxlZnQgJiZcblx0XHRcdFx0XHRcdGVMbGVmdCA8IG91dGVyUmVjdC5yaWdodCAmJlxuXHRcdFx0XHRcdFx0ZUxib3R0b20gPiBvdXRlclJlY3QudG9wIC0gMSAmJlxuXHRcdFx0XHRcdFx0ZUx0b3AgPCBvdXRlclJlY3QuYm90dG9tICsgMVxuXHRcdFx0XHRcdDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdmlzaWJsZTtcblx0XHR9O1xuXG5cdFx0dmFyIGNoZWNrRWxlbWVudHMgPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBlTGxlbiwgaSwgcmVjdCwgYXV0b0xvYWRFbGVtLCBsb2FkZWRTb21ldGhpbmcsIGVsZW1FeHBhbmQsIGVsZW1OZWdhdGl2ZUV4cGFuZCwgZWxlbUV4cGFuZFZhbCxcblx0XHRcdFx0YmVmb3JlRXhwYW5kVmFsLCBkZWZhdWx0RXhwYW5kLCBwcmVsb2FkRXhwYW5kLCBoRmFjO1xuXHRcdFx0dmFyIGxhenlsb2FkRWxlbXMgPSBsYXp5c2l6ZXMuZWxlbWVudHM7XG5cblx0XHRcdGlmKChsb2FkTW9kZSA9IGxhenlTaXplc0NmZy5sb2FkTW9kZSkgJiYgaXNMb2FkaW5nIDwgOCAmJiAoZUxsZW4gPSBsYXp5bG9hZEVsZW1zLmxlbmd0aCkpe1xuXG5cdFx0XHRcdGkgPSAwO1xuXG5cdFx0XHRcdGxvd1J1bnMrKztcblxuXHRcdFx0XHRmb3IoOyBpIDwgZUxsZW47IGkrKyl7XG5cblx0XHRcdFx0XHRpZighbGF6eWxvYWRFbGVtc1tpXSB8fCBsYXp5bG9hZEVsZW1zW2ldLl9sYXp5UmFjZSl7Y29udGludWU7fVxuXG5cdFx0XHRcdFx0aWYoIXN1cHBvcnRTY3JvbGwgfHwgKGxhenlzaXplcy5wcmVtYXR1cmVVbnZlaWwgJiYgbGF6eXNpemVzLnByZW1hdHVyZVVudmVpbChsYXp5bG9hZEVsZW1zW2ldKSkpe3VudmVpbEVsZW1lbnQobGF6eWxvYWRFbGVtc1tpXSk7Y29udGludWU7fVxuXG5cdFx0XHRcdFx0aWYoIShlbGVtRXhwYW5kVmFsID0gbGF6eWxvYWRFbGVtc1tpXVtfZ2V0QXR0cmlidXRlXSgnZGF0YS1leHBhbmQnKSkgfHwgIShlbGVtRXhwYW5kID0gZWxlbUV4cGFuZFZhbCAqIDEpKXtcblx0XHRcdFx0XHRcdGVsZW1FeHBhbmQgPSBjdXJyZW50RXhwYW5kO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICghZGVmYXVsdEV4cGFuZCkge1xuXHRcdFx0XHRcdFx0ZGVmYXVsdEV4cGFuZCA9ICghbGF6eVNpemVzQ2ZnLmV4cGFuZCB8fCBsYXp5U2l6ZXNDZmcuZXhwYW5kIDwgMSkgP1xuXHRcdFx0XHRcdFx0XHRkb2NFbGVtLmNsaWVudEhlaWdodCA+IDUwMCAmJiBkb2NFbGVtLmNsaWVudFdpZHRoID4gNTAwID8gNTAwIDogMzcwIDpcblx0XHRcdFx0XHRcdFx0bGF6eVNpemVzQ2ZnLmV4cGFuZDtcblxuXHRcdFx0XHRcdFx0bGF6eXNpemVzLl9kZWZFeCA9IGRlZmF1bHRFeHBhbmQ7XG5cblx0XHRcdFx0XHRcdHByZWxvYWRFeHBhbmQgPSBkZWZhdWx0RXhwYW5kICogbGF6eVNpemVzQ2ZnLmV4cEZhY3Rvcjtcblx0XHRcdFx0XHRcdGhGYWMgPSBsYXp5U2l6ZXNDZmcuaEZhYztcblx0XHRcdFx0XHRcdGlzQm9keUhpZGRlbiA9IG51bGw7XG5cblx0XHRcdFx0XHRcdGlmKGN1cnJlbnRFeHBhbmQgPCBwcmVsb2FkRXhwYW5kICYmIGlzTG9hZGluZyA8IDEgJiYgbG93UnVucyA+IDIgJiYgbG9hZE1vZGUgPiAyICYmICFkb2N1bWVudC5oaWRkZW4pe1xuXHRcdFx0XHRcdFx0XHRjdXJyZW50RXhwYW5kID0gcHJlbG9hZEV4cGFuZDtcblx0XHRcdFx0XHRcdFx0bG93UnVucyA9IDA7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYobG9hZE1vZGUgPiAxICYmIGxvd1J1bnMgPiAxICYmIGlzTG9hZGluZyA8IDYpe1xuXHRcdFx0XHRcdFx0XHRjdXJyZW50RXhwYW5kID0gZGVmYXVsdEV4cGFuZDtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRFeHBhbmQgPSBzaHJpbmtFeHBhbmQ7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYoYmVmb3JlRXhwYW5kVmFsICE9PSBlbGVtRXhwYW5kKXtcblx0XHRcdFx0XHRcdGVMdlcgPSBpbm5lcldpZHRoICsgKGVsZW1FeHBhbmQgKiBoRmFjKTtcblx0XHRcdFx0XHRcdGVsdkggPSBpbm5lckhlaWdodCArIGVsZW1FeHBhbmQ7XG5cdFx0XHRcdFx0XHRlbGVtTmVnYXRpdmVFeHBhbmQgPSBlbGVtRXhwYW5kICogLTE7XG5cdFx0XHRcdFx0XHRiZWZvcmVFeHBhbmRWYWwgPSBlbGVtRXhwYW5kO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlY3QgPSBsYXp5bG9hZEVsZW1zW2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdFx0XHRcdFx0aWYgKChlTGJvdHRvbSA9IHJlY3QuYm90dG9tKSA+PSBlbGVtTmVnYXRpdmVFeHBhbmQgJiZcblx0XHRcdFx0XHRcdChlTHRvcCA9IHJlY3QudG9wKSA8PSBlbHZIICYmXG5cdFx0XHRcdFx0XHQoZUxyaWdodCA9IHJlY3QucmlnaHQpID49IGVsZW1OZWdhdGl2ZUV4cGFuZCAqIGhGYWMgJiZcblx0XHRcdFx0XHRcdChlTGxlZnQgPSByZWN0LmxlZnQpIDw9IGVMdlcgJiZcblx0XHRcdFx0XHRcdChlTGJvdHRvbSB8fCBlTHJpZ2h0IHx8IGVMbGVmdCB8fCBlTHRvcCkgJiZcblx0XHRcdFx0XHRcdChsYXp5U2l6ZXNDZmcubG9hZEhpZGRlbiB8fCBpc1Zpc2libGUobGF6eWxvYWRFbGVtc1tpXSkpICYmXG5cdFx0XHRcdFx0XHQoKGlzQ29tcGxldGVkICYmIGlzTG9hZGluZyA8IDMgJiYgIWVsZW1FeHBhbmRWYWwgJiYgKGxvYWRNb2RlIDwgMyB8fCBsb3dSdW5zIDwgNCkpIHx8IGlzTmVzdGVkVmlzaWJsZShsYXp5bG9hZEVsZW1zW2ldLCBlbGVtRXhwYW5kKSkpe1xuXHRcdFx0XHRcdFx0dW52ZWlsRWxlbWVudChsYXp5bG9hZEVsZW1zW2ldKTtcblx0XHRcdFx0XHRcdGxvYWRlZFNvbWV0aGluZyA9IHRydWU7XG5cdFx0XHRcdFx0XHRpZihpc0xvYWRpbmcgPiA5KXticmVhazt9XG5cdFx0XHRcdFx0fSBlbHNlIGlmKCFsb2FkZWRTb21ldGhpbmcgJiYgaXNDb21wbGV0ZWQgJiYgIWF1dG9Mb2FkRWxlbSAmJlxuXHRcdFx0XHRcdFx0aXNMb2FkaW5nIDwgNCAmJiBsb3dSdW5zIDwgNCAmJiBsb2FkTW9kZSA+IDIgJiZcblx0XHRcdFx0XHRcdChwcmVsb2FkRWxlbXNbMF0gfHwgbGF6eVNpemVzQ2ZnLnByZWxvYWRBZnRlckxvYWQpICYmXG5cdFx0XHRcdFx0XHQocHJlbG9hZEVsZW1zWzBdIHx8ICghZWxlbUV4cGFuZFZhbCAmJiAoKGVMYm90dG9tIHx8IGVMcmlnaHQgfHwgZUxsZWZ0IHx8IGVMdG9wKSB8fCBsYXp5bG9hZEVsZW1zW2ldW19nZXRBdHRyaWJ1dGVdKGxhenlTaXplc0NmZy5zaXplc0F0dHIpICE9ICdhdXRvJykpKSl7XG5cdFx0XHRcdFx0XHRhdXRvTG9hZEVsZW0gPSBwcmVsb2FkRWxlbXNbMF0gfHwgbGF6eWxvYWRFbGVtc1tpXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihhdXRvTG9hZEVsZW0gJiYgIWxvYWRlZFNvbWV0aGluZyl7XG5cdFx0XHRcdFx0dW52ZWlsRWxlbWVudChhdXRvTG9hZEVsZW0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciB0aHJvdHRsZWRDaGVja0VsZW1lbnRzID0gdGhyb3R0bGUoY2hlY2tFbGVtZW50cyk7XG5cblx0XHR2YXIgc3dpdGNoTG9hZGluZ0NsYXNzID0gZnVuY3Rpb24oZSl7XG5cdFx0XHR2YXIgZWxlbSA9IGUudGFyZ2V0O1xuXG5cdFx0XHRpZiAoZWxlbS5fbGF6eUNhY2hlKSB7XG5cdFx0XHRcdGRlbGV0ZSBlbGVtLl9sYXp5Q2FjaGU7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0cmVzZXRQcmVsb2FkaW5nKGUpO1xuXHRcdFx0YWRkQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmxvYWRlZENsYXNzKTtcblx0XHRcdHJlbW92ZUNsYXNzKGVsZW0sIGxhenlTaXplc0NmZy5sb2FkaW5nQ2xhc3MpO1xuXHRcdFx0YWRkUmVtb3ZlTG9hZEV2ZW50cyhlbGVtLCByYWZTd2l0Y2hMb2FkaW5nQ2xhc3MpO1xuXHRcdFx0dHJpZ2dlckV2ZW50KGVsZW0sICdsYXp5bG9hZGVkJyk7XG5cdFx0fTtcblx0XHR2YXIgcmFmZWRTd2l0Y2hMb2FkaW5nQ2xhc3MgPSByQUZJdChzd2l0Y2hMb2FkaW5nQ2xhc3MpO1xuXHRcdHZhciByYWZTd2l0Y2hMb2FkaW5nQ2xhc3MgPSBmdW5jdGlvbihlKXtcblx0XHRcdHJhZmVkU3dpdGNoTG9hZGluZ0NsYXNzKHt0YXJnZXQ6IGUudGFyZ2V0fSk7XG5cdFx0fTtcblxuXHRcdHZhciBjaGFuZ2VJZnJhbWVTcmMgPSBmdW5jdGlvbihlbGVtLCBzcmMpe1xuXHRcdFx0dmFyIGxvYWRNb2RlID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtbG9hZC1tb2RlJykgfHwgbGF6eVNpemVzQ2ZnLmlmcmFtZUxvYWRNb2RlO1xuXG5cdFx0XHQvLyBsb2FkTW9kZSBjYW4gYmUgYWxzbyBhIHN0cmluZyFcblx0XHRcdGlmIChsb2FkTW9kZSA9PSAwKSB7XG5cdFx0XHRcdGVsZW0uY29udGVudFdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHNyYyk7XG5cdFx0XHR9IGVsc2UgaWYgKGxvYWRNb2RlID09IDEpIHtcblx0XHRcdFx0ZWxlbS5zcmMgPSBzcmM7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciBoYW5kbGVTb3VyY2VzID0gZnVuY3Rpb24oc291cmNlKXtcblx0XHRcdHZhciBjdXN0b21NZWRpYTtcblxuXHRcdFx0dmFyIHNvdXJjZVNyY3NldCA9IHNvdXJjZVtfZ2V0QXR0cmlidXRlXShsYXp5U2l6ZXNDZmcuc3Jjc2V0QXR0cik7XG5cblx0XHRcdGlmKCAoY3VzdG9tTWVkaWEgPSBsYXp5U2l6ZXNDZmcuY3VzdG9tTWVkaWFbc291cmNlW19nZXRBdHRyaWJ1dGVdKCdkYXRhLW1lZGlhJykgfHwgc291cmNlW19nZXRBdHRyaWJ1dGVdKCdtZWRpYScpXSkgKXtcblx0XHRcdFx0c291cmNlLnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBjdXN0b21NZWRpYSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHNvdXJjZVNyY3NldCl7XG5cdFx0XHRcdHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyY3NldCcsIHNvdXJjZVNyY3NldCk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciBsYXp5VW52ZWlsID0gckFGSXQoZnVuY3Rpb24gKGVsZW0sIGRldGFpbCwgaXNBdXRvLCBzaXplcywgaXNJbWcpe1xuXHRcdFx0dmFyIHNyYywgc3Jjc2V0LCBwYXJlbnQsIGlzUGljdHVyZSwgZXZlbnQsIGZpcmVzTG9hZDtcblxuXHRcdFx0aWYoIShldmVudCA9IHRyaWdnZXJFdmVudChlbGVtLCAnbGF6eWJlZm9yZXVudmVpbCcsIGRldGFpbCkpLmRlZmF1bHRQcmV2ZW50ZWQpe1xuXG5cdFx0XHRcdGlmKHNpemVzKXtcblx0XHRcdFx0XHRpZihpc0F1dG8pe1xuXHRcdFx0XHRcdFx0YWRkQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmF1dG9zaXplc0NsYXNzKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoJ3NpemVzJywgc2l6ZXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHNyY3NldCA9IGVsZW1bX2dldEF0dHJpYnV0ZV0obGF6eVNpemVzQ2ZnLnNyY3NldEF0dHIpO1xuXHRcdFx0XHRzcmMgPSBlbGVtW19nZXRBdHRyaWJ1dGVdKGxhenlTaXplc0NmZy5zcmNBdHRyKTtcblxuXHRcdFx0XHRpZihpc0ltZykge1xuXHRcdFx0XHRcdHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZTtcblx0XHRcdFx0XHRpc1BpY3R1cmUgPSBwYXJlbnQgJiYgcmVnUGljdHVyZS50ZXN0KHBhcmVudC5ub2RlTmFtZSB8fCAnJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmaXJlc0xvYWQgPSBkZXRhaWwuZmlyZXNMb2FkIHx8ICgoJ3NyYycgaW4gZWxlbSkgJiYgKHNyY3NldCB8fCBzcmMgfHwgaXNQaWN0dXJlKSk7XG5cblx0XHRcdFx0ZXZlbnQgPSB7dGFyZ2V0OiBlbGVtfTtcblxuXHRcdFx0XHRhZGRDbGFzcyhlbGVtLCBsYXp5U2l6ZXNDZmcubG9hZGluZ0NsYXNzKTtcblxuXHRcdFx0XHRpZihmaXJlc0xvYWQpe1xuXHRcdFx0XHRcdGNsZWFyVGltZW91dChyZXNldFByZWxvYWRpbmdUaW1lcik7XG5cdFx0XHRcdFx0cmVzZXRQcmVsb2FkaW5nVGltZXIgPSBzZXRUaW1lb3V0KHJlc2V0UHJlbG9hZGluZywgMjUwMCk7XG5cdFx0XHRcdFx0YWRkUmVtb3ZlTG9hZEV2ZW50cyhlbGVtLCByYWZTd2l0Y2hMb2FkaW5nQ2xhc3MsIHRydWUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoaXNQaWN0dXJlKXtcblx0XHRcdFx0XHRmb3JFYWNoLmNhbGwocGFyZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzb3VyY2UnKSwgaGFuZGxlU291cmNlcyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihzcmNzZXQpe1xuXHRcdFx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCdzcmNzZXQnLCBzcmNzZXQpO1xuXHRcdFx0XHR9IGVsc2UgaWYoc3JjICYmICFpc1BpY3R1cmUpe1xuXHRcdFx0XHRcdGlmKHJlZ0lmcmFtZS50ZXN0KGVsZW0ubm9kZU5hbWUpKXtcblx0XHRcdFx0XHRcdGNoYW5nZUlmcmFtZVNyYyhlbGVtLCBzcmMpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRlbGVtLnNyYyA9IHNyYztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihpc0ltZyAmJiAoc3Jjc2V0IHx8IGlzUGljdHVyZSkpe1xuXHRcdFx0XHRcdHVwZGF0ZVBvbHlmaWxsKGVsZW0sIHtzcmM6IHNyY30pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmKGVsZW0uX2xhenlSYWNlKXtcblx0XHRcdFx0ZGVsZXRlIGVsZW0uX2xhenlSYWNlO1xuXHRcdFx0fVxuXHRcdFx0cmVtb3ZlQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmxhenlDbGFzcyk7XG5cblx0XHRcdHJBRihmdW5jdGlvbigpe1xuXHRcdFx0XHQvLyBQYXJ0IG9mIHRoaXMgY2FuIGJlIHJlbW92ZWQgYXMgc29vbiBhcyB0aGlzIGZpeCBpcyBvbGRlcjogaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NzczMSAoMjAxNSlcblx0XHRcdFx0dmFyIGlzTG9hZGVkID0gZWxlbS5jb21wbGV0ZSAmJiBlbGVtLm5hdHVyYWxXaWR0aCA+IDE7XG5cblx0XHRcdFx0aWYoICFmaXJlc0xvYWQgfHwgaXNMb2FkZWQpe1xuXHRcdFx0XHRcdGlmIChpc0xvYWRlZCkge1xuXHRcdFx0XHRcdFx0YWRkQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmZhc3RMb2FkZWRDbGFzcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHN3aXRjaExvYWRpbmdDbGFzcyhldmVudCk7XG5cdFx0XHRcdFx0ZWxlbS5fbGF6eUNhY2hlID0gdHJ1ZTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRpZiAoJ19sYXp5Q2FjaGUnIGluIGVsZW0pIHtcblx0XHRcdFx0XHRcdFx0ZGVsZXRlIGVsZW0uX2xhenlDYWNoZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LCA5KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoZWxlbS5sb2FkaW5nID09ICdsYXp5Jykge1xuXHRcdFx0XHRcdGlzTG9hZGluZy0tO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCB0cnVlKTtcblx0XHR9KTtcblxuXHRcdC8qKlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIGVsZW0geyBFbGVtZW50IH1cblx0XHQgKi9cblx0XHR2YXIgdW52ZWlsRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtKXtcblx0XHRcdGlmIChlbGVtLl9sYXp5UmFjZSkge3JldHVybjt9XG5cdFx0XHR2YXIgZGV0YWlsO1xuXG5cdFx0XHR2YXIgaXNJbWcgPSByZWdJbWcudGVzdChlbGVtLm5vZGVOYW1lKTtcblxuXHRcdFx0Ly9hbGxvdyB1c2luZyBzaXplcz1cImF1dG9cIiwgYnV0IGRvbid0IHVzZS4gaXQncyBpbnZhbGlkLiBVc2UgZGF0YS1zaXplcz1cImF1dG9cIiBvciBhIHZhbGlkIHZhbHVlIGZvciBzaXplcyBpbnN0ZWFkIChpLmUuOiBzaXplcz1cIjgwdndcIilcblx0XHRcdHZhciBzaXplcyA9IGlzSW1nICYmIChlbGVtW19nZXRBdHRyaWJ1dGVdKGxhenlTaXplc0NmZy5zaXplc0F0dHIpIHx8IGVsZW1bX2dldEF0dHJpYnV0ZV0oJ3NpemVzJykpO1xuXHRcdFx0dmFyIGlzQXV0byA9IHNpemVzID09ICdhdXRvJztcblxuXHRcdFx0aWYoIChpc0F1dG8gfHwgIWlzQ29tcGxldGVkKSAmJiBpc0ltZyAmJiAoZWxlbVtfZ2V0QXR0cmlidXRlXSgnc3JjJykgfHwgZWxlbS5zcmNzZXQpICYmICFlbGVtLmNvbXBsZXRlICYmICFoYXNDbGFzcyhlbGVtLCBsYXp5U2l6ZXNDZmcuZXJyb3JDbGFzcykgJiYgaGFzQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmxhenlDbGFzcykpe3JldHVybjt9XG5cblx0XHRcdGRldGFpbCA9IHRyaWdnZXJFdmVudChlbGVtLCAnbGF6eXVudmVpbHJlYWQnKS5kZXRhaWw7XG5cblx0XHRcdGlmKGlzQXV0byl7XG5cdFx0XHRcdCBhdXRvU2l6ZXIudXBkYXRlRWxlbShlbGVtLCB0cnVlLCBlbGVtLm9mZnNldFdpZHRoKTtcblx0XHRcdH1cblxuXHRcdFx0ZWxlbS5fbGF6eVJhY2UgPSB0cnVlO1xuXHRcdFx0aXNMb2FkaW5nKys7XG5cblx0XHRcdGxhenlVbnZlaWwoZWxlbSwgZGV0YWlsLCBpc0F1dG8sIHNpemVzLCBpc0ltZyk7XG5cdFx0fTtcblxuXHRcdHZhciBhZnRlclNjcm9sbCA9IGRlYm91bmNlKGZ1bmN0aW9uKCl7XG5cdFx0XHRsYXp5U2l6ZXNDZmcubG9hZE1vZGUgPSAzO1xuXHRcdFx0dGhyb3R0bGVkQ2hlY2tFbGVtZW50cygpO1xuXHRcdH0pO1xuXG5cdFx0dmFyIGFsdExvYWRtb2RlU2Nyb2xsTGlzdG5lciA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRpZihsYXp5U2l6ZXNDZmcubG9hZE1vZGUgPT0gMyl7XG5cdFx0XHRcdGxhenlTaXplc0NmZy5sb2FkTW9kZSA9IDI7XG5cdFx0XHR9XG5cdFx0XHRhZnRlclNjcm9sbCgpO1xuXHRcdH07XG5cblx0XHR2YXIgb25sb2FkID0gZnVuY3Rpb24oKXtcblx0XHRcdGlmKGlzQ29tcGxldGVkKXtyZXR1cm47fVxuXHRcdFx0aWYoRGF0ZS5ub3coKSAtIHN0YXJ0ZWQgPCA5OTkpe1xuXHRcdFx0XHRzZXRUaW1lb3V0KG9ubG9hZCwgOTk5KTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cblx0XHRcdGlzQ29tcGxldGVkID0gdHJ1ZTtcblxuXHRcdFx0bGF6eVNpemVzQ2ZnLmxvYWRNb2RlID0gMztcblxuXHRcdFx0dGhyb3R0bGVkQ2hlY2tFbGVtZW50cygpO1xuXG5cdFx0XHRhZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBhbHRMb2FkbW9kZVNjcm9sbExpc3RuZXIsIHRydWUpO1xuXHRcdH07XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0XzogZnVuY3Rpb24oKXtcblx0XHRcdFx0c3RhcnRlZCA9IERhdGUubm93KCk7XG5cblx0XHRcdFx0bGF6eXNpemVzLmVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShsYXp5U2l6ZXNDZmcubGF6eUNsYXNzKTtcblx0XHRcdFx0cHJlbG9hZEVsZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShsYXp5U2l6ZXNDZmcubGF6eUNsYXNzICsgJyAnICsgbGF6eVNpemVzQ2ZnLnByZWxvYWRDbGFzcyk7XG5cblx0XHRcdFx0YWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cywgdHJ1ZSk7XG5cblx0XHRcdFx0YWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cywgdHJ1ZSk7XG5cblx0XHRcdFx0YWRkRXZlbnRMaXN0ZW5lcigncGFnZXNob3cnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdGlmIChlLnBlcnNpc3RlZCkge1xuXHRcdFx0XHRcdFx0dmFyIGxvYWRpbmdFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgbGF6eVNpemVzQ2ZnLmxvYWRpbmdDbGFzcyk7XG5cblx0XHRcdFx0XHRcdGlmIChsb2FkaW5nRWxlbWVudHMubGVuZ3RoICYmIGxvYWRpbmdFbGVtZW50cy5mb3JFYWNoKSB7XG5cdFx0XHRcdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdFx0bG9hZGluZ0VsZW1lbnRzLmZvckVhY2goIGZ1bmN0aW9uIChpbWcpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChpbWcuY29tcGxldGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dW52ZWlsRWxlbWVudChpbWcpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGlmKHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyKXtcblx0XHRcdFx0XHRuZXcgTXV0YXRpb25PYnNlcnZlciggdGhyb3R0bGVkQ2hlY2tFbGVtZW50cyApLm9ic2VydmUoIGRvY0VsZW0sIHtjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUsIGF0dHJpYnV0ZXM6IHRydWV9ICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZG9jRWxlbVtfYWRkRXZlbnRMaXN0ZW5lcl0oJ0RPTU5vZGVJbnNlcnRlZCcsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXHRcdFx0XHRcdGRvY0VsZW1bX2FkZEV2ZW50TGlzdGVuZXJdKCdET01BdHRyTW9kaWZpZWQnLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblx0XHRcdFx0XHRzZXRJbnRlcnZhbCh0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCA5OTkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXG5cdFx0XHRcdC8vLCAnZnVsbHNjcmVlbmNoYW5nZSdcblx0XHRcdFx0Wydmb2N1cycsICdtb3VzZW92ZXInLCAnY2xpY2snLCAnbG9hZCcsICd0cmFuc2l0aW9uZW5kJywgJ2FuaW1hdGlvbmVuZCddLmZvckVhY2goZnVuY3Rpb24obmFtZSl7XG5cdFx0XHRcdFx0ZG9jdW1lbnRbX2FkZEV2ZW50TGlzdGVuZXJdKG5hbWUsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZigoL2QkfF5jLy50ZXN0KGRvY3VtZW50LnJlYWR5U3RhdGUpKSl7XG5cdFx0XHRcdFx0b25sb2FkKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIG9ubG9hZCk7XG5cdFx0XHRcdFx0ZG9jdW1lbnRbX2FkZEV2ZW50TGlzdGVuZXJdKCdET01Db250ZW50TG9hZGVkJywgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cyk7XG5cdFx0XHRcdFx0c2V0VGltZW91dChvbmxvYWQsIDIwMDAwKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKGxhenlzaXplcy5lbGVtZW50cy5sZW5ndGgpe1xuXHRcdFx0XHRcdGNoZWNrRWxlbWVudHMoKTtcblx0XHRcdFx0XHRyQUYuX2xzRmx1c2goKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aHJvdHRsZWRDaGVja0VsZW1lbnRzKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRjaGVja0VsZW1zOiB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLFxuXHRcdFx0dW52ZWlsOiB1bnZlaWxFbGVtZW50LFxuXHRcdFx0X2FMU0w6IGFsdExvYWRtb2RlU2Nyb2xsTGlzdG5lcixcblx0XHR9O1xuXHR9KSgpO1xuXG5cblx0dmFyIGF1dG9TaXplciA9IChmdW5jdGlvbigpe1xuXHRcdHZhciBhdXRvc2l6ZXNFbGVtcztcblxuXHRcdHZhciBzaXplRWxlbWVudCA9IHJBRkl0KGZ1bmN0aW9uKGVsZW0sIHBhcmVudCwgZXZlbnQsIHdpZHRoKXtcblx0XHRcdHZhciBzb3VyY2VzLCBpLCBsZW47XG5cdFx0XHRlbGVtLl9sYXp5c2l6ZXNXaWR0aCA9IHdpZHRoO1xuXHRcdFx0d2lkdGggKz0gJ3B4JztcblxuXHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoJ3NpemVzJywgd2lkdGgpO1xuXG5cdFx0XHRpZihyZWdQaWN0dXJlLnRlc3QocGFyZW50Lm5vZGVOYW1lIHx8ICcnKSl7XG5cdFx0XHRcdHNvdXJjZXMgPSBwYXJlbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NvdXJjZScpO1xuXHRcdFx0XHRmb3IoaSA9IDAsIGxlbiA9IHNvdXJjZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuXHRcdFx0XHRcdHNvdXJjZXNbaV0uc2V0QXR0cmlidXRlKCdzaXplcycsIHdpZHRoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZighZXZlbnQuZGV0YWlsLmRhdGFBdHRyKXtcblx0XHRcdFx0dXBkYXRlUG9seWZpbGwoZWxlbSwgZXZlbnQuZGV0YWlsKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHQvKipcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSBlbGVtIHtFbGVtZW50fVxuXHRcdCAqIEBwYXJhbSBkYXRhQXR0clxuXHRcdCAqIEBwYXJhbSBbd2lkdGhdIHsgbnVtYmVyIH1cblx0XHQgKi9cblx0XHR2YXIgZ2V0U2l6ZUVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbSwgZGF0YUF0dHIsIHdpZHRoKXtcblx0XHRcdHZhciBldmVudDtcblx0XHRcdHZhciBwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGU7XG5cblx0XHRcdGlmKHBhcmVudCl7XG5cdFx0XHRcdHdpZHRoID0gZ2V0V2lkdGgoZWxlbSwgcGFyZW50LCB3aWR0aCk7XG5cdFx0XHRcdGV2ZW50ID0gdHJpZ2dlckV2ZW50KGVsZW0sICdsYXp5YmVmb3Jlc2l6ZXMnLCB7d2lkdGg6IHdpZHRoLCBkYXRhQXR0cjogISFkYXRhQXR0cn0pO1xuXG5cdFx0XHRcdGlmKCFldmVudC5kZWZhdWx0UHJldmVudGVkKXtcblx0XHRcdFx0XHR3aWR0aCA9IGV2ZW50LmRldGFpbC53aWR0aDtcblxuXHRcdFx0XHRcdGlmKHdpZHRoICYmIHdpZHRoICE9PSBlbGVtLl9sYXp5c2l6ZXNXaWR0aCl7XG5cdFx0XHRcdFx0XHRzaXplRWxlbWVudChlbGVtLCBwYXJlbnQsIGV2ZW50LCB3aWR0aCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciB1cGRhdGVFbGVtZW50c1NpemVzID0gZnVuY3Rpb24oKXtcblx0XHRcdHZhciBpO1xuXHRcdFx0dmFyIGxlbiA9IGF1dG9zaXplc0VsZW1zLmxlbmd0aDtcblx0XHRcdGlmKGxlbil7XG5cdFx0XHRcdGkgPSAwO1xuXG5cdFx0XHRcdGZvcig7IGkgPCBsZW47IGkrKyl7XG5cdFx0XHRcdFx0Z2V0U2l6ZUVsZW1lbnQoYXV0b3NpemVzRWxlbXNbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciBkZWJvdW5jZWRVcGRhdGVFbGVtZW50c1NpemVzID0gZGVib3VuY2UodXBkYXRlRWxlbWVudHNTaXplcyk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0XzogZnVuY3Rpb24oKXtcblx0XHRcdFx0YXV0b3NpemVzRWxlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGxhenlTaXplc0NmZy5hdXRvc2l6ZXNDbGFzcyk7XG5cdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGRlYm91bmNlZFVwZGF0ZUVsZW1lbnRzU2l6ZXMpO1xuXHRcdFx0fSxcblx0XHRcdGNoZWNrRWxlbXM6IGRlYm91bmNlZFVwZGF0ZUVsZW1lbnRzU2l6ZXMsXG5cdFx0XHR1cGRhdGVFbGVtOiBnZXRTaXplRWxlbWVudFxuXHRcdH07XG5cdH0pKCk7XG5cblx0dmFyIGluaXQgPSBmdW5jdGlvbigpe1xuXHRcdGlmKCFpbml0LmkgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSl7XG5cdFx0XHRpbml0LmkgPSB0cnVlO1xuXHRcdFx0YXV0b1NpemVyLl8oKTtcblx0XHRcdGxvYWRlci5fKCk7XG5cdFx0fVxuXHR9O1xuXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRpZihsYXp5U2l6ZXNDZmcuaW5pdCl7XG5cdFx0XHRpbml0KCk7XG5cdFx0fVxuXHR9KTtcblxuXHRsYXp5c2l6ZXMgPSB7XG5cdFx0LyoqXG5cdFx0ICogQHR5cGUgeyBMYXp5U2l6ZXNDb25maWdQYXJ0aWFsIH1cblx0XHQgKi9cblx0XHRjZmc6IGxhenlTaXplc0NmZyxcblx0XHRhdXRvU2l6ZXI6IGF1dG9TaXplcixcblx0XHRsb2FkZXI6IGxvYWRlcixcblx0XHRpbml0OiBpbml0LFxuXHRcdHVQOiB1cGRhdGVQb2x5ZmlsbCxcblx0XHRhQzogYWRkQ2xhc3MsXG5cdFx0ckM6IHJlbW92ZUNsYXNzLFxuXHRcdGhDOiBoYXNDbGFzcyxcblx0XHRmaXJlOiB0cmlnZ2VyRXZlbnQsXG5cdFx0Z1c6IGdldFdpZHRoLFxuXHRcdHJBRjogckFGLFxuXHR9O1xuXG5cdHJldHVybiBsYXp5c2l6ZXM7XG59XG4pKTtcbiIsICIoZnVuY3Rpb24od2luZG93LCBmYWN0b3J5KSB7XG5cdHZhciBnbG9iYWxJbnN0YWxsID0gZnVuY3Rpb24oKXtcblx0XHRmYWN0b3J5KHdpbmRvdy5sYXp5U2l6ZXMpO1xuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdsYXp5dW52ZWlscmVhZCcsIGdsb2JhbEluc3RhbGwsIHRydWUpO1xuXHR9O1xuXG5cdGZhY3RvcnkgPSBmYWN0b3J5LmJpbmQobnVsbCwgd2luZG93LCB3aW5kb3cuZG9jdW1lbnQpO1xuXG5cdGlmKHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpe1xuXHRcdGZhY3RvcnkocmVxdWlyZSgnbGF6eXNpemVzJykpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKFsnbGF6eXNpemVzJ10sIGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYod2luZG93LmxhenlTaXplcykge1xuXHRcdGdsb2JhbEluc3RhbGwoKTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbGF6eXVudmVpbHJlYWQnLCBnbG9iYWxJbnN0YWxsLCB0cnVlKTtcblx0fVxufSh3aW5kb3csIGZ1bmN0aW9uKHdpbmRvdywgZG9jdW1lbnQsIGxhenlTaXplcykge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGltZ1N1cHBvcnQgPSAnbG9hZGluZycgaW4gSFRNTEltYWdlRWxlbWVudC5wcm90b3R5cGU7XG5cdHZhciBpZnJhbWVTdXBwb3J0ID0gJ2xvYWRpbmcnIGluIEhUTUxJRnJhbWVFbGVtZW50LnByb3RvdHlwZTtcblx0dmFyIGlzQ29uZmlnU2V0ID0gZmFsc2U7XG5cdHZhciBvbGRQcmVtYXR1cmVVbnZlaWwgPSBsYXp5U2l6ZXMucHJlbWF0dXJlVW52ZWlsO1xuXHR2YXIgY2ZnID0gbGF6eVNpemVzLmNmZztcblx0dmFyIGxpc3RlbmVyTWFwID0ge1xuXHRcdGZvY3VzOiAxLFxuXHRcdG1vdXNlb3ZlcjogMSxcblx0XHRjbGljazogMSxcblx0XHRsb2FkOiAxLFxuXHRcdHRyYW5zaXRpb25lbmQ6IDEsXG5cdFx0YW5pbWF0aW9uZW5kOiAxLFxuXHRcdHNjcm9sbDogMSxcblx0XHRyZXNpemU6IDEsXG5cdH07XG5cblx0aWYgKCFjZmcubmF0aXZlTG9hZGluZykge1xuXHRcdGNmZy5uYXRpdmVMb2FkaW5nID0ge307XG5cdH1cblxuXHRpZiAoIXdpbmRvdy5hZGRFdmVudExpc3RlbmVyIHx8ICF3aW5kb3cuTXV0YXRpb25PYnNlcnZlciB8fCAoIWltZ1N1cHBvcnQgJiYgIWlmcmFtZVN1cHBvcnQpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0ZnVuY3Rpb24gZGlzYWJsZUV2ZW50cygpIHtcblx0XHR2YXIgbG9hZGVyID0gbGF6eVNpemVzLmxvYWRlcjtcblx0XHR2YXIgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cyA9IGxvYWRlci5jaGVja0VsZW1zO1xuXHRcdHZhciByZW1vdmVBTFNMID0gZnVuY3Rpb24oKXtcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGxvYWRlci5fYUxTTCwgdHJ1ZSk7XG5cdFx0XHR9LCAxMDAwKTtcblx0XHR9O1xuXHRcdHZhciBjdXJyZW50TGlzdGVuZXJNYXAgPSB0eXBlb2YgY2ZnLm5hdGl2ZUxvYWRpbmcuZGlzYWJsZUxpc3RlbmVycyA9PSAnb2JqZWN0JyA/XG5cdFx0XHRjZmcubmF0aXZlTG9hZGluZy5kaXNhYmxlTGlzdGVuZXJzIDpcblx0XHRcdGxpc3RlbmVyTWFwO1xuXG5cdFx0aWYgKGN1cnJlbnRMaXN0ZW5lck1hcC5zY3JvbGwpIHtcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgcmVtb3ZlQUxTTCk7XG5cdFx0XHRyZW1vdmVBTFNMKCk7XG5cblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblx0XHR9XG5cblx0XHRpZiAoY3VycmVudExpc3RlbmVyTWFwLnJlc2l6ZSkge1xuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXHRcdH1cblxuXHRcdE9iamVjdC5rZXlzKGN1cnJlbnRMaXN0ZW5lck1hcCkuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG5cdFx0XHRpZiAoY3VycmVudExpc3RlbmVyTWFwW25hbWVdKSB7XG5cdFx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cywgdHJ1ZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBydW5Db25maWcoKSB7XG5cdFx0aWYgKGlzQ29uZmlnU2V0KSB7cmV0dXJuO31cblx0XHRpc0NvbmZpZ1NldCA9IHRydWU7XG5cblx0XHRpZiAoaW1nU3VwcG9ydCAmJiBpZnJhbWVTdXBwb3J0ICYmIGNmZy5uYXRpdmVMb2FkaW5nLmRpc2FibGVMaXN0ZW5lcnMpIHtcblx0XHRcdGlmIChjZmcubmF0aXZlTG9hZGluZy5kaXNhYmxlTGlzdGVuZXJzID09PSB0cnVlKSB7XG5cdFx0XHRcdGNmZy5uYXRpdmVMb2FkaW5nLnNldExvYWRpbmdBdHRyaWJ1dGUgPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRkaXNhYmxlRXZlbnRzKCk7XG5cdFx0fVxuXG5cdFx0aWYgKGNmZy5uYXRpdmVMb2FkaW5nLnNldExvYWRpbmdBdHRyaWJ1dGUpIHtcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsYXp5YmVmb3JldW52ZWlsJywgZnVuY3Rpb24oZSl7XG5cdFx0XHRcdHZhciBlbGVtZW50ID0gZS50YXJnZXQ7XG5cblx0XHRcdFx0aWYgKCdsb2FkaW5nJyBpbiBlbGVtZW50ICYmICFlbGVtZW50LmdldEF0dHJpYnV0ZSgnbG9hZGluZycpKSB7XG5cdFx0XHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2xvYWRpbmcnLCAnbGF6eScpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCB0cnVlKTtcblx0XHR9XG5cdH1cblxuXHRsYXp5U2l6ZXMucHJlbWF0dXJlVW52ZWlsID0gZnVuY3Rpb24gcHJlbWF0dXJlVW52ZWlsKGVsZW1lbnQpIHtcblxuXHRcdGlmICghaXNDb25maWdTZXQpIHtcblx0XHRcdHJ1bkNvbmZpZygpO1xuXHRcdH1cblxuXHRcdGlmICgnbG9hZGluZycgaW4gZWxlbWVudCAmJlxuXHRcdFx0KGNmZy5uYXRpdmVMb2FkaW5nLnNldExvYWRpbmdBdHRyaWJ1dGUgfHwgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2xvYWRpbmcnKSkgJiZcblx0XHRcdChlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1zaXplcycpICE9ICdhdXRvJyB8fCBlbGVtZW50Lm9mZnNldFdpZHRoKSkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKG9sZFByZW1hdHVyZVVudmVpbCkge1xuXHRcdFx0cmV0dXJuIG9sZFByZW1hdHVyZVVudmVpbChlbGVtZW50KTtcblx0XHR9XG5cdH07XG5cbn0pKTtcbiIsICIvKiFcbiAqIGNsaXBib2FyZC5qcyB2Mi4wLjExXG4gKiBodHRwczovL2NsaXBib2FyZGpzLmNvbS9cbiAqXG4gKiBMaWNlbnNlZCBNSVQgXHUwMEE5IFplbm8gUm9jaGFcbiAqL1xuKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiQ2xpcGJvYXJkSlNcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiQ2xpcGJvYXJkSlNcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAvKioqKioqLyAoZnVuY3Rpb24oKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVzX18gPSAoe1xuXG4vKioqLyA2ODY6XG4vKioqLyAoZnVuY3Rpb24oX191bnVzZWRfd2VicGFja19tb2R1bGUsIF9fd2VicGFja19leHBvcnRzX18sIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIEVYUE9SVFNcbl9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4gIFwiZGVmYXVsdFwiOiBmdW5jdGlvbigpIHsgcmV0dXJuIC8qIGJpbmRpbmcgKi8gY2xpcGJvYXJkOyB9XG59KTtcblxuLy8gRVhURVJOQUwgTU9EVUxFOiAuL25vZGVfbW9kdWxlcy90aW55LWVtaXR0ZXIvaW5kZXguanNcbnZhciB0aW55X2VtaXR0ZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI3OSk7XG52YXIgdGlueV9lbWl0dGVyX2RlZmF1bHQgPSAvKiNfX1BVUkVfXyovX193ZWJwYWNrX3JlcXVpcmVfXy5uKHRpbnlfZW1pdHRlcik7XG4vLyBFWFRFUk5BTCBNT0RVTEU6IC4vbm9kZV9tb2R1bGVzL2dvb2QtbGlzdGVuZXIvc3JjL2xpc3Rlbi5qc1xudmFyIGxpc3RlbiA9IF9fd2VicGFja19yZXF1aXJlX18oMzcwKTtcbnZhciBsaXN0ZW5fZGVmYXVsdCA9IC8qI19fUFVSRV9fKi9fX3dlYnBhY2tfcmVxdWlyZV9fLm4obGlzdGVuKTtcbi8vIEVYVEVSTkFMIE1PRFVMRTogLi9ub2RlX21vZHVsZXMvc2VsZWN0L3NyYy9zZWxlY3QuanNcbnZhciBzcmNfc2VsZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4MTcpO1xudmFyIHNlbGVjdF9kZWZhdWx0ID0gLyojX19QVVJFX18qL19fd2VicGFja19yZXF1aXJlX18ubihzcmNfc2VsZWN0KTtcbjsvLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9jb21tb24vY29tbWFuZC5qc1xuLyoqXG4gKiBFeGVjdXRlcyBhIGdpdmVuIG9wZXJhdGlvbiB0eXBlLlxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGNvbW1hbmQodHlwZSkge1xuICB0cnkge1xuICAgIHJldHVybiBkb2N1bWVudC5leGVjQ29tbWFuZCh0eXBlKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG47Ly8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvYWN0aW9ucy9jdXQuanNcblxuXG4vKipcbiAqIEN1dCBhY3Rpb24gd3JhcHBlci5cbiAqIEBwYXJhbSB7U3RyaW5nfEhUTUxFbGVtZW50fSB0YXJnZXRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuXG52YXIgQ2xpcGJvYXJkQWN0aW9uQ3V0ID0gZnVuY3Rpb24gQ2xpcGJvYXJkQWN0aW9uQ3V0KHRhcmdldCkge1xuICB2YXIgc2VsZWN0ZWRUZXh0ID0gc2VsZWN0X2RlZmF1bHQoKSh0YXJnZXQpO1xuICBjb21tYW5kKCdjdXQnKTtcbiAgcmV0dXJuIHNlbGVjdGVkVGV4dDtcbn07XG5cbi8qIGhhcm1vbnkgZGVmYXVsdCBleHBvcnQgKi8gdmFyIGFjdGlvbnNfY3V0ID0gKENsaXBib2FyZEFjdGlvbkN1dCk7XG47Ly8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvY29tbW9uL2NyZWF0ZS1mYWtlLWVsZW1lbnQuanNcbi8qKlxuICogQ3JlYXRlcyBhIGZha2UgdGV4dGFyZWEgZWxlbWVudCB3aXRoIGEgdmFsdWUuXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5mdW5jdGlvbiBjcmVhdGVGYWtlRWxlbWVudCh2YWx1ZSkge1xuICB2YXIgaXNSVEwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkaXInKSA9PT0gJ3J0bCc7XG4gIHZhciBmYWtlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7IC8vIFByZXZlbnQgem9vbWluZyBvbiBpT1NcblxuICBmYWtlRWxlbWVudC5zdHlsZS5mb250U2l6ZSA9ICcxMnB0JzsgLy8gUmVzZXQgYm94IG1vZGVsXG5cbiAgZmFrZUVsZW1lbnQuc3R5bGUuYm9yZGVyID0gJzAnO1xuICBmYWtlRWxlbWVudC5zdHlsZS5wYWRkaW5nID0gJzAnO1xuICBmYWtlRWxlbWVudC5zdHlsZS5tYXJnaW4gPSAnMCc7IC8vIE1vdmUgZWxlbWVudCBvdXQgb2Ygc2NyZWVuIGhvcml6b250YWxseVxuXG4gIGZha2VFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgZmFrZUVsZW1lbnQuc3R5bGVbaXNSVEwgPyAncmlnaHQnIDogJ2xlZnQnXSA9ICctOTk5OXB4JzsgLy8gTW92ZSBlbGVtZW50IHRvIHRoZSBzYW1lIHBvc2l0aW9uIHZlcnRpY2FsbHlcblxuICB2YXIgeVBvc2l0aW9uID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gIGZha2VFbGVtZW50LnN0eWxlLnRvcCA9IFwiXCIuY29uY2F0KHlQb3NpdGlvbiwgXCJweFwiKTtcbiAgZmFrZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdyZWFkb25seScsICcnKTtcbiAgZmFrZUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgcmV0dXJuIGZha2VFbGVtZW50O1xufVxuOy8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL2FjdGlvbnMvY29weS5qc1xuXG5cblxuLyoqXG4gKiBDcmVhdGUgZmFrZSBjb3B5IGFjdGlvbiB3cmFwcGVyIHVzaW5nIGEgZmFrZSBlbGVtZW50LlxuICogQHBhcmFtIHtTdHJpbmd9IHRhcmdldFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuXG52YXIgZmFrZUNvcHlBY3Rpb24gPSBmdW5jdGlvbiBmYWtlQ29weUFjdGlvbih2YWx1ZSwgb3B0aW9ucykge1xuICB2YXIgZmFrZUVsZW1lbnQgPSBjcmVhdGVGYWtlRWxlbWVudCh2YWx1ZSk7XG4gIG9wdGlvbnMuY29udGFpbmVyLmFwcGVuZENoaWxkKGZha2VFbGVtZW50KTtcbiAgdmFyIHNlbGVjdGVkVGV4dCA9IHNlbGVjdF9kZWZhdWx0KCkoZmFrZUVsZW1lbnQpO1xuICBjb21tYW5kKCdjb3B5Jyk7XG4gIGZha2VFbGVtZW50LnJlbW92ZSgpO1xuICByZXR1cm4gc2VsZWN0ZWRUZXh0O1xufTtcbi8qKlxuICogQ29weSBhY3Rpb24gd3JhcHBlci5cbiAqIEBwYXJhbSB7U3RyaW5nfEhUTUxFbGVtZW50fSB0YXJnZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxuXG52YXIgQ2xpcGJvYXJkQWN0aW9uQ29weSA9IGZ1bmN0aW9uIENsaXBib2FyZEFjdGlvbkNvcHkodGFyZ2V0KSB7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7XG4gICAgY29udGFpbmVyOiBkb2N1bWVudC5ib2R5XG4gIH07XG4gIHZhciBzZWxlY3RlZFRleHQgPSAnJztcblxuICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycpIHtcbiAgICBzZWxlY3RlZFRleHQgPSBmYWtlQ29weUFjdGlvbih0YXJnZXQsIG9wdGlvbnMpO1xuICB9IGVsc2UgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiYgIVsndGV4dCcsICdzZWFyY2gnLCAndXJsJywgJ3RlbCcsICdwYXNzd29yZCddLmluY2x1ZGVzKHRhcmdldCA9PT0gbnVsbCB8fCB0YXJnZXQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRhcmdldC50eXBlKSkge1xuICAgIC8vIElmIGlucHV0IHR5cGUgZG9lc24ndCBzdXBwb3J0IGBzZXRTZWxlY3Rpb25SYW5nZWAuIFNpbXVsYXRlIGl0LiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSFRNTElucHV0RWxlbWVudC9zZXRTZWxlY3Rpb25SYW5nZVxuICAgIHNlbGVjdGVkVGV4dCA9IGZha2VDb3B5QWN0aW9uKHRhcmdldC52YWx1ZSwgb3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgc2VsZWN0ZWRUZXh0ID0gc2VsZWN0X2RlZmF1bHQoKSh0YXJnZXQpO1xuICAgIGNvbW1hbmQoJ2NvcHknKTtcbiAgfVxuXG4gIHJldHVybiBzZWxlY3RlZFRleHQ7XG59O1xuXG4vKiBoYXJtb255IGRlZmF1bHQgZXhwb3J0ICovIHZhciBhY3Rpb25zX2NvcHkgPSAoQ2xpcGJvYXJkQWN0aW9uQ29weSk7XG47Ly8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvYWN0aW9ucy9kZWZhdWx0LmpzXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cblxuXG4vKipcbiAqIElubmVyIGZ1bmN0aW9uIHdoaWNoIHBlcmZvcm1zIHNlbGVjdGlvbiBmcm9tIGVpdGhlciBgdGV4dGAgb3IgYHRhcmdldGBcbiAqIHByb3BlcnRpZXMgYW5kIHRoZW4gZXhlY3V0ZXMgY29weSBvciBjdXQgb3BlcmF0aW9ucy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKi9cblxudmFyIENsaXBib2FyZEFjdGlvbkRlZmF1bHQgPSBmdW5jdGlvbiBDbGlwYm9hcmRBY3Rpb25EZWZhdWx0KCkge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gIC8vIERlZmluZXMgYmFzZSBwcm9wZXJ0aWVzIHBhc3NlZCBmcm9tIGNvbnN0cnVjdG9yLlxuICB2YXIgX29wdGlvbnMkYWN0aW9uID0gb3B0aW9ucy5hY3Rpb24sXG4gICAgICBhY3Rpb24gPSBfb3B0aW9ucyRhY3Rpb24gPT09IHZvaWQgMCA/ICdjb3B5JyA6IF9vcHRpb25zJGFjdGlvbixcbiAgICAgIGNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyLFxuICAgICAgdGFyZ2V0ID0gb3B0aW9ucy50YXJnZXQsXG4gICAgICB0ZXh0ID0gb3B0aW9ucy50ZXh0OyAvLyBTZXRzIHRoZSBgYWN0aW9uYCB0byBiZSBwZXJmb3JtZWQgd2hpY2ggY2FuIGJlIGVpdGhlciAnY29weScgb3IgJ2N1dCcuXG5cbiAgaWYgKGFjdGlvbiAhPT0gJ2NvcHknICYmIGFjdGlvbiAhPT0gJ2N1dCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgXCJhY3Rpb25cIiB2YWx1ZSwgdXNlIGVpdGhlciBcImNvcHlcIiBvciBcImN1dFwiJyk7XG4gIH0gLy8gU2V0cyB0aGUgYHRhcmdldGAgcHJvcGVydHkgdXNpbmcgYW4gZWxlbWVudCB0aGF0IHdpbGwgYmUgaGF2ZSBpdHMgY29udGVudCBjb3BpZWQuXG5cblxuICBpZiAodGFyZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAodGFyZ2V0ICYmIF90eXBlb2YodGFyZ2V0KSA9PT0gJ29iamVjdCcgJiYgdGFyZ2V0Lm5vZGVUeXBlID09PSAxKSB7XG4gICAgICBpZiAoYWN0aW9uID09PSAnY29weScgJiYgdGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgXCJ0YXJnZXRcIiBhdHRyaWJ1dGUuIFBsZWFzZSB1c2UgXCJyZWFkb25seVwiIGluc3RlYWQgb2YgXCJkaXNhYmxlZFwiIGF0dHJpYnV0ZScpO1xuICAgICAgfVxuXG4gICAgICBpZiAoYWN0aW9uID09PSAnY3V0JyAmJiAodGFyZ2V0Lmhhc0F0dHJpYnV0ZSgncmVhZG9ubHknKSB8fCB0YXJnZXQuaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgXCJ0YXJnZXRcIiBhdHRyaWJ1dGUuIFlvdSBjYW5cXCd0IGN1dCB0ZXh0IGZyb20gZWxlbWVudHMgd2l0aCBcInJlYWRvbmx5XCIgb3IgXCJkaXNhYmxlZFwiIGF0dHJpYnV0ZXMnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFwidGFyZ2V0XCIgdmFsdWUsIHVzZSBhIHZhbGlkIEVsZW1lbnQnKTtcbiAgICB9XG4gIH0gLy8gRGVmaW5lIHNlbGVjdGlvbiBzdHJhdGVneSBiYXNlZCBvbiBgdGV4dGAgcHJvcGVydHkuXG5cblxuICBpZiAodGV4dCkge1xuICAgIHJldHVybiBhY3Rpb25zX2NvcHkodGV4dCwge1xuICAgICAgY29udGFpbmVyOiBjb250YWluZXJcbiAgICB9KTtcbiAgfSAvLyBEZWZpbmVzIHdoaWNoIHNlbGVjdGlvbiBzdHJhdGVneSBiYXNlZCBvbiBgdGFyZ2V0YCBwcm9wZXJ0eS5cblxuXG4gIGlmICh0YXJnZXQpIHtcbiAgICByZXR1cm4gYWN0aW9uID09PSAnY3V0JyA/IGFjdGlvbnNfY3V0KHRhcmdldCkgOiBhY3Rpb25zX2NvcHkodGFyZ2V0LCB7XG4gICAgICBjb250YWluZXI6IGNvbnRhaW5lclxuICAgIH0pO1xuICB9XG59O1xuXG4vKiBoYXJtb255IGRlZmF1bHQgZXhwb3J0ICovIHZhciBhY3Rpb25zX2RlZmF1bHQgPSAoQ2xpcGJvYXJkQWN0aW9uRGVmYXVsdCk7XG47Ly8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvY2xpcGJvYXJkLmpzXG5mdW5jdGlvbiBjbGlwYm9hcmRfdHlwZW9mKG9iaikgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBjbGlwYm9hcmRfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IGNsaXBib2FyZF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gY2xpcGJvYXJkX3R5cGVvZihvYmopOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7IH1cblxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cblxuZnVuY3Rpb24gX2NyZWF0ZVN1cGVyKERlcml2ZWQpIHsgdmFyIGhhc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QgPSBfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCk7IHJldHVybiBmdW5jdGlvbiBfY3JlYXRlU3VwZXJJbnRlcm5hbCgpIHsgdmFyIFN1cGVyID0gX2dldFByb3RvdHlwZU9mKERlcml2ZWQpLCByZXN1bHQ7IGlmIChoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KSB7IHZhciBOZXdUYXJnZXQgPSBfZ2V0UHJvdG90eXBlT2YodGhpcykuY29uc3RydWN0b3I7IHJlc3VsdCA9IFJlZmxlY3QuY29uc3RydWN0KFN1cGVyLCBhcmd1bWVudHMsIE5ld1RhcmdldCk7IH0gZWxzZSB7IHJlc3VsdCA9IFN1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH0gcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIHJlc3VsdCk7IH07IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoY2FsbCAmJiAoY2xpcGJvYXJkX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkgeyByZXR1cm4gY2FsbDsgfSByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTsgfVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpIHsgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiIHx8ICFSZWZsZWN0LmNvbnN0cnVjdCkgcmV0dXJuIGZhbHNlOyBpZiAoUmVmbGVjdC5jb25zdHJ1Y3Quc2hhbSkgcmV0dXJuIGZhbHNlOyBpZiAodHlwZW9mIFByb3h5ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0cnVlOyB0cnkgeyBEYXRlLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKFJlZmxlY3QuY29uc3RydWN0KERhdGUsIFtdLCBmdW5jdGlvbiAoKSB7fSkpOyByZXR1cm4gdHJ1ZTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gZmFsc2U7IH0gfVxuXG5mdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pOyB9OyByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pOyB9XG5cblxuXG5cblxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byByZXRyaWV2ZSBhdHRyaWJ1dGUgdmFsdWUuXG4gKiBAcGFyYW0ge1N0cmluZ30gc3VmZml4XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAqL1xuXG5mdW5jdGlvbiBnZXRBdHRyaWJ1dGVWYWx1ZShzdWZmaXgsIGVsZW1lbnQpIHtcbiAgdmFyIGF0dHJpYnV0ZSA9IFwiZGF0YS1jbGlwYm9hcmQtXCIuY29uY2F0KHN1ZmZpeCk7XG5cbiAgaWYgKCFlbGVtZW50Lmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGUpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSk7XG59XG4vKipcbiAqIEJhc2UgY2xhc3Mgd2hpY2ggdGFrZXMgb25lIG9yIG1vcmUgZWxlbWVudHMsIGFkZHMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZW0sXG4gKiBhbmQgaW5zdGFudGlhdGVzIGEgbmV3IGBDbGlwYm9hcmRBY3Rpb25gIG9uIGVhY2ggY2xpY2suXG4gKi9cblxuXG52YXIgQ2xpcGJvYXJkID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfRW1pdHRlcikge1xuICBfaW5oZXJpdHMoQ2xpcGJvYXJkLCBfRW1pdHRlcik7XG5cbiAgdmFyIF9zdXBlciA9IF9jcmVhdGVTdXBlcihDbGlwYm9hcmQpO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xIVE1MRWxlbWVudHxIVE1MQ29sbGVjdGlvbnxOb2RlTGlzdH0gdHJpZ2dlclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKi9cbiAgZnVuY3Rpb24gQ2xpcGJvYXJkKHRyaWdnZXIsIG9wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ2xpcGJvYXJkKTtcblxuICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcyk7XG5cbiAgICBfdGhpcy5yZXNvbHZlT3B0aW9ucyhvcHRpb25zKTtcblxuICAgIF90aGlzLmxpc3RlbkNsaWNrKHRyaWdnZXIpO1xuXG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG4gIC8qKlxuICAgKiBEZWZpbmVzIGlmIGF0dHJpYnV0ZXMgd291bGQgYmUgcmVzb2x2ZWQgdXNpbmcgaW50ZXJuYWwgc2V0dGVyIGZ1bmN0aW9uc1xuICAgKiBvciBjdXN0b20gZnVuY3Rpb25zIHRoYXQgd2VyZSBwYXNzZWQgaW4gdGhlIGNvbnN0cnVjdG9yLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKi9cblxuXG4gIF9jcmVhdGVDbGFzcyhDbGlwYm9hcmQsIFt7XG4gICAga2V5OiBcInJlc29sdmVPcHRpb25zXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlc29sdmVPcHRpb25zKCkge1xuICAgICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICAgICAgdGhpcy5hY3Rpb24gPSB0eXBlb2Ygb3B0aW9ucy5hY3Rpb24gPT09ICdmdW5jdGlvbicgPyBvcHRpb25zLmFjdGlvbiA6IHRoaXMuZGVmYXVsdEFjdGlvbjtcbiAgICAgIHRoaXMudGFyZ2V0ID0gdHlwZW9mIG9wdGlvbnMudGFyZ2V0ID09PSAnZnVuY3Rpb24nID8gb3B0aW9ucy50YXJnZXQgOiB0aGlzLmRlZmF1bHRUYXJnZXQ7XG4gICAgICB0aGlzLnRleHQgPSB0eXBlb2Ygb3B0aW9ucy50ZXh0ID09PSAnZnVuY3Rpb24nID8gb3B0aW9ucy50ZXh0IDogdGhpcy5kZWZhdWx0VGV4dDtcbiAgICAgIHRoaXMuY29udGFpbmVyID0gY2xpcGJvYXJkX3R5cGVvZihvcHRpb25zLmNvbnRhaW5lcikgPT09ICdvYmplY3QnID8gb3B0aW9ucy5jb250YWluZXIgOiBkb2N1bWVudC5ib2R5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgY2xpY2sgZXZlbnQgbGlzdGVuZXIgdG8gdGhlIHBhc3NlZCB0cmlnZ2VyLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfEhUTUxFbGVtZW50fEhUTUxDb2xsZWN0aW9ufE5vZGVMaXN0fSB0cmlnZ2VyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJsaXN0ZW5DbGlja1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsaXN0ZW5DbGljayh0cmlnZ2VyKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdGhpcy5saXN0ZW5lciA9IGxpc3Rlbl9kZWZhdWx0KCkodHJpZ2dlciwgJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzMi5vbkNsaWNrKGUpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBuZXcgYENsaXBib2FyZEFjdGlvbmAgb24gZWFjaCBjbGljayBldmVudC5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJvbkNsaWNrXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uQ2xpY2soZSkge1xuICAgICAgdmFyIHRyaWdnZXIgPSBlLmRlbGVnYXRlVGFyZ2V0IHx8IGUuY3VycmVudFRhcmdldDtcbiAgICAgIHZhciBhY3Rpb24gPSB0aGlzLmFjdGlvbih0cmlnZ2VyKSB8fCAnY29weSc7XG4gICAgICB2YXIgdGV4dCA9IGFjdGlvbnNfZGVmYXVsdCh7XG4gICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICBjb250YWluZXI6IHRoaXMuY29udGFpbmVyLFxuICAgICAgICB0YXJnZXQ6IHRoaXMudGFyZ2V0KHRyaWdnZXIpLFxuICAgICAgICB0ZXh0OiB0aGlzLnRleHQodHJpZ2dlcilcbiAgICAgIH0pOyAvLyBGaXJlcyBhbiBldmVudCBiYXNlZCBvbiB0aGUgY29weSBvcGVyYXRpb24gcmVzdWx0LlxuXG4gICAgICB0aGlzLmVtaXQodGV4dCA/ICdzdWNjZXNzJyA6ICdlcnJvcicsIHtcbiAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgIHRyaWdnZXI6IHRyaWdnZXIsXG4gICAgICAgIGNsZWFyU2VsZWN0aW9uOiBmdW5jdGlvbiBjbGVhclNlbGVjdGlvbigpIHtcbiAgICAgICAgICBpZiAodHJpZ2dlcikge1xuICAgICAgICAgICAgdHJpZ2dlci5mb2N1cygpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgYGFjdGlvbmAgbG9va3VwIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdHJpZ2dlclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZGVmYXVsdEFjdGlvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZWZhdWx0QWN0aW9uKHRyaWdnZXIpIHtcbiAgICAgIHJldHVybiBnZXRBdHRyaWJ1dGVWYWx1ZSgnYWN0aW9uJywgdHJpZ2dlcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgYHRhcmdldGAgbG9va3VwIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdHJpZ2dlclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZGVmYXVsdFRhcmdldFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZWZhdWx0VGFyZ2V0KHRyaWdnZXIpIHtcbiAgICAgIHZhciBzZWxlY3RvciA9IGdldEF0dHJpYnV0ZVZhbHVlKCd0YXJnZXQnLCB0cmlnZ2VyKTtcblxuICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxsb3cgZmlyZSBwcm9ncmFtbWF0aWNhbGx5IGEgY29weSBhY3Rpb25cbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xIVE1MRWxlbWVudH0gdGFyZ2V0XG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyBUZXh0IGNvcGllZC5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImRlZmF1bHRUZXh0XCIsXG5cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IGB0ZXh0YCBsb29rdXAgZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0cmlnZ2VyXG4gICAgICovXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlZmF1bHRUZXh0KHRyaWdnZXIpIHtcbiAgICAgIHJldHVybiBnZXRBdHRyaWJ1dGVWYWx1ZSgndGV4dCcsIHRyaWdnZXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZXN0cm95IGxpZmVjeWNsZS5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImRlc3Ryb3lcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHRoaXMubGlzdGVuZXIuZGVzdHJveSgpO1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiBcImNvcHlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29weSh0YXJnZXQpIHtcbiAgICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7XG4gICAgICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuYm9keVxuICAgICAgfTtcbiAgICAgIHJldHVybiBhY3Rpb25zX2NvcHkodGFyZ2V0LCBvcHRpb25zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxsb3cgZmlyZSBwcm9ncmFtbWF0aWNhbGx5IGEgY3V0IGFjdGlvblxuICAgICAqIEBwYXJhbSB7U3RyaW5nfEhUTUxFbGVtZW50fSB0YXJnZXRcbiAgICAgKiBAcmV0dXJucyBUZXh0IGN1dHRlZC5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImN1dFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjdXQodGFyZ2V0KSB7XG4gICAgICByZXR1cm4gYWN0aW9uc19jdXQodGFyZ2V0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgc3VwcG9ydCBvZiB0aGUgZ2l2ZW4gYWN0aW9uLCBvciBhbGwgYWN0aW9ucyBpZiBubyBhY3Rpb24gaXNcbiAgICAgKiBnaXZlbi5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW2FjdGlvbl1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImlzU3VwcG9ydGVkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzU3VwcG9ydGVkKCkge1xuICAgICAgdmFyIGFjdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogWydjb3B5JywgJ2N1dCddO1xuICAgICAgdmFyIGFjdGlvbnMgPSB0eXBlb2YgYWN0aW9uID09PSAnc3RyaW5nJyA/IFthY3Rpb25dIDogYWN0aW9uO1xuICAgICAgdmFyIHN1cHBvcnQgPSAhIWRvY3VtZW50LnF1ZXJ5Q29tbWFuZFN1cHBvcnRlZDtcbiAgICAgIGFjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgIHN1cHBvcnQgPSBzdXBwb3J0ICYmICEhZG9jdW1lbnQucXVlcnlDb21tYW5kU3VwcG9ydGVkKGFjdGlvbik7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBzdXBwb3J0O1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBDbGlwYm9hcmQ7XG59KCh0aW55X2VtaXR0ZXJfZGVmYXVsdCgpKSk7XG5cbi8qIGhhcm1vbnkgZGVmYXVsdCBleHBvcnQgKi8gdmFyIGNsaXBib2FyZCA9IChDbGlwYm9hcmQpO1xuXG4vKioqLyB9KSxcblxuLyoqKi8gODI4OlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSkge1xuXG52YXIgRE9DVU1FTlRfTk9ERV9UWVBFID0gOTtcblxuLyoqXG4gKiBBIHBvbHlmaWxsIGZvciBFbGVtZW50Lm1hdGNoZXMoKVxuICovXG5pZiAodHlwZW9mIEVsZW1lbnQgIT09ICd1bmRlZmluZWQnICYmICFFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzKSB7XG4gICAgdmFyIHByb3RvID0gRWxlbWVudC5wcm90b3R5cGU7XG5cbiAgICBwcm90by5tYXRjaGVzID0gcHJvdG8ubWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICAgICAgICAgIHByb3RvLm1vek1hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICAgICAgICAgICAgICBwcm90by5tc01hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICAgICAgICAgICAgICBwcm90by5vTWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICAgICAgICAgIHByb3RvLndlYmtpdE1hdGNoZXNTZWxlY3Rvcjtcbn1cblxuLyoqXG4gKiBGaW5kcyB0aGUgY2xvc2VzdCBwYXJlbnQgdGhhdCBtYXRjaGVzIGEgc2VsZWN0b3IuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBjbG9zZXN0IChlbGVtZW50LCBzZWxlY3Rvcikge1xuICAgIHdoaWxlIChlbGVtZW50ICYmIGVsZW1lbnQubm9kZVR5cGUgIT09IERPQ1VNRU5UX05PREVfVFlQRSkge1xuICAgICAgICBpZiAodHlwZW9mIGVsZW1lbnQubWF0Y2hlcyA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgICAgICAgZWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsb3Nlc3Q7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIDQzODpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIF9fdW51c2VkX3dlYnBhY2tfZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgY2xvc2VzdCA9IF9fd2VicGFja19yZXF1aXJlX18oODI4KTtcblxuLyoqXG4gKiBEZWxlZ2F0ZXMgZXZlbnQgdG8gYSBzZWxlY3Rvci5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHVzZUNhcHR1cmVcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gX2RlbGVnYXRlKGVsZW1lbnQsIHNlbGVjdG9yLCB0eXBlLCBjYWxsYmFjaywgdXNlQ2FwdHVyZSkge1xuICAgIHZhciBsaXN0ZW5lckZuID0gbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lckZuLCB1c2VDYXB0dXJlKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyRm4sIHVzZUNhcHR1cmUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIERlbGVnYXRlcyBldmVudCB0byBhIHNlbGVjdG9yLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudHxTdHJpbmd8QXJyYXl9IFtlbGVtZW50c11cbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHVzZUNhcHR1cmVcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gZGVsZWdhdGUoZWxlbWVudHMsIHNlbGVjdG9yLCB0eXBlLCBjYWxsYmFjaywgdXNlQ2FwdHVyZSkge1xuICAgIC8vIEhhbmRsZSB0aGUgcmVndWxhciBFbGVtZW50IHVzYWdlXG4gICAgaWYgKHR5cGVvZiBlbGVtZW50cy5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBfZGVsZWdhdGUuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgRWxlbWVudC1sZXNzIHVzYWdlLCBpdCBkZWZhdWx0cyB0byBnbG9iYWwgZGVsZWdhdGlvblxuICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBVc2UgYGRvY3VtZW50YCBhcyB0aGUgZmlyc3QgcGFyYW1ldGVyLCB0aGVuIGFwcGx5IGFyZ3VtZW50c1xuICAgICAgICAvLyBUaGlzIGlzIGEgc2hvcnQgd2F5IHRvIC51bnNoaWZ0IGBhcmd1bWVudHNgIHdpdGhvdXQgcnVubmluZyBpbnRvIGRlb3B0aW1pemF0aW9uc1xuICAgICAgICByZXR1cm4gX2RlbGVnYXRlLmJpbmQobnVsbCwgZG9jdW1lbnQpLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIFNlbGVjdG9yLWJhc2VkIHVzYWdlXG4gICAgaWYgKHR5cGVvZiBlbGVtZW50cyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZW1lbnRzKTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgQXJyYXktbGlrZSBiYXNlZCB1c2FnZVxuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwoZWxlbWVudHMsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBfZGVsZWdhdGUoZWxlbWVudCwgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKTtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBGaW5kcyBjbG9zZXN0IG1hdGNoIGFuZCBpbnZva2VzIGNhbGxiYWNrLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBsaXN0ZW5lcihlbGVtZW50LCBzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgICAgICBlLmRlbGVnYXRlVGFyZ2V0ID0gY2xvc2VzdChlLnRhcmdldCwgc2VsZWN0b3IpO1xuXG4gICAgICAgIGlmIChlLmRlbGVnYXRlVGFyZ2V0KSB7XG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKGVsZW1lbnQsIGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlbGVnYXRlO1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyA4Nzk6XG4vKioqLyAoZnVuY3Rpb24oX191bnVzZWRfd2VicGFja19tb2R1bGUsIGV4cG9ydHMpIHtcblxuLyoqXG4gKiBDaGVjayBpZiBhcmd1bWVudCBpcyBhIEhUTUwgZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmV4cG9ydHMubm9kZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgICAgJiYgdmFsdWUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudFxuICAgICAgICAmJiB2YWx1ZS5ub2RlVHlwZSA9PT0gMTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgYXJndW1lbnQgaXMgYSBsaXN0IG9mIEhUTUwgZWxlbWVudHMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnRzLm5vZGVMaXN0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG5cbiAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZFxuICAgICAgICAmJiAodHlwZSA9PT0gJ1tvYmplY3QgTm9kZUxpc3RdJyB8fCB0eXBlID09PSAnW29iamVjdCBIVE1MQ29sbGVjdGlvbl0nKVxuICAgICAgICAmJiAoJ2xlbmd0aCcgaW4gdmFsdWUpXG4gICAgICAgICYmICh2YWx1ZS5sZW5ndGggPT09IDAgfHwgZXhwb3J0cy5ub2RlKHZhbHVlWzBdKSk7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGFyZ3VtZW50IGlzIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZXhwb3J0cy5zdHJpbmcgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnXG4gICAgICAgIHx8IHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBhcmd1bWVudCBpcyBhIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZXhwb3J0cy5mbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpO1xuXG4gICAgcmV0dXJuIHR5cGUgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyAzNzA6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBfX3VudXNlZF93ZWJwYWNrX2V4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGlzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4NzkpO1xudmFyIGRlbGVnYXRlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0MzgpO1xuXG4vKipcbiAqIFZhbGlkYXRlcyBhbGwgcGFyYW1zIGFuZCBjYWxscyB0aGUgcmlnaHRcbiAqIGxpc3RlbmVyIGZ1bmN0aW9uIGJhc2VkIG9uIGl0cyB0YXJnZXQgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xIVE1MRWxlbWVudHxIVE1MQ29sbGVjdGlvbnxOb2RlTGlzdH0gdGFyZ2V0XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gbGlzdGVuKHRhcmdldCwgdHlwZSwgY2FsbGJhY2spIHtcbiAgICBpZiAoIXRhcmdldCAmJiAhdHlwZSAmJiAhY2FsbGJhY2spIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHJlcXVpcmVkIGFyZ3VtZW50cycpO1xuICAgIH1cblxuICAgIGlmICghaXMuc3RyaW5nKHR5cGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1NlY29uZCBhcmd1bWVudCBtdXN0IGJlIGEgU3RyaW5nJyk7XG4gICAgfVxuXG4gICAgaWYgKCFpcy5mbihjYWxsYmFjaykpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhpcmQgYXJndW1lbnQgbXVzdCBiZSBhIEZ1bmN0aW9uJyk7XG4gICAgfVxuXG4gICAgaWYgKGlzLm5vZGUodGFyZ2V0KSkge1xuICAgICAgICByZXR1cm4gbGlzdGVuTm9kZSh0YXJnZXQsIHR5cGUsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXMubm9kZUxpc3QodGFyZ2V0KSkge1xuICAgICAgICByZXR1cm4gbGlzdGVuTm9kZUxpc3QodGFyZ2V0LCB0eXBlLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzLnN0cmluZyh0YXJnZXQpKSB7XG4gICAgICAgIHJldHVybiBsaXN0ZW5TZWxlY3Rvcih0YXJnZXQsIHR5cGUsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBTdHJpbmcsIEhUTUxFbGVtZW50LCBIVE1MQ29sbGVjdGlvbiwgb3IgTm9kZUxpc3QnKTtcbiAgICB9XG59XG5cbi8qKlxuICogQWRkcyBhbiBldmVudCBsaXN0ZW5lciB0byBhIEhUTUwgZWxlbWVudFxuICogYW5kIHJldHVybnMgYSByZW1vdmUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIGxpc3Rlbk5vZGUobm9kZSwgdHlwZSwgY2FsbGJhY2spIHtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgY2FsbGJhY2spO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIEFkZCBhbiBldmVudCBsaXN0ZW5lciB0byBhIGxpc3Qgb2YgSFRNTCBlbGVtZW50c1xuICogYW5kIHJldHVybnMgYSByZW1vdmUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtOb2RlTGlzdHxIVE1MQ29sbGVjdGlvbn0gbm9kZUxpc3RcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBsaXN0ZW5Ob2RlTGlzdChub2RlTGlzdCwgdHlwZSwgY2FsbGJhY2spIHtcbiAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKG5vZGVMaXN0LCBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjayk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwobm9kZUxpc3QsIGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIGEgc2VsZWN0b3JcbiAqIGFuZCByZXR1cm5zIGEgcmVtb3ZlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIGxpc3RlblNlbGVjdG9yKHNlbGVjdG9yLCB0eXBlLCBjYWxsYmFjaykge1xuICAgIHJldHVybiBkZWxlZ2F0ZShkb2N1bWVudC5ib2R5LCBzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2spO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3RlbjtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gODE3OlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSkge1xuXG5mdW5jdGlvbiBzZWxlY3QoZWxlbWVudCkge1xuICAgIHZhciBzZWxlY3RlZFRleHQ7XG5cbiAgICBpZiAoZWxlbWVudC5ub2RlTmFtZSA9PT0gJ1NFTEVDVCcpIHtcbiAgICAgICAgZWxlbWVudC5mb2N1cygpO1xuXG4gICAgICAgIHNlbGVjdGVkVGV4dCA9IGVsZW1lbnQudmFsdWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVsZW1lbnQubm9kZU5hbWUgPT09ICdJTlBVVCcgfHwgZWxlbWVudC5ub2RlTmFtZSA9PT0gJ1RFWFRBUkVBJykge1xuICAgICAgICB2YXIgaXNSZWFkT25seSA9IGVsZW1lbnQuaGFzQXR0cmlidXRlKCdyZWFkb25seScpO1xuXG4gICAgICAgIGlmICghaXNSZWFkT25seSkge1xuICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JlYWRvbmx5JywgJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudC5zZWxlY3QoKTtcbiAgICAgICAgZWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZSgwLCBlbGVtZW50LnZhbHVlLmxlbmd0aCk7XG5cbiAgICAgICAgaWYgKCFpc1JlYWRPbmx5KSB7XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgncmVhZG9ubHknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGVjdGVkVGV4dCA9IGVsZW1lbnQudmFsdWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScpKSB7XG4gICAgICAgICAgICBlbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICB2YXIgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuXG4gICAgICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhlbGVtZW50KTtcbiAgICAgICAgc2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICBzZWxlY3Rpb24uYWRkUmFuZ2UocmFuZ2UpO1xuXG4gICAgICAgIHNlbGVjdGVkVGV4dCA9IHNlbGVjdGlvbi50b1N0cmluZygpO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxlY3RlZFRleHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2VsZWN0O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyAyNzk6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlKSB7XG5cbmZ1bmN0aW9uIEUgKCkge1xuICAvLyBLZWVwIHRoaXMgZW1wdHkgc28gaXQncyBlYXNpZXIgdG8gaW5oZXJpdCBmcm9tXG4gIC8vICh2aWEgaHR0cHM6Ly9naXRodWIuY29tL2xpcHNtYWNrIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3Njb3R0Y29yZ2FuL3RpbnktZW1pdHRlci9pc3N1ZXMvMylcbn1cblxuRS5wcm90b3R5cGUgPSB7XG4gIG9uOiBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2ssIGN0eCkge1xuICAgIHZhciBlID0gdGhpcy5lIHx8ICh0aGlzLmUgPSB7fSk7XG5cbiAgICAoZVtuYW1lXSB8fCAoZVtuYW1lXSA9IFtdKSkucHVzaCh7XG4gICAgICBmbjogY2FsbGJhY2ssXG4gICAgICBjdHg6IGN0eFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgb25jZTogZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrLCBjdHgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgZnVuY3Rpb24gbGlzdGVuZXIgKCkge1xuICAgICAgc2VsZi5vZmYobmFtZSwgbGlzdGVuZXIpO1xuICAgICAgY2FsbGJhY2suYXBwbHkoY3R4LCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICBsaXN0ZW5lci5fID0gY2FsbGJhY2tcbiAgICByZXR1cm4gdGhpcy5vbihuYW1lLCBsaXN0ZW5lciwgY3R4KTtcbiAgfSxcblxuICBlbWl0OiBmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciBkYXRhID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIHZhciBldnRBcnIgPSAoKHRoaXMuZSB8fCAodGhpcy5lID0ge30pKVtuYW1lXSB8fCBbXSkuc2xpY2UoKTtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGxlbiA9IGV2dEFyci5sZW5ndGg7XG5cbiAgICBmb3IgKGk7IGkgPCBsZW47IGkrKykge1xuICAgICAgZXZ0QXJyW2ldLmZuLmFwcGx5KGV2dEFycltpXS5jdHgsIGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG9mZjogZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGUgPSB0aGlzLmUgfHwgKHRoaXMuZSA9IHt9KTtcbiAgICB2YXIgZXZ0cyA9IGVbbmFtZV07XG4gICAgdmFyIGxpdmVFdmVudHMgPSBbXTtcblxuICAgIGlmIChldnRzICYmIGNhbGxiYWNrKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gZXZ0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoZXZ0c1tpXS5mbiAhPT0gY2FsbGJhY2sgJiYgZXZ0c1tpXS5mbi5fICE9PSBjYWxsYmFjaylcbiAgICAgICAgICBsaXZlRXZlbnRzLnB1c2goZXZ0c1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGV2ZW50IGZyb20gcXVldWUgdG8gcHJldmVudCBtZW1vcnkgbGVha1xuICAgIC8vIFN1Z2dlc3RlZCBieSBodHRwczovL2dpdGh1Yi5jb20vbGF6ZFxuICAgIC8vIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL3Njb3R0Y29yZ2FuL3RpbnktZW1pdHRlci9jb21taXQvYzZlYmZhYTliYzk3M2IzM2QxMTBhODRhMzA3NzQyYjdjZjk0Yzk1MyNjb21taXRjb21tZW50LTUwMjQ5MTBcblxuICAgIChsaXZlRXZlbnRzLmxlbmd0aClcbiAgICAgID8gZVtuYW1lXSA9IGxpdmVFdmVudHNcbiAgICAgIDogZGVsZXRlIGVbbmFtZV07XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFO1xubW9kdWxlLmV4cG9ydHMuVGlueUVtaXR0ZXIgPSBFO1xuXG5cbi8qKiovIH0pXG5cbi8qKioqKiovIFx0fSk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQgKi9cbi8qKioqKiovIFx0IWZ1bmN0aW9uKCkge1xuLyoqKioqKi8gXHRcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4vKioqKioqLyBcdFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbi8qKioqKiovIFx0XHRcdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4vKioqKioqLyBcdFx0XHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuLyoqKioqKi8gXHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gZ2V0dGVyO1xuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdH0oKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyAqL1xuLyoqKioqKi8gXHQhZnVuY3Rpb24oKSB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcbi8qKioqKiovIFx0XHRcdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcbi8qKioqKiovIFx0XHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG4vKioqKioqLyBcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcbi8qKioqKiovIFx0XHRcdFx0fVxuLyoqKioqKi8gXHRcdFx0fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdH0oKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQgKi9cbi8qKioqKiovIFx0IWZ1bmN0aW9uKCkge1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH1cbi8qKioqKiovIFx0fSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8vIG1vZHVsZSBleHBvcnRzIG11c3QgYmUgcmV0dXJuZWQgZnJvbSBydW50aW1lIHNvIGVudHJ5IGlubGluaW5nIGlzIGRpc2FibGVkXG4vKioqKioqLyBcdC8vIHN0YXJ0dXBcbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDY4Nik7XG4vKioqKioqLyB9KSgpXG4uZGVmYXVsdDtcbn0pOyIsICIhZnVuY3Rpb24oZSl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUpbW9kdWxlLmV4cG9ydHM9ZSgpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXSxlKTtlbHNleyhcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzpcInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsP2dsb2JhbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOnRoaXMpLmJhc2ljTGlnaHRib3g9ZSgpfX0oKGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uIGUobix0LG8pe2Z1bmN0aW9uIHIoYyx1KXtpZighdFtjXSl7aWYoIW5bY10pe3ZhciBzPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIXUmJnMpcmV0dXJuIHMoYywhMCk7aWYoaSlyZXR1cm4gaShjLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2MrXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBsPXRbY109e2V4cG9ydHM6e319O25bY11bMF0uY2FsbChsLmV4cG9ydHMsKGZ1bmN0aW9uKGUpe3JldHVybiByKG5bY11bMV1bZV18fGUpfSksbCxsLmV4cG9ydHMsZSxuLHQsbyl9cmV0dXJuIHRbY10uZXhwb3J0c31mb3IodmFyIGk9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxjPTA7YzxvLmxlbmd0aDtjKyspcihvW2NdKTtyZXR1cm4gcn0oezE6W2Z1bmN0aW9uKGUsbix0KXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSx0LmNyZWF0ZT10LnZpc2libGU9dm9pZCAwO3ZhciBvPWZ1bmN0aW9uKGUpe3ZhciBuPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdJiZhcmd1bWVudHNbMV0sdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3JldHVybiB0LmlubmVySFRNTD1lLnRyaW0oKSwhMD09PW4/dC5jaGlsZHJlbjp0LmZpcnN0Q2hpbGR9LHI9ZnVuY3Rpb24oZSxuKXt2YXIgdD1lLmNoaWxkcmVuO3JldHVybiAxPT09dC5sZW5ndGgmJnRbMF0udGFnTmFtZT09PW59LGk9ZnVuY3Rpb24oZSl7cmV0dXJuIG51bGwhPShlPWV8fGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYmFzaWNMaWdodGJveFwiKSkmJiEwPT09ZS5vd25lckRvY3VtZW50LmJvZHkuY29udGFpbnMoZSl9O3QudmlzaWJsZT1pO3QuY3JlYXRlPWZ1bmN0aW9uKGUsbil7dmFyIHQ9ZnVuY3Rpb24oZSxuKXt2YXIgdD1vKCdcXG5cXHRcXHQ8ZGl2IGNsYXNzPVwiYmFzaWNMaWdodGJveCAnLmNvbmNhdChuLmNsYXNzTmFtZSwnXCI+XFxuXFx0XFx0XFx0PGRpdiBjbGFzcz1cImJhc2ljTGlnaHRib3hfX3BsYWNlaG9sZGVyXCIgcm9sZT1cImRpYWxvZ1wiPjwvZGl2PlxcblxcdFxcdDwvZGl2PlxcblxcdCcpKSxpPXQucXVlcnlTZWxlY3RvcihcIi5iYXNpY0xpZ2h0Ym94X19wbGFjZWhvbGRlclwiKTtlLmZvckVhY2goKGZ1bmN0aW9uKGUpe3JldHVybiBpLmFwcGVuZENoaWxkKGUpfSkpO3ZhciBjPXIoaSxcIklNR1wiKSx1PXIoaSxcIlZJREVPXCIpLHM9cihpLFwiSUZSQU1FXCIpO3JldHVybiEwPT09YyYmdC5jbGFzc0xpc3QuYWRkKFwiYmFzaWNMaWdodGJveC0taW1nXCIpLCEwPT09dSYmdC5jbGFzc0xpc3QuYWRkKFwiYmFzaWNMaWdodGJveC0tdmlkZW9cIiksITA9PT1zJiZ0LmNsYXNzTGlzdC5hZGQoXCJiYXNpY0xpZ2h0Ym94LS1pZnJhbWVcIiksdH0oZT1mdW5jdGlvbihlKXt2YXIgbj1cInN0cmluZ1wiPT10eXBlb2YgZSx0PWUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudD09MTtpZighMT09PW4mJiExPT09dCl0aHJvdyBuZXcgRXJyb3IoXCJDb250ZW50IG11c3QgYmUgYSBET00gZWxlbWVudC9ub2RlIG9yIHN0cmluZ1wiKTtyZXR1cm4hMD09PW4/QXJyYXkuZnJvbShvKGUsITApKTpcIlRFTVBMQVRFXCI9PT1lLnRhZ05hbWU/W2UuY29udGVudC5jbG9uZU5vZGUoITApXTpBcnJheS5mcm9tKGUuY2hpbGRyZW4pfShlKSxuPWZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnt9O2lmKG51bGw9PShlPU9iamVjdC5hc3NpZ24oe30sZSkpLmNsb3NhYmxlJiYoZS5jbG9zYWJsZT0hMCksbnVsbD09ZS5jbGFzc05hbWUmJihlLmNsYXNzTmFtZT1cIlwiKSxudWxsPT1lLm9uU2hvdyYmKGUub25TaG93PWZ1bmN0aW9uKCl7fSksbnVsbD09ZS5vbkNsb3NlJiYoZS5vbkNsb3NlPWZ1bmN0aW9uKCl7fSksXCJib29sZWFuXCIhPXR5cGVvZiBlLmNsb3NhYmxlKXRocm93IG5ldyBFcnJvcihcIlByb3BlcnR5IGBjbG9zYWJsZWAgbXVzdCBiZSBhIGJvb2xlYW5cIik7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIGUuY2xhc3NOYW1lKXRocm93IG5ldyBFcnJvcihcIlByb3BlcnR5IGBjbGFzc05hbWVgIG11c3QgYmUgYSBzdHJpbmdcIik7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZS5vblNob3cpdGhyb3cgbmV3IEVycm9yKFwiUHJvcGVydHkgYG9uU2hvd2AgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGUub25DbG9zZSl0aHJvdyBuZXcgRXJyb3IoXCJQcm9wZXJ0eSBgb25DbG9zZWAgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO3JldHVybiBlfShuKSksYz1mdW5jdGlvbihlKXtyZXR1cm4hMSE9PW4ub25DbG9zZSh1KSYmZnVuY3Rpb24oZSxuKXtyZXR1cm4gZS5jbGFzc0xpc3QucmVtb3ZlKFwiYmFzaWNMaWdodGJveC0tdmlzaWJsZVwiKSxzZXRUaW1lb3V0KChmdW5jdGlvbigpe3JldHVybiExPT09aShlKXx8ZS5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGUpLG4oKX0pLDQxMCksITB9KHQsKGZ1bmN0aW9uKCl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZSlyZXR1cm4gZSh1KX0pKX07ITA9PT1uLmNsb3NhYmxlJiZ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLChmdW5jdGlvbihlKXtlLnRhcmdldD09PXQmJmMoKX0pKTt2YXIgdT17ZWxlbWVudDpmdW5jdGlvbigpe3JldHVybiB0fSx2aXNpYmxlOmZ1bmN0aW9uKCl7cmV0dXJuIGkodCl9LHNob3c6ZnVuY3Rpb24oZSl7cmV0dXJuITEhPT1uLm9uU2hvdyh1KSYmZnVuY3Rpb24oZSxuKXtyZXR1cm4gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlKSxzZXRUaW1lb3V0KChmdW5jdGlvbigpe3JlcXVlc3RBbmltYXRpb25GcmFtZSgoZnVuY3Rpb24oKXtyZXR1cm4gZS5jbGFzc0xpc3QuYWRkKFwiYmFzaWNMaWdodGJveC0tdmlzaWJsZVwiKSxuKCl9KSl9KSwxMCksITB9KHQsKGZ1bmN0aW9uKCl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZSlyZXR1cm4gZSh1KX0pKX0sY2xvc2U6Y307cmV0dXJuIHV9fSx7fV19LHt9LFsxXSkoMSl9KSk7IiwgImZ1bmN0aW9uIGUoZSxyKXsobnVsbD09cnx8cj5lLmxlbmd0aCkmJihyPWUubGVuZ3RoKTtmb3IodmFyIG49MCx0PUFycmF5KHIpO248cjtuKyspdFtuXT1lW25dO3JldHVybiB0fWZ1bmN0aW9uIHIocixuKXt2YXIgdD1cInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sJiZyW1N5bWJvbC5pdGVyYXRvcl18fHJbXCJAQGl0ZXJhdG9yXCJdO2lmKHQpcmV0dXJuKHQ9dC5jYWxsKHIpKS5uZXh0LmJpbmQodCk7aWYoQXJyYXkuaXNBcnJheShyKXx8KHQ9ZnVuY3Rpb24ocixuKXtpZihyKXtpZihcInN0cmluZ1wiPT10eXBlb2YgcilyZXR1cm4gZShyLG4pO3ZhciB0PXt9LnRvU3RyaW5nLmNhbGwocikuc2xpY2UoOCwtMSk7cmV0dXJuXCJPYmplY3RcIj09PXQmJnIuY29uc3RydWN0b3ImJih0PXIuY29uc3RydWN0b3IubmFtZSksXCJNYXBcIj09PXR8fFwiU2V0XCI9PT10P0FycmF5LmZyb20ocik6XCJBcmd1bWVudHNcIj09PXR8fC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KHQpP2UocixuKTp2b2lkIDB9fShyKSl8fG4pe3QmJihyPXQpO3ZhciBvPTA7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG8+PXIubGVuZ3RoP3tkb25lOiEwfTp7ZG9uZTohMSx2YWx1ZTpyW28rK119fX10aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGl0ZXJhdGUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIil9ZnVuY3Rpb24gbihlLHIsbix0KXt2YXIgbz17aGVhZGVyczp7YWNjZXB0OlwiKi8qXCJ9fTtyZXR1cm4gcnx8KG8ubW9kZT1cIm5vLWNvcnNcIiksbiYmKG8uY3JlZGVudGlhbHM9XCJpbmNsdWRlXCIpLG8ucHJpb3JpdHk9dD9cImhpZ2hcIjpcImxvd1wiLHdpbmRvdy5mZXRjaD9mZXRjaChlLG8pOmZ1bmN0aW9uKGUscil7cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKG4sdCxvKXsobz1uZXcgWE1MSHR0cFJlcXVlc3QpLm9wZW4oXCJHRVRcIixlLG8ud2l0aENyZWRlbnRpYWxzPXIpLG8uc2V0UmVxdWVzdEhlYWRlcihcIkFjY2VwdFwiLFwiKi8qXCIpLG8ub25sb2FkPWZ1bmN0aW9uKCl7MjAwPT09by5zdGF0dXM/bigpOnQoKX0sby5zZW5kKCl9KX0oZSxuKX12YXIgdCxvPSh0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpKS5yZWxMaXN0JiZ0LnJlbExpc3Quc3VwcG9ydHMmJnQucmVsTGlzdC5zdXBwb3J0cyhcInByZWZldGNoXCIpP2Z1bmN0aW9uKGUscil7cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKG4sdCxvKXsobz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKSkucmVsPVwicHJlZmV0Y2hcIixvLmhyZWY9ZSxyJiZvLnNldEF0dHJpYnV0ZShcImNyb3Nzb3JpZ2luXCIsXCJhbm9ueW1vdXNcIiksby5vbmxvYWQ9bixvLm9uZXJyb3I9dCxkb2N1bWVudC5oZWFkLmFwcGVuZChvKX0pfTpuLGk9d2luZG93LnJlcXVlc3RJZGxlQ2FsbGJhY2t8fGZ1bmN0aW9uKGUpe3ZhciByPURhdGUubm93KCk7cmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtlKHtkaWRUaW1lb3V0OiExLHRpbWVSZW1haW5pbmc6ZnVuY3Rpb24oKXtyZXR1cm4gTWF0aC5tYXgoMCw1MC0oRGF0ZS5ub3coKS1yKSl9fSl9LDEpfSxhPW5ldyBTZXQsYz1uZXcgU2V0LHM9ITE7ZnVuY3Rpb24gdShlLHIpe3JldHVybiBBcnJheS5pc0FycmF5KHIpP3Iuc29tZShmdW5jdGlvbihyKXtyZXR1cm4gdShlLHIpfSk6KHIudGVzdHx8cikuY2FsbChyLGUuaHJlZixlKX1mdW5jdGlvbiBsKGUpe3JldHVybiFlfHwoZS5zYXZlRGF0YT9uZXcgRXJyb3IoXCJTYXZlLURhdGEgaXMgZW5hYmxlZFwiKTohLzJnLy50ZXN0KGUuZWZmZWN0aXZlVHlwZSl8fG5ldyBFcnJvcihcIm5ldHdvcmsgY29uZGl0aW9ucyBhcmUgcG9vclwiKSl9ZnVuY3Rpb24gZihlKXtpZih2b2lkIDA9PT1lJiYoZT17fSksIXdpbmRvdy5JbnRlcnNlY3Rpb25PYnNlcnZlcnx8IShcImlzSW50ZXJzZWN0aW5nXCJpbiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5LnByb3RvdHlwZSkpcmV0dXJuIGZ1bmN0aW9uKCl7fTt2YXIgbj1mdW5jdGlvbihlKXtlPWV8fDE7dmFyIHI9W10sbj0wO2Z1bmN0aW9uIHQoKXtuPGUmJnIubGVuZ3RoPjAmJihyLnNoaWZ0KCkoKSxuKyspfXJldHVybltmdW5jdGlvbihlKXtyLnB1c2goZSk+MXx8dCgpfSxmdW5jdGlvbigpe24tLSx0KCl9XX0oZS50aHJvdHRsZXx8MS8wKSx0PW5bMF0sbz1uWzFdLGw9ZS5saW1pdHx8MS8wLGY9ZS50aHJlc2hvbGR8fDAsaD1lLm9yaWdpbnN8fFtsb2NhdGlvbi5ob3N0bmFtZV0sbT1lLmlnbm9yZXN8fFtdLHA9ZS5kZWxheXx8MCxnPW5ldyBNYXAsdz1uZXcgTWFwLHk9ZS50aW1lb3V0Rm58fGksRT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBlLmhyZWZGbiYmZS5ocmVmRm4sYj1lLnByZXJlbmRlcnx8ITE7cz1lLnByZXJlbmRlckFuZFByZWZldGNofHwhMTt2YXIgQT1uZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24obil7Zm9yKHZhciBpLHU9ZnVuY3Rpb24oKXt2YXIgbj1pLnZhbHVlLHU9Zy5nZXQobi50YXJnZXQuaHJlZil8fG5ldyBTZXQ7Zy5zZXQobi50YXJnZXQuaHJlZix1KSxuLmlzSW50ZXJzZWN0aW5nPyhuPW4udGFyZ2V0LHUuYWRkKG4pLGZ1bmN0aW9uKGUscil7cj9zZXRUaW1lb3V0KGUscik6ZSgpfShmdW5jdGlvbigpe3UmJnUuc2l6ZSYmKGJ8fHN8fEEudW5vYnNlcnZlKG4pLChzfHxiKSYmYy5zaXplPGwmJiF3LmhhcyhuLmhyZWYpP3YoRT9FKG4pOm4uaHJlZixlLmVhZ2VybmVzcykudGhlbihmdW5jdGlvbihlKXtmb3IodmFyIG4sdD1yKGUpOyEobj10KCkpLmRvbmU7KXt2YXIgbz1uLnZhbHVlLGk9b1swXSxhPW9bMV07dy5zZXQoaSxhKX19KS5jYXRjaChmdW5jdGlvbihyKXtpZighZS5vbkVycm9yKXRocm93IHI7ZS5vbkVycm9yKHIpfSk6YS5zaXplPGwmJiFiJiZ0KGZ1bmN0aW9uKCl7ZChFP0Uobik6bi5ocmVmLGUucHJpb3JpdHksZS5jaGVja0FjY2Vzc0NvbnRyb2xBbGxvd09yaWdpbixlLmNoZWNrQWNjZXNzQ29udHJvbEFsbG93Q3JlZGVudGlhbHMsZS5vbmx5T25Nb3VzZW92ZXIpLnRoZW4obykuY2F0Y2goZnVuY3Rpb24ocil7bygpLGUub25FcnJvciYmZS5vbkVycm9yKHIpfSl9KSl9LHApKToobj1uLnRhcmdldCx1LmRlbGV0ZShuKSx3LmhhcyhuLmhyZWYpJiZ3LnNldChmdW5jdGlvbihlLHIpe3ZhciBuPWUuZ2V0KHIpO3RyeXtuLnJlbW92ZSgpLGUuZGVsZXRlKHIpfWNhdGNoKGUpe3JldHVybiBlfXJldHVybiBlfSh3LG4uaHJlZikpKX0sZj1yKG4pOyEoaT1mKCkpLmRvbmU7KXUoKX0se3RocmVzaG9sZDpmfSk7cmV0dXJuIHkoZnVuY3Rpb24oKXtmb3IodmFyIG4sdD1yKGUuZWwmJmUuZWwubGVuZ3RoPjAmJlwiQVwiPT09ZS5lbFswXS5ub2RlTmFtZT9lLmVsOihlLmVsfHxkb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChcImFcIikpOyEobj10KCkpLmRvbmU7KXt2YXIgbz1uLnZhbHVlO2gubGVuZ3RoJiYhaC5pbmNsdWRlcyhvLmhvc3RuYW1lKXx8dShvLG0pfHxBLm9ic2VydmUobyl9fSx7dGltZW91dDplLnRpbWVvdXR8fDJlM30pLGZ1bmN0aW9uKCl7YS5jbGVhcigpLEEuZGlzY29ubmVjdCgpfX1mdW5jdGlvbiBkKGUsdCxpLHUsZil7dmFyIGQ9bChuYXZpZ2F0b3IuY29ubmVjdGlvbik7cmV0dXJuIGQgaW5zdGFuY2VvZiBFcnJvcj9Qcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJDYW5ub3QgcHJlZmV0Y2gsIFwiK2QubWVzc2FnZSkpOihjLnNpemU+MCYmIXMmJmNvbnNvbGUud2FybihcIltXYXJuaW5nXSBZb3UgYXJlIHVzaW5nIGJvdGggcHJlZmV0Y2hpbmcgYW5kIHByZXJlbmRlcmluZyBvbiB0aGUgc2FtZSBkb2N1bWVudFwiKSxQcm9taXNlLmFsbChbZV0uZmxhdCgpLm1hcChmdW5jdGlvbihlKXtyZXR1cm4gYS5oYXMoZSk/W106KGEuYWRkKGUpLGZ1bmN0aW9uKGUsbix0KXtmb3IodmFyIG89YXJndW1lbnRzLmxlbmd0aCxpPW5ldyBBcnJheShvPjM/by0zOjApLGE9MzthPG87YSsrKWlbYS0zXT1hcmd1bWVudHNbYV07aWYoIXQpcmV0dXJuIGUuYXBwbHkodm9pZCAwLFtuXS5jb25jYXQoaSkpO2Zvcih2YXIgYyxzPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2FbaHJlZj1cIicrbisnXCJdJyksdT1uZXcgTWFwLGw9ZnVuY3Rpb24oKXt2YXIgcj1jLnZhbHVlLHQ9ZnVuY3Rpb24oKXt2YXIgYT1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cmV0dXJuIHIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIix0KSxyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsbyksZS5hcHBseSh2b2lkIDAsW25dLmNvbmNhdChpKSl9LDIwMCk7dS5zZXQocixhKX0sbz1mdW5jdGlvbigpe3ZhciBlPXUuZ2V0KHIpO2UmJihjbGVhclRpbWVvdXQoZSksdS5kZWxldGUocikpfTtyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsdCksci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLG8pfSxmPXIocyk7IShjPWYoKSkuZG9uZTspbCgpfSh0P246byxuZXcgVVJMKGUsbG9jYXRpb24uaHJlZikudG9TdHJpbmcoKSxmLGksdSx0KSl9KSkpfWZ1bmN0aW9uIHYoZSxuKXt2b2lkIDA9PT1uJiYobj1cImltbWVkaWF0ZVwiKSxlPVtlXS5mbGF0KCk7dmFyIHQ9bChuYXZpZ2F0b3IuY29ubmVjdGlvbik7aWYodCBpbnN0YW5jZW9mIEVycm9yKXJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJDYW5ub3QgcHJlcmVuZGVyLCBcIit0Lm1lc3NhZ2UpKTtpZighSFRNTFNjcmlwdEVsZW1lbnQuc3VwcG9ydHMoXCJzcGVjdWxhdGlvbnJ1bGVzXCIpKXJldHVybiBkKGUsITAsITEsITEsXCJtb2RlcmF0ZVwiPT09bnx8XCJjb25zZXJ2YXRpdmVcIj09PW4pLFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIlRoaXMgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSBzcGVjdWxhdGlvbiBydWxlcyBBUEkuIEZhbGxpbmcgYmFjayB0byBwcmVmZXRjaC5cIikpO2Zvcih2YXIgbyxpPXIoZSk7IShvPWkoKSkuZG9uZTspe3ZhciB1PW8udmFsdWU7Yy5hZGQodSl9YS5zaXplPjAmJiFzJiZjb25zb2xlLndhcm4oXCJbV2FybmluZ10gWW91IGFyZSB1c2luZyBib3RoIHByZWZldGNoaW5nIGFuZCBwcmVyZW5kZXJpbmcgb24gdGhlIHNhbWUgZG9jdW1lbnRcIik7dmFyIGY9ZnVuY3Rpb24oZSxuKXt2YXIgdD1uZXcgTWFwO3RyeXtmb3IodmFyIG8saT1yKGUpOyEobz1pKCkpLmRvbmU7KXt2YXIgYT1vLnZhbHVlLGM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtjLnR5cGU9XCJzcGVjdWxhdGlvbnJ1bGVzXCIsYy50ZXh0PUpTT04uc3RyaW5naWZ5KHtwcmVyZW5kZXI6W3tzb3VyY2U6XCJsaXN0XCIsdXJsczpbYV0sZWFnZXJuZXNzOm59XX0pLGRvY3VtZW50LmhlYWQuYXBwZW5kKGMpLHQuc2V0KGEsYyl9fWNhdGNoKGUpe3JldHVybiBlfXJldHVybiB0fShlLG4pO3JldHVybiBmLnNpemU+MD9Qcm9taXNlLnJlc29sdmUoZik6UHJvbWlzZS5yZWplY3QoZil9ZXhwb3J0e2YgYXMgbGlzdGVuLGQgYXMgcHJlZmV0Y2gsdiBhcyBwcmVyZW5kZXJ9O1xuIiwgIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWVMYWJzL3F1aWNrbGlua1xuaW1wb3J0IHsgbGlzdGVuIH0gZnJvbSAncXVpY2tsaW5rL2Rpc3QvcXVpY2tsaW5rLm1qcyc7XG5saXN0ZW4oe1xuICBpZ25vcmVzOiBbXG4gICAgL1xcL2FwaVxcLz8vLFxuICAgICh1cmkpID0+IHVyaS5pbmNsdWRlcygnLnppcCcpLFxuICAgICh1cmksIGVsZW0pID0+IGVsZW0uaGFzQXR0cmlidXRlKCdub3ByZWZldGNoJyksXG4gICAgKHVyaSwgZWxlbSkgPT4gZWxlbS5oYXNoICYmIGVsZW0ucGF0aG5hbWUgPT09IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSxcbiAgXSxcbn0pO1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYUZhcmthcy9sYXp5c2l6ZXMvdHJlZS9naC1wYWdlcy9wbHVnaW5zL25hdGl2ZS1sb2FkaW5nXG5pbXBvcnQgbGF6eVNpemVzIGZyb20gJ2xhenlzaXplcyc7XG5pbXBvcnQgJ2xhenlzaXplcy9wbHVnaW5zL25hdGl2ZS1sb2FkaW5nL2xzLm5hdGl2ZS1sb2FkaW5nJztcblxudHJ5IHtcbiAgbGF6eVNpemVzLmNmZy5uYXRpdmVMb2FkaW5nID0ge1xuICAgIHNldExvYWRpbmdBdHRyaWJ1dGU6IHRydWUsXG4gICAgZGlzYWJsZUxpc3RlbmVyczoge1xuICAgICAgc2Nyb2xsOiB0cnVlLFxuICAgIH0sXG4gIH07XG5cbiAgLy8gQWRkaXRpb25hbCBwZXJmb3JtYW5jZSBvcHRpbWl6YXRpb25zXG4gIGxhenlTaXplcy5jZmcubGF6eUNsYXNzID0gJ2xhenlsb2FkJztcbiAgbGF6eVNpemVzLmNmZy5sb2FkZWRDbGFzcyA9ICdsYXp5bG9hZGVkJztcbiAgbGF6eVNpemVzLmNmZy5sb2FkaW5nQ2xhc3MgPSAnbGF6eWxvYWRpbmcnO1xuICBsYXp5U2l6ZXMuY2ZnLmV4cEZhY3RvciA9IDEuNTsgLy8gUHJlbG9hZCBpbWFnZXMgMS41eCB2aWV3cG9ydCBiZWZvcmUgdGhleSBlbnRlclxuXG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2xhenlzaXplcy1lbmFibGVkJyk7XG4gIH1cbn0gY2F0Y2ggKGVycm9yKSB7XG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgY29uc29sZS53YXJuKSB7XG4gICAgY29uc29sZS53YXJuKCdsYXp5U2l6ZXMgaW5pdGlhbGl6YXRpb24gZmFpbGVkOicsIGVycm9yKTtcbiAgfVxufVxuIiwgIi8qIVxyXG4gKiBjbGlwYm9hcmQuanMgZm9yIEJvb3RzdHJhcCBiYXNlZCBUaHVsaXRlIHNpdGVzXHJcbiAqIENvcHlyaWdodCAyMDIxLTIwMjQgVGh1bGl0ZVxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICovXHJcblxyXG5pbXBvcnQgQ2xpcGJvYXJkIGZyb20gJ2NsaXBib2FyZCc7XHJcblxyXG4oKCkgPT4ge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgdmFyIGNiID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaGlnaGxpZ2h0Jyk7XHJcblxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2IubGVuZ3RoOyArK2kpIHtcclxuICAgIHZhciBlbGVtZW50ID0gY2JbaV07XHJcbiAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcclxuICAgICAgJ2FmdGVyYmVnaW4nLFxyXG4gICAgICAnPGRpdiBjbGFzcz1cImNvcHlcIj48YnV0dG9uIHRpdGxlPVwiQ29weSB0byBjbGlwYm9hcmRcIiBjbGFzcz1cImJ0bi1jb3B5XCIgYXJpYS1sYWJlbD1cIkNsaXBib2FyZCBidXR0b25cIj48ZGl2PjwvZGl2PjwvYnV0dG9uPjwvZGl2PidcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICB2YXIgY2xpcGJvYXJkID0gbmV3IENsaXBib2FyZCgnLmJ0bi1jb3B5Jywge1xyXG4gICAgdGFyZ2V0OiBmdW5jdGlvbiAodHJpZ2dlcikge1xyXG4gICAgICByZXR1cm4gdHJpZ2dlci5wYXJlbnROb2RlLm5leHRFbGVtZW50U2libGluZztcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIGNsaXBib2FyZC5vbignc3VjY2VzcycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAvKlxyXG4gICAgICBjb25zb2xlLmluZm8oJ0FjdGlvbjonLCBlLmFjdGlvbik7XHJcbiAgICAgIGNvbnNvbGUuaW5mbygnVGV4dDonLCBlLnRleHQpO1xyXG4gICAgICBjb25zb2xlLmluZm8oJ1RyaWdnZXI6JywgZS50cmlnZ2VyKTtcclxuICAgICAgKi9cclxuXHJcbiAgICBlLmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgfSk7XHJcblxyXG4gIGNsaXBib2FyZC5vbignZXJyb3InLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgY29uc29sZS5lcnJvcignQWN0aW9uOicsIGUuYWN0aW9uKTtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ1RyaWdnZXI6JywgZS50cmlnZ2VyKTtcclxuICB9KTtcclxufSkoKTtcclxuIiwgImNvbnN0IHRvcEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b1RvcCcpO1xyXG5cclxuaWYgKHRvcEJ1dHRvbiAhPT0gbnVsbCkge1xyXG4gIHRvcEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdmYWRlJyk7XHJcbiAgd2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgc2Nyb2xsRnVuY3Rpb24oKTtcclxuICB9O1xyXG5cclxuICB0b3BCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b3BGdW5jdGlvbik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNjcm9sbEZ1bmN0aW9uKCkge1xyXG4gIGlmIChkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA+IDI3MCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID4gMjcwKSB7XHJcbiAgICB0b3BCdXR0b24uY2xhc3NMaXN0LmFkZCgnZmFkZScpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0b3BCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnZmFkZScpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdG9wRnVuY3Rpb24oKSB7XHJcbiAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwO1xyXG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPSAwO1xyXG59XHJcbiIsICIvLyBCYXNlZCBvbjogaHR0cHM6Ly9naXRodWIuY29tL2dvaHVnb2lvL2h1Z29Eb2NzL2Jsb2IvbWFzdGVyL192ZW5kb3IvZ2l0aHViLmNvbS9nb2h1Z29pby9nb2h1Z29pb1RoZW1lL2Fzc2V0cy9qcy90YWJzLmpzXHJcblxyXG4vKipcclxuICogU2NyaXB0cyB3aGljaCBtYW5hZ2VzIENvZGUgVG9nZ2xlIHRhYnMuXHJcbiAqL1xyXG52YXIgaTtcclxuLy8gc3RvcmUgdGFicyB2YXJpYWJsZVxyXG52YXIgYWxsVGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRvZ2dsZS10YWJdJyk7XHJcbnZhciBhbGxQYW5lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBhbmVdJyk7XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVUYWJzKGV2ZW50KSB7XHJcbiAgaWYgKGV2ZW50LnRhcmdldCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBjbGlja2VkVGFiID0gZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgIHZhciB0YXJnZXRLZXkgPSBjbGlja2VkVGFiLmdldEF0dHJpYnV0ZSgnZGF0YS10b2dnbGUtdGFiJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHZhciB0YXJnZXRLZXkgPSBldmVudDtcclxuICB9XHJcbiAgLy8gV2Ugc3RvcmUgdGhlIGNvbmZpZyBsYW5ndWFnZSBzZWxlY3RlZCBpbiB1c2VycycgbG9jYWxTdG9yYWdlXHJcbiAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UpIHtcclxuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY29uZmlnTGFuZ1ByZWYnLCB0YXJnZXRLZXkpO1xyXG4gIH1cclxuICB2YXIgc2VsZWN0ZWRUYWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdG9nZ2xlLXRhYj0nICsgdGFyZ2V0S2V5ICsgJ10nKTtcclxuICB2YXIgc2VsZWN0ZWRQYW5lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBhbmU9JyArIHRhcmdldEtleSArICddJyk7XHJcblxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsVGFicy5sZW5ndGg7IGkrKykge1xyXG4gICAgYWxsVGFic1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgIGFsbFBhbmVzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWxlY3RlZFRhYnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHNlbGVjdGVkVGFic1tpXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgIHNlbGVjdGVkUGFuZXNbaV0uY2xhc3NMaXN0LmFkZCgnc2hvdycsICdhY3RpdmUnKTtcclxuICB9XHJcbn1cclxuXHJcbmZvciAoaSA9IDA7IGkgPCBhbGxUYWJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgYWxsVGFic1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZVRhYnMpO1xyXG59XHJcbi8vIFVwb24gcGFnZSBsb2FkLCBpZiB1c2VyIGhhcyBhIHByZWZlcnJlZCBsYW5ndWFnZSBpbiBpdHMgbG9jYWxTdG9yYWdlLCB0YWJzIGFyZSBzZXQgdG8gaXQuXHJcbmlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NvbmZpZ0xhbmdQcmVmJykpIHtcclxuICB0b2dnbGVUYWJzKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY29uZmlnTGFuZ1ByZWYnKSk7XHJcbn1cclxuIiwgIi8vIENsb3NlIG1vYmlsZSBUT0MgZGV0YWlscyB3aGVuIGNsaWNraW5nIG9uIGEgbGlua1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAvLyBDaGVjayBpZiB0aGUgY2xpY2tlZCBlbGVtZW50IGlzIGEgbGluayB3aXRoaW4gdGhlIG1vYmlsZSBUT0NcbiAgY29uc3QgdG9jTW9iaWxlID0gZS50YXJnZXQuY2xvc2VzdCgnLnRvYy1tb2JpbGUnKTtcbiAgaWYgKHRvY01vYmlsZSAmJiBlLnRhcmdldC50YWdOYW1lID09PSAnQScpIHtcbiAgICAvLyBGaW5kIHRoZSBkZXRhaWxzIGVsZW1lbnQgd2l0aGluIHRoZSBtb2JpbGUgVE9DXG4gICAgY29uc3QgZGV0YWlscyA9IHRvY01vYmlsZS5xdWVyeVNlbGVjdG9yKCdkZXRhaWxzJyk7XG4gICAgaWYgKGRldGFpbHMgJiYgZGV0YWlscy5vcGVuKSB7XG4gICAgICAvLyBDbG9zZSB0aGUgZGV0YWlscyBlbGVtZW50XG4gICAgICBkZXRhaWxzLm9wZW4gPSBmYWxzZTtcbiAgICB9XG4gIH1cbn0pO1xuIiwgImNvbnN0IGNvcHlNYXJrZG93bkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3B5LW1hcmtkb3duJyk7XHJcbmlmIChjb3B5TWFya2Rvd25CdG4pIHtcclxuICBjb3B5TWFya2Rvd25CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBQcmV2ZW50IGRlZmF1bHQgYnV0dG9uIGJlaGF2aW9yXHJcbiAgICBjb25zdCBidXR0b24gPSB0aGlzO1xyXG5cclxuICAgIC8vIEdldCB0aGUgY3VycmVudCBwYWdlIFVSTCBhbmQgY29uc3RydWN0IHRoZSBwYXRoIHRvIHRoZSBtYXJrZG93biBmaWxlXHJcbiAgICBjb25zdCBjdXJyZW50UGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcclxuICAgIGNvbnN0IG1hcmtkb3duUGF0aCA9IGN1cnJlbnRQYXRoLmVuZHNXaXRoKCcvJylcclxuICAgICAgPyBjdXJyZW50UGF0aCArICdpbmRleC5tZCdcclxuICAgICAgOiBjdXJyZW50UGF0aCArICcvaW5kZXgubWQnO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBidXR0b24gdG8gc2hvdyBsb2FkaW5nIHN0YXRlXHJcbiAgICBidXR0b24uaW5uZXJIVE1MID1cclxuICAgICAgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBjbGFzcz1cIm1iLTEgbWUtMVwiPjxwYXRoIHN0cm9rZT1cIm5vbmVcIiBkPVwiTTAgMGgyNHYyNEgwelwiIGZpbGw9XCJub25lXCIvPjxwYXRoIGQ9XCJNMTIgNmwwIC0zXCIgLz48cGF0aCBkPVwiTTE2LjI1IDcuNzVsMi4xNSAtMi4xNVwiIC8+PHBhdGggZD1cIk0xOCAxMmwzIDBcIiAvPjxwYXRoIGQ9XCJNMTYuMjUgMTYuMjVsMi4xNSAyLjE1XCIgLz48cGF0aCBkPVwiTTEyIDE4bDAgM1wiIC8+PHBhdGggZD1cIk03Ljc1IDE2LjI1bC0yLjE1IDIuMTVcIiAvPjxwYXRoIGQ9XCJNNiAxMmwtMyAwXCIgLz48cGF0aCBkPVwiTTcuNzUgNy43NWwtMi4xNSAtMi4xNVwiIC8+PC9zdmc+IExvYWRpbmcuLi4nO1xyXG5cclxuICAgIC8vIEZldGNoIHRoZSBtYXJrZG93biBmaWxlIGZyb20gdGhlIHB1YmxpYyBkaXJlY3RvcnlcclxuICAgIGZldGNoKG1hcmtkb3duUGF0aClcclxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBIVFRQIGVycm9yISBzdGF0dXM6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UudGV4dCgpO1xyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigobWFya2Rvd24pID0+IHtcclxuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQobWFya2Rvd24pO1xyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9XHJcbiAgICAgICAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIGNsYXNzPVwibWItMSBtZS0xXCI+PHBhdGggc3Ryb2tlPVwibm9uZVwiIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIi8+PHBhdGggZD1cIk01IDEybDUgNWwxMCAtMTBcIiAvPjwvc3ZnPiBDb3BpZWQhJztcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPVxyXG4gICAgICAgICAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIGNsYXNzPVwibWItMSBtZS0xXCI+PHBhdGggc3Ryb2tlPVwibm9uZVwiIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIi8+PHBhdGggZD1cIk03IDkuNjY3YTIuNjY3IDIuNjY3IDAgMCAxIDIuNjY3IC0yLjY2N2g4LjY2NmEyLjY2NyAyLjY2NyAwIDAgMSAyLjY2NyAyLjY2N3Y4LjY2NmEyLjY2NyAyLjY2NyAwIDAgMSAtMi42NjcgMi42NjdoLTguNjY2YTIuNjY3IDIuNjY3IDAgMCAxIC0yLjY2NyAtMi42NjdsMCAtOC42NjZcIiAvPjxwYXRoIGQ9XCJNNC4wMTIgMTYuNzM3YTIuMDA1IDIuMDA1IDAgMCAxIC0xLjAxMiAtMS43Mzd2LTEwYzAgLTEuMSAuOSAtMiAyIC0yaDEwYy43NSAwIDEuMTU4IC4zODUgMS41IDFcIiAvPjwvc3ZnPiBDb3B5IE1hcmtkb3duJztcclxuICAgICAgICB9LCAyMDAwKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICBidXR0b24uaW5uZXJIVE1MID1cclxuICAgICAgICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgY2xhc3M9XCJtYi0xIG1lLTFcIj48cGF0aCBzdHJva2U9XCJub25lXCIgZD1cIk0wIDBoMjR2MjRIMHpcIiBmaWxsPVwibm9uZVwiLz48cGF0aCBkPVwiTTE4IDZsLTEyIDEyXCIgLz48cGF0aCBkPVwiTTYgNmwxMiAxMlwiIC8+PC9zdmc+IEVycm9yJztcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gY29weSBtYXJrZG93bjonLCBlcnIpO1xyXG5cclxuICAgICAgICAvLyBSZXNldCBidXR0b24gYWZ0ZXIgYSBkZWxheVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9XHJcbiAgICAgICAgICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgY2xhc3M9XCJtYi0xIG1lLTFcIj48cGF0aCBzdHJva2U9XCJub25lXCIgZD1cIk0wIDBoMjR2MjRIMHpcIiBmaWxsPVwibm9uZVwiLz48cGF0aCBkPVwiTTcgOS42NjdhMi42NjcgMi42NjcgMCAwIDEgMi42NjcgLTIuNjY3aDguNjY2YTIuNjY3IDIuNjY3IDAgMCAxIDIuNjY3IDIuNjY3djguNjY2YTIuNjY3IDIuNjY3IDAgMCAxIC0yLjY2NyAyLjY2N2gtOC42NjZhMi42NjcgMi42NjcgMCAwIDEgLTIuNjY3IC0yLjY2N2wwIC04LjY2NlwiIC8+PHBhdGggZD1cIk00LjAxMiAxNi43MzdhMi4wMDUgMi4wMDUgMCAwIDEgLTEuMDEyIC0xLjczN3YtMTBjMCAtMS4xIC45IC0yIDIgLTJoMTBjLjc1IDAgMS4xNTggLjM4NSAxLjUgMVwiIC8+PC9zdmc+IENvcHkgTWFya2Rvd24nO1xyXG4gICAgICAgIH0sIDIwMDApO1xyXG4gICAgICB9KTtcclxuICB9KTtcclxufVxyXG4iLCAiLy8gU291cmNlOiBodHRwczovL2dpdGh1Yi5jb20vZWxlY3RlcmlvdXMvYmFzaWNMaWdodGJveC9pc3N1ZXMvMTAjaXNzdWVjb21tZW50LTM0Njg5ODE0NlxyXG5pbXBvcnQgKiBhcyBiYXNpY0xpZ2h0Ym94IGZyb20gJ2Jhc2ljbGlnaHRib3gnO1xyXG5cclxuY29uc3QgaW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpZ2h0Ym94IGltZywgaW1nLmxpZ2h0Ym94Jyk7XHJcblxyXG5pbWFnZXMuZm9yRWFjaCgoaW1nKSA9PiB7XHJcbiAgY29uc3QgaHRtbCA9IGltZy5vdXRlckhUTUw7XHJcblxyXG4gIC8vIEZ1bmN0aW9uIHRvIGhhbmRsZSBlc2NhcGUga2V5XHJcbiAgY29uc3QgaGFuZGxlRXNjYXBlS2V5ID0gKGV2ZW50KSA9PiB7XHJcbiAgICBpZiAoZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xyXG4gICAgICBpbnN0YW5jZS5jbG9zZSgpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGluc3RhbmNlID0gYmFzaWNMaWdodGJveC5jcmVhdGUoaHRtbCwge1xyXG4gICAgb25TaG93OiAoKSA9PiB7XHJcbiAgICAgIC8vIEFkZCBlc2NhcGUga2V5IGxpc3RlbmVyIHdoZW4gbGlnaHRib3ggaXMgc2hvd25cclxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZUVzY2FwZUtleSk7XHJcbiAgICB9LFxyXG4gICAgb25DbG9zZTogKCkgPT4ge1xyXG4gICAgICAvLyBSZW1vdmUgZXNjYXBlIGtleSBsaXN0ZW5lciB3aGVuIGxpZ2h0Ym94IGlzIGNsb3NlZFxyXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlRXNjYXBlS2V5KTtcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIGltZy5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgaW5zdGFuY2Uuc2hvdygpO1xyXG4gIH07XHJcbn0pO1xyXG4iLCAiLy8gXHU1QjY2XHU0RTYwXHU0RUVBXHU4ODY4XHU3NkQ4XHVGRjFBXHU0RUZCXHU1MkExXHU1MkZFXHU5MDA5XHUzMDAxXHU4RkRCXHU1RUE2XHU2NzYxXHU0RTBFIGxvY2FsU3RvcmFnZSBcdTYzMDFcdTRFNDVcdTUzMTZcbi8vIFx1NjU3MFx1NjM2RVx1N0VEM1x1Njc4NFx1RkYxQXsgZG9uZTogeyBcImNoMDEtMFwiOiB0cnVlLCAuLi4gfSwgc2F2ZWRBdDogSVNPIFx1NjVGNlx1OTVGNCB9XG5cInVzZSBzdHJpY3RcIjtcblxuY29uc3QgU1RPUkFHRV9LRVkgPSBcImxlYXJuaW5nLWRhc2hib2FyZC12MVwiO1xuXG4vLyBcdTk5OTZcdTZCMjFcdThCQkZcdTk1RUVcdTc2ODRcdTUyMURcdTU5Q0JcdThGREJcdTVFQTZcdUZGMUFDaDAxIFx1NURGMlx1NUI4Q1x1NjIxMFx1RkYwOFx1NUJGOVx1NUU5NFx1MzAwQVN0YWdlIDEgXHU1QjY2XHU0RTYwXHU2MDNCXHU3RUQzXHUzMDBCXHVGRjA5XG5jb25zdCBTRUVEX0RPTkUgPSBbXCJjaDAxLTBcIiwgXCJjaDAxLTFcIiwgXCJjaDAxLTJcIiwgXCJjaDAxLTNcIiwgXCJjaDAxLTRcIl07XG5cbmZ1bmN0aW9uIGRlZmF1bHRTdGF0ZSgpIHtcbiAgY29uc3QgZG9uZSA9IHt9O1xuICBmb3IgKGNvbnN0IGtleSBvZiBTRUVEX0RPTkUpIGRvbmVba2V5XSA9IHRydWU7XG4gIHJldHVybiB7IGRvbmUsIHNhdmVkQXQ6IG51bGwgfTtcbn1cblxuZnVuY3Rpb24gbG9hZFN0YXRlKCkge1xuICB0cnkge1xuICAgIGNvbnN0IHJhdyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfS0VZKTtcbiAgICBpZiAoIXJhdykgcmV0dXJuIGRlZmF1bHRTdGF0ZSgpO1xuICAgIGNvbnN0IHBhcnNlZCA9IEpTT04ucGFyc2UocmF3KTtcbiAgICByZXR1cm4ge1xuICAgICAgZG9uZTogcGFyc2VkLmRvbmUgJiYgdHlwZW9mIHBhcnNlZC5kb25lID09PSBcIm9iamVjdFwiID8gcGFyc2VkLmRvbmUgOiB7fSxcbiAgICAgIHNhdmVkQXQ6IHBhcnNlZC5zYXZlZEF0IHx8IG51bGwsXG4gICAgfTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGRlZmF1bHRTdGF0ZSgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNhdmVTdGF0ZShzdGF0ZSkge1xuICBzdGF0ZS5zYXZlZEF0ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICB0cnkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZLCBKU09OLnN0cmluZ2lmeShzdGF0ZSkpO1xuICB9IGNhdGNoIHtcbiAgICAvKiBcdTk2OTBcdTc5QzFcdTZBMjFcdTVGMEZcdTdCNDlcdTU3M0FcdTY2NkZcdTRFMEJcdTUxOTlcdTUxNjVcdTU5MzFcdThEMjVcdUZGMENcdThGREJcdTVFQTZcdTRFQzVcdTU3MjhcdTVGNTNcdTUyNERcdTRGMUFcdThCRERcdTUxODVcdTc1MUZcdTY1NDggKi9cbiAgfVxufVxuXG5jb25zdCBzdGF0ZSA9IGxvYWRTdGF0ZSgpO1xuXG4vKiogXHU2MzA5IGxvY2FsU3RvcmFnZSBcdTU2REVcdTU4NkJcdTYyNDBcdTY3MDlcdTU5MERcdTkwMDlcdTY4NDZcdTc2ODRcdTUyRkVcdTkwMDlcdTcyQjZcdTYwMDEgKi9cbmZ1bmN0aW9uIGFwcGx5Q2hlY2tlZCgpIHtcbiAgZG9jdW1lbnRcbiAgICAucXVlcnlTZWxlY3RvckFsbChcIi5kYXNoLWNoZWNrbGlzdCBpbnB1dFt0eXBlPWNoZWNrYm94XVwiKVxuICAgIC5mb3JFYWNoKChjYikgPT4ge1xuICAgICAgY2IuY2hlY2tlZCA9IEJvb2xlYW4oc3RhdGUuZG9uZVtjYi5kYXRhc2V0LnRhc2tLZXldKTtcbiAgICB9KTtcbn1cblxuLyoqIFx1NTIzN1x1NjVCMFx1NjI0MFx1NjcwOVx1OEZEQlx1NUVBNlx1Njc2MVx1MzAwMVx1NUZCRFx1N0FFMFx1NEUwRVx1NUI4Q1x1NjIxMFx1NjAwMVx1RkYwOFx1OTk5Nlx1OTg3NVx1NTM2MVx1NzI0NyArIFx1N0FFMFx1ODI4Mlx1OTg3NVx1NTE4NVx1NUQ0Q1x1NkUwNVx1NTM1NVx1OTAxQVx1NzUyOFx1RkYwOSAqL1xuZnVuY3Rpb24gcmVmcmVzaCgpIHtcbiAgbGV0IG92ZXJhbGxEb25lID0gMDtcbiAgbGV0IG92ZXJhbGxUb3RhbCA9IDA7XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kYXNoLWNoZWNrbGlzdFwiKS5mb3JFYWNoKChsaXN0KSA9PiB7XG4gICAgY29uc3QgYm94ZXMgPSBsaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFt0eXBlPWNoZWNrYm94XVwiKTtcbiAgICBjb25zdCB0b3RhbCA9IGJveGVzLmxlbmd0aDtcbiAgICBsZXQgZG9uZSA9IDA7XG4gICAgYm94ZXMuZm9yRWFjaCgoYikgPT4ge1xuICAgICAgaWYgKGIuY2hlY2tlZCkgZG9uZSsrO1xuICAgIH0pO1xuICAgIG92ZXJhbGxEb25lICs9IGRvbmU7XG4gICAgb3ZlcmFsbFRvdGFsICs9IHRvdGFsO1xuXG4gICAgY29uc3QgY2FyZCA9IGxpc3QuY2xvc2VzdChcIi5kYXNoLWNhcmRcIik7XG4gICAgY29uc3Qgc2NvcGUgPSBjYXJkIHx8IGxpc3QucGFyZW50RWxlbWVudDtcbiAgICBjb25zdCBmaWxsID0gc2NvcGUgJiYgc2NvcGUucXVlcnlTZWxlY3RvcihcIi5kYXNoLXByb2dyZXNzLWZpbGxcIik7XG4gICAgaWYgKGZpbGwpIGZpbGwuc3R5bGUud2lkdGggPSBgJHt0b3RhbCA/IChkb25lIC8gdG90YWwpICogMTAwIDogMH0lYDtcblxuICAgIGlmIChjYXJkKSB7XG4gICAgICBjb25zdCBiYWRnZSA9IGNhcmQucXVlcnlTZWxlY3RvcihcIi5kYXNoLWNhcmQtYmFkZ2VcIik7XG4gICAgICBpZiAoYmFkZ2UpIGJhZGdlLnRleHRDb250ZW50ID0gYCR7ZG9uZX0vJHt0b3RhbH1gO1xuICAgICAgY2FyZC5jbGFzc0xpc3QudG9nZ2xlKFwiZGFzaC1jb21wbGV0ZVwiLCBkb25lID09PSB0b3RhbCk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBwY3QgPSBvdmVyYWxsVG90YWwgPyBNYXRoLnJvdW5kKChvdmVyYWxsRG9uZSAvIG92ZXJhbGxUb3RhbCkgKiAxMDApIDogMDtcbiAgY29uc3Qgb3ZlcmFsbEZpbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhc2hPdmVyYWxsRmlsbFwiKTtcbiAgaWYgKG92ZXJhbGxGaWxsKSB7XG4gICAgb3ZlcmFsbEZpbGwuc3R5bGUud2lkdGggPSBgJHtwY3R9JWA7XG4gICAgb3ZlcmFsbEZpbGwuY2xhc3NMaXN0LnRvZ2dsZShcImRhc2gtZG9uZVwiLCBwY3QgPT09IDEwMCk7XG4gICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFzaE92ZXJhbGxUZXh0XCIpO1xuICAgIGNvbnN0IHBjdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXNoT3ZlcmFsbFBjdFwiKTtcbiAgICBpZiAodGV4dCkgdGV4dC50ZXh0Q29udGVudCA9IGBcdTVERjJcdTVCOENcdTYyMTAgJHtvdmVyYWxsRG9uZX0gLyAke292ZXJhbGxUb3RhbH0gXHU0RTJBXHU0RUZCXHU1MkExYDtcbiAgICBpZiAocGN0RWwpIHBjdEVsLnRleHRDb250ZW50ID0gYCR7cGN0fSVgO1xuICB9XG5cbiAgY29uc3QgdXBkYXRlZEF0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXNoVXBkYXRlZEF0XCIpO1xuICBpZiAodXBkYXRlZEF0KSB7XG4gICAgdXBkYXRlZEF0LnRleHRDb250ZW50ID0gc3RhdGUuc2F2ZWRBdFxuICAgICAgPyBgXHU0RTBBXHU2QjIxXHU0RkREXHU1QjU4XHVGRjFBJHtuZXcgRGF0ZShzdGF0ZS5zYXZlZEF0KS50b0xvY2FsZVN0cmluZyhcInpoLUNOXCIsIHsgaG91cjEyOiBmYWxzZSB9KX1gXG4gICAgICA6IFwiXCI7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgYXBwbHlDaGVja2VkKCk7XG5cbiAgLy8gXHU1MkZFXHU5MDA5L1x1NTNENlx1NkQ4OFx1NEVGQlx1NTJBMVx1RkYxQVx1NTM3M1x1NjVGNlx1NEZERFx1NUI1OFx1NUU3Nlx1NTIzN1x1NjVCMFxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XG4gICAgY29uc3QgY2IgPSBlLnRhcmdldDtcbiAgICBpZiAoY2IudHlwZSAhPT0gXCJjaGVja2JveFwiIHx8ICFjYi5kYXRhc2V0LnRhc2tLZXkpIHJldHVybjtcbiAgICBpZiAoY2IuY2hlY2tlZCkgc3RhdGUuZG9uZVtjYi5kYXRhc2V0LnRhc2tLZXldID0gdHJ1ZTtcbiAgICBlbHNlIGRlbGV0ZSBzdGF0ZS5kb25lW2NiLmRhdGFzZXQudGFza0tleV07XG4gICAgc2F2ZVN0YXRlKHN0YXRlKTtcbiAgICByZWZyZXNoKCk7XG4gIH0pO1xuXG4gIC8vIFx1OTk5Nlx1OTg3NVx1NTM2MVx1NzI0N1x1NUM1NVx1NUYwMC9cdTY1MzZcdThENzdcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgY29uc3QgaGVhZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIuZGFzaC1jYXJkLWhlYWRcIik7XG4gICAgaWYgKCFoZWFkKSByZXR1cm47XG4gICAgY29uc3QgY2FyZCA9IGhlYWQuY2xvc2VzdChcIi5kYXNoLWNhcmRcIik7XG4gICAgaWYgKCFjYXJkKSByZXR1cm47XG4gICAgY29uc3Qgb3BlbiA9IGNhcmQuY2xhc3NMaXN0LnRvZ2dsZShcIm9wZW5cIik7XG4gICAgaGVhZC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIFN0cmluZyhvcGVuKSk7XG4gIH0pO1xuXG4gIC8vIFx1OTFDRFx1N0Y2RVx1OEZEQlx1NUVBNlxuICBjb25zdCByZXNldEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFzaFJlc2V0XCIpO1xuICBpZiAocmVzZXRCdG4pIHtcbiAgICByZXNldEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaWYgKCF3aW5kb3cuY29uZmlybShcIlx1Nzg2RVx1NUI5QVx1ODk4MVx1OTFDRFx1N0Y2RVx1NTE2OFx1OTBFOFx1OEZEQlx1NUVBNlx1NTQxN1x1RkYxRlx1NkI2NFx1NjRDRFx1NEY1Q1x1NEUwRFx1NTNFRlx1NjRBNFx1OTUwMFx1MzAwMlwiKSkgcmV0dXJuO1xuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oU1RPUkFHRV9LRVkpO1xuICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gXHU5RUQ4XHU4QkE0XHU1QzU1XHU1RjAwXHU3QjJDXHU0RTAwXHU0RTJBXHU2NzJBXHU1QjhDXHU2MjEwXHU3Njg0XHU3QUUwXHU4MjgyXHU1MzYxXHU3MjQ3XG4gIGNvbnN0IGZpcnN0T3BlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGFzaC1jYXJkOm5vdCguZGFzaC1jb21wbGV0ZSlcIik7XG4gIGlmIChmaXJzdE9wZW4pIHtcbiAgICBmaXJzdE9wZW4uY2xhc3NMaXN0LmFkZChcIm9wZW5cIik7XG4gICAgY29uc3QgaGVhZCA9IGZpcnN0T3Blbi5xdWVyeVNlbGVjdG9yKFwiLmRhc2gtY2FyZC1oZWFkXCIpO1xuICAgIGlmIChoZWFkKSBoZWFkLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJ0cnVlXCIpO1xuICB9XG5cbiAgcmVmcmVzaCgpO1xufVxuXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJsb2FkaW5nXCIpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaW5pdCk7XG59IGVsc2Uge1xuICBpbml0KCk7XG59XG4i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QUNaLGVBQVMsaUJBQWlCLFNBQVMsTUFBTTtBQUN2QyxZQUFJLENBQUMsT0FBTyxRQUFRLG9IQUFxQixFQUFHO0FBQzVDLHFCQUFhLFdBQVcsV0FBVztBQUNuQyxlQUFPLFNBQVMsT0FBTztBQUFBLE1BQ3pCLENBQUM7QUFBQSxJQUNIO0FBR0EsVUFBTSxZQUFZLFNBQVMsY0FBYyxnQ0FBZ0M7QUFDekUsUUFBSSxXQUFXO0FBQ2IsZ0JBQVUsVUFBVSxJQUFJLE1BQU07QUFDOUIsWUFBTSxPQUFPLFVBQVUsY0FBYyxpQkFBaUI7QUFDdEQsVUFBSSxLQUFNLE1BQUssYUFBYSxpQkFBaUIsTUFBTTtBQUFBLElBQ3JEO0FBRUEsWUFBUTtBQUFBLEVBQ1Y7QUFFQSxNQUFJLFNBQVMsZUFBZSxXQUFXO0FBQ3JDLGFBQVMsaUJBQWlCLG9CQUFvQixJQUFJO0FBQUEsRUFDcEQsT0FBTztBQUNMLFNBQUs7QUFBQSxFQUNQOyIsCiAgIm5hbWVzIjogWyJ3aW5kb3ciLCAibGF6eVNpemVzIiwgImwiLCAiZG9jdW1lbnQiLCAiRGF0ZSIsICJzZXRUaW1lb3V0IiwgInJlcXVlc3RBbmltYXRpb25GcmFtZSIsICJlIiwgImkiLCAibG9hZE1vZGUiLCAiaW5pdCIsICJ3aW5kb3ciLCAiZG9jdW1lbnQiLCAibGF6eVNpemVzIiwgImUiLCAiX193ZWJwYWNrX3JlcXVpcmVfXyIsICJDbGlwYm9hcmRBY3Rpb25DdXQiLCAiZmFrZUNvcHlBY3Rpb24iLCAiQ2xpcGJvYXJkQWN0aW9uQ29weSIsICJfdHlwZW9mIiwgIm9iaiIsICJDbGlwYm9hcmRBY3Rpb25EZWZhdWx0IiwgImkiLCAibyIsICJfc2V0UHJvdG90eXBlT2YiLCAicCIsICJzZWxmIiwgImUiLCAiX2dldFByb3RvdHlwZU9mIiwgIkNsaXBib2FyZCIsICJhY3Rpb24iLCAibW9kdWxlIiwgImV4cG9ydHMiLCAiZSIsICJuIiwgInQiLCAibyIsICJyIiwgImMiLCAidSIsICJzIiwgImkiLCAiYSIsICJsIiwgImUiLCAiciIsICJuIiwgInQiLCAibyIsICJsIiwgImYiLCAiaSIsICJ1IiwgImEiLCAiZCIsICJjIiwgInMiLCAibGF6eVNpemVzIiwgImkiLCAiQ2xpcGJvYXJkIiwgImUiLCAiaSIsICJlIiwgImUiLCAiZSIsICJzdGF0ZSJdCn0K
