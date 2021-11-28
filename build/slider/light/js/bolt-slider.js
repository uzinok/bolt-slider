"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*! https://github.com/uzinok/bolt-slider */
var boltSlider = /*#__PURE__*/function () {
  function boltSlider(options) {
    _classCallCheck(this, boltSlider);

    if (!options) {
      return console.warn('Not slider options');
    }

    ;

    if (!options.slider) {
      return console.warn('Not slider');
    }

    ; // user options

    this.slider = options.slider;
    this.slideAria = options.slideAria || 'of';
    this.roledescription = options.roledescription || 'carousel';
    this.slideRoledescription = options.slideRoledescription || 'slide';
    this.gap = options.gap || 0;
    this.countVisible = options.countVisible || 0;
    this.speed = options.speed || 300;
    this.sliderPrew = options.sliderPrew || false;
    this.sliderNext = options.sliderNext || false;
    this.paginationWrap = options.paginationWrap || false;
    this.paginationTag = options.paginationTag || 'span';
    this.paginationClass = options.paginationClass || 'bolt-slider__paginaton-btn';
    this.paginationAria = options.paginationAria || 'Go to slide'; // slider options

    this.width = 0;
    this.sliderList = this.slider.querySelector('.bolt-slider__list');
    this.sliderListWrap = this.slider.querySelector('.bolt-slider__list-wrap');
    this.sliderItem = this.sliderList.querySelectorAll('.bolt-slider__item');
    this.slide = this.sliderList.querySelectorAll('.bolt-slider__content');
    this.slideLength = this.sliderItem.length;
    this.paginations = [];
    this.removeActive = false; // init slider

    this.sliderInit(); // касание

    this.startClientX = 0;
    this.touchMove = 0;
    this.touthMove();
  }

  _createClass(boltSlider, [{
    key: "sliderInit",
    value: function sliderInit() {
      var _this = this;

      this.slider.classList.remove('bolt-no-js');
      this.slider.setAttribute('aria-roledescription', this.roledescription);

      for (var i = 0; i < this.slideLength; i++) {
        this.sliderItem[i].ariaLive = 'off';
        this.sliderItem[i].setAttribute('aria-roledescription', this.slideRoledescription);
        this.sliderItem[i].setAttribute('tabindex', -1);
      }

      this.setSliderSize();
      window.addEventListener('resize', function () {
        _this.setSliderSize(); // ставим слайдер на нужный слайд


        _this.sliderDraw();
      }); // подготовка к движению слайдера

      this.sliderToggle(); // ставим слайдер на нужный слайд

      this.sliderDraw();
      this.keyupDraw();
    }
  }, {
    key: "setSliderSize",
    value: function setSliderSize() {
      var _this2 = this;

      this.width = this.slider.offsetWidth;
      this.sliderList.style.width = this.width * this.slideLength + this.gap * this.slideLength + 'px';
      this.sliderList.style.height = this.sliderItem[this.countVisible].querySelector('.bolt-slider__content').offsetHeight + 'px';
      this.sliderItem.forEach(function (item) {
        item.style.width = _this2.width + 'px';

        if (_this2.gap) {
          item.style.marginRight = _this2.gap + 'px';
        }
      });
    } // подготовка к движению слайдера

  }, {
    key: "sliderToggle",
    value: function sliderToggle() {
      var _this3 = this;

      if (this.sliderPrew) {
        this.sliderPrew.addEventListener('click', function () {
          _this3.countVisible--;

          if (_this3.countVisible < 0) {
            return _this3.countVisible = 0;
          }

          _this3.sliderAnimation();
        });
      }

      if (this.sliderNext) {
        this.sliderNext.addEventListener('click', function () {
          _this3.countVisible++;

          if (_this3.countVisible >= _this3.slideLength) {
            return _this3.countVisible = _this3.slideLength - 1;
          }

          _this3.sliderAnimation();
        });
      }

      if (this.paginationWrap) {
        this.setPagination();
      }
    }
  }, {
    key: "setPagination",
    value: function setPagination() {
      var _this4 = this;

      var _loop = function _loop(i) {
        var btn = document.createElement(_this4.paginationTag);
        btn.classList.add(_this4.paginationClass);

        _this4.paginationWrap.append(btn);

        if (_this4.paginationTag == 'button') {
          btn.dataset.count = i;
          btn.ariaLabel = _this4.paginationAria + ' ' + (i + 1) + '.';
          btn.addEventListener('click', function () {
            _this4.countVisible = i;

            _this4.sliderAnimation();
          });
        }

        _this4.paginations.push(btn);
      };

      for (var i = 0; i < this.slideLength; i++) {
        _loop(i);
      }
    } // Движение слайдера

  }, {
    key: "sliderDraw",
    value: function sliderDraw() {
      var _this5 = this;

      this.sliderList.style.transform = "translateX(-".concat(this.countVisible * this.width + this.gap * this.countVisible, "px)"); // навигация

      if (this.sliderPrew.disabled == true) {
        this.sliderPrew.disabled = false;
      }

      if (this.sliderPrew && this.countVisible <= 0) {
        this.sliderPrew.disabled = true;
      }

      if (this.sliderNext.disabled == true) {
        this.sliderNext.disabled = false;
      }

      if (this.sliderNext && this.countVisible >= this.slideLength - 1) {
        this.sliderNext.disabled = true;
      } // пагинация


      if (this.paginationTag == 'button') {
        if (this.paginationWrap && this.paginationWrap.querySelector(':disabled')) {
          this.paginationWrap.querySelector(':disabled').disabled = false;
        }

        this.paginations[this.countVisible].disabled = true;
      }

      if (this.paginationWrap) {
        if (this.paginationWrap.querySelector('.' + this.paginationClass + '--active')) {
          this.paginationWrap.querySelector('.' + this.paginationClass + '--active').classList.remove(this.paginationClass + '--active');
        }

        this.paginations[this.countVisible].classList.add(this.paginationClass + '--active');
      } // слайды


      if (this.sliderList.querySelector('.bolt-slider__item--active')) {
        this.removeActive = this.sliderList.querySelector('.bolt-slider__item--active');
        if (this.removeActive == this.sliderList.querySelectorAll('.bolt-slider__item')[this.countVisible]) return;
        this.removeActive.ariaLive = 'off';
        this.removeActive.setAttribute('tabindex', -1);
      }

      this.sliderItem.forEach(function (slide) {
        slide.classList.add('bolt-slider__item--active');
      });
      setTimeout(function () {
        if (_this5.removeActive) {
          _this5.removeActive.classList.remove('bolt-slider__item--active');
        }

        _this5.sliderItem.forEach(function (slide) {
          slide.classList.remove('bolt-slider__item--active');
        });

        _this5.removeActive = false;

        _this5.sliderItem[_this5.countVisible].classList.add('bolt-slider__item--active');
      }, this.speed);
      this.sliderItem[this.countVisible].ariaLive = 'polite';
      this.sliderItem[this.countVisible].setAttribute('tabindex', 0);
      this.sliderList.style.height = this.sliderItem[this.countVisible].querySelector('.bolt-slider__content').offsetHeight + 'px';
    } // клавиатура

  }, {
    key: "keyupDraw",
    value: function keyupDraw() {
      var _this6 = this;

      this.sliderList.addEventListener('keyup', function (e) {
        if (e.key == 'ArrowLeft') {
          e.preventDefault();
          _this6.countVisible--;

          if (_this6.countVisible < 0) {
            _this6.sliderPrew.disabled = true;
            return _this6.countVisible = 0;
          }

          _this6.sliderAnimation();

          setTimeout(function () {
            _this6.sliderItem[_this6.countVisible].focus();
          }, _this6.speed);
        }

        if (e.key == 'ArrowRight') {
          _this6.countVisible++;

          if (_this6.countVisible > _this6.slideLength - 1) {
            _this6.sliderNext.disabled = true;
            _this6.countVisible = _this6.slideLength - 1;
            return;
          }

          _this6.sliderAnimation();

          setTimeout(function () {
            _this6.sliderItem[_this6.countVisible].focus();
          }, _this6.speed);
        }

        console.log(_this6.countVisible);
      }, {
        passive: false
      });
    } // движение слайдера с анимацией

  }, {
    key: "sliderAnimation",
    value: function sliderAnimation() {
      var _this7 = this;

      this.sliderList.style.transition = "transform ".concat(this.speed, "ms ease-in-out, height ").concat(this.speed, "ms ease-in-out");
      this.sliderDraw();
      setTimeout(function () {
        _this7.sliderList.style.transition = "transform 0ms ease-in-out, height 0ms ease-in-out";
      }, this.speed);
    } // касание

  }, {
    key: "touthMove",
    value: function touthMove() {
      var _this8 = this;

      this.sliderList.addEventListener("touchstart", function (e) {
        _this8.startClientX = e.touches[0].clientX;
      });
      this.sliderList.addEventListener("touchmove", function (e) {
        _this8.sliderItem.forEach(function (slide) {
          slide.classList.add('bolt-slider__item--active');
        });

        _this8.touchMove = _this8.startClientX - e.touches[0].clientX;

        if (_this8.countVisible * _this8.width + _this8.gap * _this8.countVisible + _this8.touchMove >= 0) {
          if (_this8.countVisible * _this8.width + _this8.gap * _this8.countVisible + _this8.touchMove <= _this8.width * (_this8.slideLength - 1) + _this8.gap * (_this8.slideLength - 1)) {
            _this8.sliderList.style.transform = "translateX(-".concat(_this8.countVisible * _this8.width + _this8.gap * _this8.countVisible + _this8.touchMove, "px)");
          }
        }
      });
      this.sliderList.addEventListener("touchend", function (e) {
        if (_this8.touchMove < 30 && _this8.touchMove > -30) {
          return _this8.sliderAnimation();
        }

        if (_this8.touchMove > 0) {
          _this8.countVisible++;

          if (_this8.countVisible >= _this8.slideLength - 1) {
            _this8.countVisible = _this8.slideLength - 1;
          }

          _this8.sliderAnimation();
        }

        if (_this8.touchMove < 0) {
          _this8.countVisible--;

          if (_this8.countVisible < 0) {
            _this8.countVisible = 0;
          }

          _this8.sliderAnimation();
        }

        _this8.touchMove = 0;
      });
    }
  }]);

  return boltSlider;
}();