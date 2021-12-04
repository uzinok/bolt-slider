"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*! https://github.com/uzinok/bolt-slider */
var boltSlider = /*#__PURE__*/function () {
  function boltSlider(options) {
    _classCallCheck(this, boltSlider);

    var _ = this; // errors user options


    if (!options) {
      return console.warn('Not slider options');
    }

    ;

    if (!document.querySelector(options.slider)) {
      return console.warn('Not slider');
    }

    ;

    if (options.sliderPrew && !document.querySelector(options.sliderPrew)) {
      console.warn('Not options sliderPrew');
      options.sliderPrew = false;
    }

    if (options.sliderNext && !document.querySelector(options.sliderNext)) {
      console.warn('Not options sliderNext');
      options.sliderNext = false;
    }

    if (options.paginationWrap && !document.querySelector(options.paginationWrap)) {
      console.warn('Not options paginationWrap');
      options.paginationWrap = false;
    } // user options


    _.slider = document.querySelector(options.slider);
    _.slideAria = options.slideAria || 'of';
    _.roledescription = options.roledescription || 'carousel';
    _.slideRoledescription = options.slideRoledescription || 'slide';
    _.gap = options.gap || 0;
    _.currentSlide = options.currentSlide || 0;
    _.speed = options.speed || 300;
    _.autoPlay = options.autoPlay || false;
    _.sliderPrew = options.sliderPrew || false;
    _.sliderNext = options.sliderNext || false;
    _.paginationWrap = options.paginationWrap || false;
    _.paginationTag = options.paginationTag || 'span';
    _.paginationClass = options.paginationClass || 'bolt-slider__paginaton-btn';
    _.paginationAria = options.paginationAria || 'Go to slide'; // errors slider options

    if (!_.slider.querySelector('.bolt-slider__list-wrap')) {
      return console.warn('Not slider wrap list');
    }

    if (!_.slider.querySelector('.bolt-slider__list')) {
      return console.warn('Not slider list');
    }

    if (!_.slider.querySelector('.bolt-slider__item')) {
      return console.warn('Not slider items');
    }

    if (!_.slider.querySelector('.bolt-slider__content')) {
      return console.warn('Not slider contents');
    } // slider options


    _.width = 0;
    _.sliderListWrap = _.slider.querySelector('.bolt-slider__list-wrap');
    _.sliderList = _.slider.querySelector('.bolt-slider__list');
    _.sliderItems = _.sliderList.querySelectorAll('.bolt-slider__item');
    _.slide = _.sliderList.querySelectorAll('.bolt-slider__content');
    _.slideLength = _.sliderItems.length;
    _.paginations = [];
    _.removeActive = false;
    _.checkAutoPlay = _.autoPlay;

    if (_.currentSlide > _.slideLength) {
      _.currentSlide = 0;
    } // init slider


    _.sliderInit();
  }

  _createClass(boltSlider, [{
    key: "sliderInit",
    value: function sliderInit() {
      var _ = this;

      _.slider.classList.remove('bolt-no-js');

      _.slider.setAttribute('aria-roledescription', _.roledescription);

      for (var i = 0; i < _.slideLength; i++) {
        _.sliderItems[i].ariaLive = 'off';

        _.sliderItems[i].setAttribute('aria-roledescription', _.slideRoledescription);
      }

      _.setSliderSize();

      window.addEventListener('resize', function () {
        _.setSliderSize(); // ставим слайдер на нужный слайд


        _.moveSlider();
      }); // подготовка к движению слайдера
      // _.sliderToggle();
      // ставим слайдер на нужный слайд

      _.updateSlide();

      _.moveSlider();
    }
  }, {
    key: "setSliderSize",
    value: function setSliderSize() {
      var _ = this;

      _.width = _.slider.offsetWidth;
      _.sliderList.style.width = _.width * _.slideLength + _.gap * _.slideLength + 'px';
      _.sliderList.style.height = _.sliderItems[_.currentSlide].querySelector('.bolt-slider__content').offsetHeight + 'px';

      _.sliderItems.forEach(function (item) {
        item.style.width = _.width + 'px';

        if (_.gap) {
          item.style.marginRight = _.gap + 'px';
        }
      });
    }
  }, {
    key: "moveSlider",
    value: function moveSlider() {
      var _ = this;

      _.sliderList.style.transform = "translateX(-".concat(_.currentSlide * _.width + _.gap * _.currentSlide, "px)");
      _.sliderList.style.height = _.sliderItems[_.currentSlide].querySelector('.bolt-slider__content').offsetHeight + 'px';
    }
  }, {
    key: "updateSlide",
    value: function updateSlide() {
      var _ = this;

      if (_.sliderList.querySelector('.bolt-slider__item--active')) {
        if (!_.checkAutoPlay) {
          _.sliderList.querySelector('.bolt-slider__item--active').ariaLive = 'off';
        }

        _.sliderList.querySelector('.bolt-slider__item--active').classList.remove('bolt-slider__item--active');
      }

      _.sliderItems[_.currentSlide].classList.add('bolt-slider__item--active');

      if (!_.checkAutoPlay) {
        _.sliderItems[_.currentSlide].ariaLive = 'polite';
      }
    }
  }]);

  return boltSlider;
}();