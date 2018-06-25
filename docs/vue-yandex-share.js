(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.vueYandexShare = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
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

  var Script =
  /*#__PURE__*/
  function () {
    function Script() {
      _classCallCheck(this, Script);

      // Script is attached
      this.attached = false; // Script is loaded

      this.loaded = false; // Error while loading script

      this.error = false; // Callbacks stack from moment when script attached, but not loaded

      this.stack = [];
    }
    /**
     * Attach script. Returns promise to know when it will loaded.
     * @return {Promise}
     */


    _createClass(Script, [{
      key: "attach",
      value: function attach() {
        var _this = this;

        return new Promise(function (resolve, reject) {
          if (!_this.attached) {
            var script = document.createElement('script');
            script.setAttribute('src', 'https://yastatic.net/share2/share.js');
            script.setAttribute('async', '');
            document.head.appendChild(script);

            script.onload = function () {
              resolve();
              _this.loaded = true;

              _this.stack.forEach(function (cb) {
                cb[0]();
              });

              _this.stack = [];
            };

            script.onerror = function () {
              reject();
              _this.loaded = true;
              _this.error = true;

              _this.stack.forEach(function (cb) {
                cb[1]();
              });

              _this.stack = [];
            };

            _this.attached = true;
          }

          if (_this.error) {
            reject();
          }

          if (_this.loaded) {
            resolve();
          } else {
            _this.stack.push([resolve, reject]);
          }
        });
      }
    }]);

    return Script;
  }();

  var Script$1 = new Script();

  var YandexShare = {
    name: 'YandexShare',
    props: {
      services: {
        type: Array,
        required: true
      },
      counter: {
        type: Boolean,
        default: false
      },
      url: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      },
      image: {
        type: String,
        default: undefined
      },
      contentByService: {
        type: Object,
        default: function _default() {
          return {};
        }
      },
      vertical: {
        type: Boolean,
        default: false
      },
      small: {
        type: Boolean,
        default: false
      },
      lang: {
        type: String,
        default: 'ru'
      },
      limit: {
        type: Number,
        default: undefined
      },
      bare: {
        type: Boolean,
        default: false
      },
      copy: {
        type: String,
        default: 'last'
      },
      popupTop: {
        type: Boolean,
        default: false
      },
      popupOuter: {
        type: Boolean,
        default: false
      }
    },
    mounted: function mounted() {
      var _this = this;

      Script$1.attach().then(function () {
        window.Ya.share2(_this.$el, {
          content: {
            url: _this.url || window.location.href,
            title: _this.title || document.title,
            description: _this.description,
            image: _this.image
          },
          contentByService: _this.contentByService,
          theme: {
            bare: _this.bare,
            copy: _this.copy,
            counter: _this.counter,
            direction: _this.vertical ? 'vertical' : 'horizontal',
            lang: _this.lang,
            limit: _this.limit,
            popupDirection: _this.popupTop ? 'top' : 'bottom',
            popupPosition: _this.popupOuter ? 'outer' : 'inner',
            services: _this.services.join(','),
            size: _this.small ? 's' : 'm'
          },
          hooks: {
            onready: function onready() {
              _this.$emit('ready');
            },
            onshare: function onshare(name) {
              _this.$emit('share', name);
            }
          }
        });
      });
    },
    render: function render(h) {
      return h('div');
    }
  };

  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component('yandex-share', YandexShare);
  }

  return YandexShare;

})));
