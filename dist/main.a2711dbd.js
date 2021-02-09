// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $(".siteList");
var $last = $siteList.find("li.lastItem");
var hashMap = JSON.parse(localStorage.getItem("webStr")) || [{
  url: "https://github.com/",
  logoType: "text"
}, {
  url: "https://www.bilibili.com/",
  logoType: "img",
  logoSrc: "../img/bilibili.png"
}, {
  url: "https://www.acfun.cn/",
  logoType: "text"
}];
render();
$("#addButton").on("click", function () {
  var url = window.prompt("请输入您要添加的网址："); // 弹窗

  url = url.indexOf("http") !== 0 ? "https://" + url : url;
  websiteName = getWebName(url);
  hashMap.push({
    url: url,
    logoType: "text"
  });
  render();
  saveWebList();
});
$(".del").on("click", function (e) {
  var parentNode = e.currentTarget.parentNode;
  var grandNode = parentNode.parentNode;
  var index = childrenIndex(parentNode, grandNode);
  hashMap.splice(index, 1);
  render();
  saveWebList();
}); // 页面离开时执行函数
// window.onbeforeunload = () => {
//   saveWebList();
// };
// 监听键盘自动打开首字母对应按键的网站

$(document).on("keypress", function (e) {
  for (var i = 0; i < hashMap.length; i++) {
    if (e.key === getWebName(hashMap[i].url)[0]) {
      window.open(hashMap[i].url);
      break;
    }
  }
});

function getWebName(url) {
  var name = url.indexOf("http") !== 0 ? "https://" + url : url;
  var nameFlag = name.split("//")[1].split(".");
  var websiteName = nameFlag[0] === "www" ? nameFlag[1] : nameFlag[0];
  return websiteName;
}

function render() {
  $siteList.find("li:not(.lastItem)").remove();
  hashMap.forEach(function (node) {
    var websiteName = getWebName(node.url);
    var logo = node.logoType === "img" ? "<img src=".concat(node.logoSrc, " />") : websiteName[0].toUpperCase();
    var $li = $("<li>\n          <button class=\"del\">\n            <svg class=\"icon\">\n              <use xlink:href=\"#icon-close\"></use>\n            </svg> \n          </button>\n          <a href=\"".concat(node.url, "\">\n            <div class=\"site\">\n              <div class=\"logo\">").concat(logo, "</div>\n              <div class=\"link\">").concat(websiteName, "</div>\n            </div>\n          </a>\n        </li>")).insertBefore($last);
  });
}

function childrenIndex(node, parentNode) {
  var i = 0;
  var children = parentNode.children;

  while (i < children.length) {
    if (node === children[i]) return i;
    i++;
  }

  return -1;
}

function saveWebList() {
  var webStr = JSON.stringify(hashMap);
  localStorage.setItem("webStr", webStr);
}
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.a2711dbd.js.map