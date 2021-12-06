// slider options

width = 0;
sliderListWrap = _.slider.querySelector('.bolt-slider__list-wrap');
sliderList = _.slider.querySelector('.bolt-slider__list');
sliderItems = _.sliderList.querySelectorAll('.bolt-slider__item');
sliderItems = Array.prototype.slice.call(_.sliderItems); // for IE
slide = _.sliderList.querySelectorAll('.bolt-slider__content');
slideLength = _.sliderItems.length;
paginations = [];
checkAutoPlay = _.autoPlay;
playClass = options.playButton || false;
setIntervalAutoPlay = false;

sliderInit();
setSliderSize();
setPagination();
moveNext();
nextSlider();
movePrew();
moveSlider();
updateSlide();
updatePagination();
updateSlideNext();
updateSlidePrew();
sliderAnimation();
setAnimation();
removeAnimation();
drawAutoPlay();
pauseAutoPlay();
autoPlayControl();
stopAutoPlay();
controllPlayButton();
