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

    if (!document.querySelector(options.slider)) {
      return console.warn('Not slider');
    }

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
    _.sliderPrew = document.querySelector(options.sliderPrew) || false;
    _.sliderNext = document.querySelector(options.sliderNext) || false;
    _.paginationWrap = document.querySelector(options.paginationWrap) || false;
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
      } // следим за шириной слайдера


      _.setSliderSize();

      window.addEventListener('resize', function () {
        _.setSliderSize(); // сдвигаем на нужный слайд


        _.moveSlider();
      }); // при необходимости создаем кнопки пагинации

      if (_.paginationWrap) {
        _.setPagination();
      }

      if (_.sliderNext) {
        _.moveNext();
      }

      if (_.sliderPrew) {
        _.movePrew();
      } // показываем нужный слайд


      _.updateSlide(); // сдвигаем на нужный слайд


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
    key: "setPagination",
    value: function setPagination() {
      var _ = this;

      var _loop = function _loop(i) {
        var btn = document.createElement(_.paginationTag);
        btn.classList.add(_.paginationClass);

        _.paginationWrap.append(btn);

        if (_.paginationTag == 'button') {
          btn.dataset.count = i;
          btn.ariaLabel = _.paginationAria + ' ' + (i + 1) + '.';
          btn.addEventListener('click', function () {
            _.currentSlide = i;

            _.updateSlide();

            _.moveSlider();
          });
        }

        _.paginations.push(btn);
      };

      for (var i = 0; i < _.slideLength; i++) {
        _loop(i);
      }
    }
  }, {
    key: "moveNext",
    value: function moveNext() {
      var _ = this;

      _.sliderNext.addEventListener('click', function () {
        _.currentSlide++;

        if (_.currentSlide >= _.slideLength) {
          return _.currentSlide = _.slideLength - 1;
        }

        _.updateSlide();

        _.moveSlider();
      });
    }
  }, {
    key: "movePrew",
    value: function movePrew() {
      var _ = this;

      _.sliderPrew.addEventListener('click', function () {
        _.currentSlide--;

        if (_.currentSlide < 0) {
          return _.currentSlide = 0;
        }

        _.updateSlide();

        _.moveSlider();
      });
    }
  }, {
    key: "moveSlider",
    value: function moveSlider() {
      var _ = this;

      _.sliderList.style.transform = "translateX(-".concat(_.currentSlide * _.width + _.gap * _.currentSlide, "px)");
      _.sliderList.style.height = _.sliderItems[_.currentSlide].querySelector('.bolt-slider__content').offsetHeight + 'px';

      if (_.paginationWrap) {
        _.updatePagination();
      }

      if (_.sliderNext) {
        _.updateSlideNext();
      }

      if (_.sliderPrew) {
        _.updateSlidePrew();
      }
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
  }, {
    key: "updatePagination",
    value: function updatePagination() {
      var _ = this;

      if (_.paginationWrap.querySelector('.bolt-slider__pagination-btn--active')) {
        if (_.paginationTag == 'button') {
          _.paginationWrap.querySelector('.bolt-slider__pagination-btn--active').disabled = false;

          _.paginationWrap.querySelector('.bolt-slider__pagination-btn--active').classList.remove(_.paginationClass + '--active');
        }
      }

      _.paginations[_.currentSlide].disabled = true;

      _.paginations[_.currentSlide].classList.add(_.paginationClass + '--active');
    }
  }, {
    key: "updateSlideNext",
    value: function updateSlideNext() {
      var _ = this;

      if (_.sliderNext.disabled == true && _.currentSlide < _.slideLength - 1) {
        _.sliderNext.disabled = false;
      }

      if (_.currentSlide >= _.slideLength - 1) {
        _.sliderNext.disabled = true;
      }
    }
  }, {
    key: "updateSlidePrew",
    value: function updateSlidePrew() {
      var _ = this;

      if (_.sliderPrew.disabled == true && _.currentSlide > 0) {
        _.sliderPrew.disabled = false;
      }

      if (_.currentSlide <= 0) {
        _.sliderPrew.disabled = true;
      }
    }
  }]);

  return boltSlider;
}();