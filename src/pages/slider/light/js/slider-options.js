// slider options
this.width = 0;
this.sliderList = this.slider.querySelector('.bolt-slider__list');
this.sliderListWrap = this.slider.querySelector('.bolt-slider__list-wrap');
this.sliderItem = this.sliderList.querySelectorAll('.bolt-slider__item');
this.slide = this.sliderList.querySelectorAll('.bolt-slider__content');
this.slideLength = this.sliderItem.length;
this.paginations = [];
this.removeActive = false;

// init slider
this.sliderInit();

// касание
this.startClientX = 0;
this.touchMove = 0;
this.touthMove();

setSliderSize();

// подготовка к движению слайдера
sliderToggle();
setPagination();
// Движение слайдера
moveSlider();
// движение слайдера с анимацией
sliderAnimation();
// касание
touthMove();
// клавиатура
keyupDraw()
