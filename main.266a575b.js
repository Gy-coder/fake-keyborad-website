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
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var $ = function $(s) {
  return document.querySelector(s);
};

var $$ = function $$(s) {
  return document.querySelectorAll(s);
};

var Keyboard = /*#__PURE__*/function () {
  function Keyboard($input) {
    _classCallCheck(this, Keyboard);

    this.$input = $input;
    this.text = '';
    this.init();
    this.bind();
  }

  _createClass(Keyboard, [{
    key: "setPage",
    value: function setPage(name) {
      this.$keyboard.querySelectorAll('.page').forEach(function ($page) {
        return $page.style.display = 'none';
      });
      this.$keyboard.querySelector('.page-' + name).style.display = 'block';
    }
  }, {
    key: "bind",
    value: function bind() {
      var self = this;

      this.$input.onclick = function (e) {
        console.log($$("fake-input"));
        this.classList.add('focus');
        self.$keyboard.classList.add('show');
        e.stopPropagation();
      };

      document.addEventListener('click', function () {
        self.$input.classList.remove('focus');
        self.$keyboard.classList.remove('show');
      });

      this.$keyboard.onclick = function (e) {
        e.stopPropagation();
      };

      this.$keyboard.querySelectorAll('.row > span').forEach(function ($key) {
        $key.onmousedown = function (e) {
          $key.classList.add('active');
        };

        $key.onmouseup = function (e) {
          $key.classList.remove('active');
        };

        $key.onclick = function (e) {
          var type = this.dataset.type;

          switch (type) {
            case 'char':
              self.text += this.innerText;
              self.$input.innerText = self.text;
              break;

            case 'uppercase':
              self.setPage('uppercase');
              break;

            case 'lowercase':
              self.setPage('lowercase');
              break;

            case 'number':
              self.setPage('number');
              break;

            case 'symbol':
              self.setPage('symbol');
              break;

            case 'backspace':
              self.text = self.text.substr(0, self.text.length - 1);
              self.$input.innerText = self.text;
              break;

            case 'space':
              self.text += ' ';
              self.$input.innerText = self.text;
              break;

            case 'return':
              self.text += '\n';
              self.$input.innerText = self.text;
              break;
          }
        };
      });
    }
  }, {
    key: "init",
    value: function init() {
      var $keyboard = document.createElement('div');
      $keyboard.classList.add('keyboard');
      $keyboard.innerHTML = "\n<div class=\"page page-lowercase\">\n<div class=\"row\">\n<span data-type=\"char\" class=\"col-2\">q</span>\n<span data-type=\"char\" class=\"col-2\">w</span>\n<span data-type=\"char\" class=\"col-2\">e</span>\n<span data-type=\"char\" class=\"col-2\">r</span>\n<span data-type=\"char\" class=\"col-2\">t</span>\n<span data-type=\"char\" class=\"col-2\">y</span>\n<span data-type=\"char\" class=\"col-2\">u</span>\n<span data-type=\"char\" class=\"col-2\">i</span>\n<span data-type=\"char\" class=\"col-2\">o</span>\n<span data-type=\"char\" class=\"col-2\">p</span>\n</div>\n<div class=\"row\">\n<span data-type=\"char\" class=\"col-2 offset-1\">a</span>\n<span data-type=\"char\" class=\"col-2\">s</span>\n<span data-type=\"char\" class=\"col-2\">d</span>\n<span data-type=\"char\" class=\"col-2\">f</span>\n<span data-type=\"char\" class=\"col-2\">g</span>\n<span data-type=\"char\" class=\"col-2\">h</span>\n<span data-type=\"char\" class=\"col-2\">j</span>\n<span data-type=\"char\" class=\"col-2\">k</span>\n<span data-type=\"char\" class=\"col-2\">l</span>\n</div>\n<div class=\"row\">\n<span data-type=\"uppercase\" class=\"col-3\">caps lock</span>\n<span data-type=\"char\" class=\"col-2\">z</span>\n<span data-type=\"char\" class=\"col-2\">x</span>\n<span data-type=\"char\" class=\"col-2\">c</span>\n<span data-type=\"char\" class=\"col-2\">v</span>\n<span data-type=\"char\" class=\"col-2\">b</span>\n<span data-type=\"char\" class=\"col-2\">n</span>\n<span data-type=\"char\" class=\"col-2\">m</span>\n<span data-type=\"backspace\" class=\"col-3 \">delete</span>\n</div>\n<div class=\"row\">\n<span data-type=\"number\" class=\"col-4\">123</span>\n<span data-type=\"space\" class=\"col-12\">space</span>\n<span data-type=\"return\" class=\"col-4\">return</span>\n</div>\n</div>\n<div class=\"page page-number\">\n<div class=\"row\">\n<span data-type=\"char\" class=\"col-2\">1</span>\n<span data-type=\"char\" class=\"col-2\">2</span>\n<span data-type=\"char\" class=\"col-2\">3</span>\n<span data-type=\"char\" class=\"col-2\">4</span>\n<span data-type=\"char\" class=\"col-2\">5</span>\n<span data-type=\"char\" class=\"col-2\">6</span>\n<span data-type=\"char\" class=\"col-2\">7</span>\n<span data-type=\"char\" class=\"col-2\">8</span>\n<span data-type=\"char\" class=\"col-2\">9</span>\n<span data-type=\"char\" class=\"col-2\">0</span>\n</div>\n<div class=\"row\">\n<span data-type=\"char\" class=\"col-2 offset-1\">-</span>\n<span data-type=\"char\" class=\"col-2\">/</span>\n<span data-type=\"char\" class=\"col-2\">:</span>\n<span data-type=\"char\" class=\"col-2\">;</span>\n<span data-type=\"char\" class=\"col-2\">(</span>\n<span data-type=\"char\" class=\"col-2\">)</span>\n<span data-type=\"char\" class=\"col-2\">$</span>\n<span data-type=\"char\" class=\"col-2\">&</span>\n<span data-type=\"char\" class=\"col-2\">@</span>\n</div>\n<div class=\"row\">\n<span data-type=\"symbol\" class=\"col-3\">#+=</span>\n<span data-type=\"char\" class=\"col-2\">.</span>\n<span data-type=\"char\" class=\"col-2\">,</span>\n<span data-type=\"char\" class=\"col-2\">?</span>\n<span data-type=\"char\" class=\"col-2\">!</span>\n<span data-type=\"char\" class=\"col-2\">'</span>\n<span data-type=\"char\" class=\"col-2\">\"</span>\n<span data-type=\"char\" class=\"col-2\">`</span>\n<span data-type=\"backspace\" class=\"col-3\">delete</span>\n</div>\n<div class=\"row\">\n<span data-type=\"lowercase\" class=\"col-4\">ABC</span>\n<span data-type=\"space\" class=\"col-12\">space</span>\n<span data-type=\"return\" class=\"col-4\">return</span>\n</div>\n</div>\n<div class=\"page page-symbol\">\n<div class=\"row\">\n<span data-type=\"char\" class=\"col-2\">[</span>\n<span data-type=\"char\" class=\"col-2\">]</span>\n<span data-type=\"char\" class=\"col-2\">{</span>\n<span data-type=\"char\" class=\"col-2\">}</span>\n<span data-type=\"char\" class=\"col-2\">#</span>\n<span data-type=\"char\" class=\"col-2\">%</span>\n<span data-type=\"char\" class=\"col-2\">^</span>\n<span data-type=\"char\" class=\"col-2\">*</span>\n<span data-type=\"char\" class=\"col-2\">+</span>\n<span data-type=\"char\" class=\"col-2\">=</span>\n</div>\n<div class=\"row\">\n<span data-type=\"char\" class=\"col-2 offset-1\">_</span>\n<span data-type=\"char\" class=\"col-2\"></span>\n<span data-type=\"char\" class=\"col-2\">|</span>\n<span data-type=\"char\" class=\"col-2\">~</span>\n<span data-type=\"char\" class=\"col-2\"><</span>\n<span data-type=\"char\" class=\"col-2\">></span>\n<span data-type=\"char\" class=\"col-2\">\xA5</span>\n<span data-type=\"char\" class=\"col-2\">\u20AC</span>\n<span data-type=\"char\" class=\"col-2\">\uFFE1</span>\n</div>\n<div class=\"row\">\n<span data-type=\"number\" class=\"col-3\">123</span>\n<span data-type=\"char\" class=\"col-2\">.</span>\n<span data-type=\"char\" class=\"col-2\">,</span>\n<span data-type=\"char\" class=\"col-2\">?</span>\n<span data-type=\"char\" class=\"col-2\">!</span>\n<span data-type=\"char\" class=\"col-2\">'</span>\n<span data-type=\"char\" class=\"col-2\">\"</span>\n<span data-type=\"char\" class=\"col-2\">`</span>\n<span data-type=\"backspace\" class=\"col-3\">delete</span>\n</div>\n<div class=\"row\">\n<span data-type=\"lowercase\" class=\"col-4\">ABC</span>\n<span data-type=\"space\" class=\"col-12\">space</span>\n<span data-type=\"return\" class=\"col-4\">return</span>\n</div>\n</div>\n<div class=\"page page-uppercase\">\n<div class=\"row\">\n<span data-type=\"char\" class=\"col-2\">Q</span>\n<span data-type=\"char\" class=\"col-2\">W</span>\n<span data-type=\"char\" class=\"col-2\">E</span>\n<span data-type=\"char\" class=\"col-2\">R</span>\n<span data-type=\"char\" class=\"col-2\">T</span>\n<span data-type=\"char\" class=\"col-2\">Y</span>\n<span data-type=\"char\" class=\"col-2\">U</span>\n<span data-type=\"char\" class=\"col-2\">I</span>\n<span data-type=\"char\" class=\"col-2\">O</span>\n<span data-type=\"char\" class=\"col-2\">P</span>\n</div>\n<div class=\"row\">\n<span data-type=\"char\" class=\"col-2 offset-1\">A</span>\n<span data-type=\"char\" class=\"col-2\">S</span>\n<span data-type=\"char\" class=\"col-2\">D</span>\n<span data-type=\"char\" class=\"col-2\">F</span>\n<span data-type=\"char\" class=\"col-2\">G</span>\n<span data-type=\"char\" class=\"col-2\">H</span>\n<span data-type=\"char\" class=\"col-2\">J</span>\n<span data-type=\"char\" class=\"col-2\">K</span>\n<span data-type=\"char\" class=\"col-2\">L</span>\n</div>\n<div class=\"row\">\n<span data-type=\"lowercase\" class=\"col-3\">caps lock</span>\n<span data-type=\"char\" class=\"col-2\">Z</span>\n<span data-type=\"char\" class=\"col-2\">X</span>\n<span data-type=\"char\" class=\"col-2\">C</span>\n<span data-type=\"char\" class=\"col-2\">V</span>\n<span data-type=\"char\" class=\"col-2\">B</span>\n<span data-type=\"char\" class=\"col-2\">N</span>\n<span data-type=\"char\" class=\"col-2\">M</span>\n<span data-type=\"backspace\" class=\"col-3\">delete</span>\n</div>\n<div class=\"row\">\n<span data-type=\"number\" class=\"col-4\">123</span>\n<span data-type=\"space\" class=\"col-12\">space</span>\n<span data-type=\"return\" class=\"col-4\">return</span>\n</div>\n</div> \n";
      document.body.appendChild($keyboard);
      this.$keyboard = $keyboard;
    }
  }]);

  return Keyboard;
}();

$$('.input').forEach(function ($input) {
  return new Keyboard($input);
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.266a575b.js.map