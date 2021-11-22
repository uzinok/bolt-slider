/*! https://github.com/uzinok/bolt-slider */

class boltSlider {

	constructor(options) {
		if (!options) {
			return console.warn('Not slider options');
		};

		if (!options.slider) {
			return console.warn('Not slider');
		};

		// user options
		this.slider = options.slider;
		this.gap = options.gap || 0;

		// slider options
		this.width = 0;
		this.sliderList = this.slider.querySelector('.bolt-slider__list');
		this.slides = this.sliderList.querySelectorAll('.bolt-slider__item');
		this.countSlide = this.slides.length;

		// init slider
		this.sliderInit();
	}

	sliderInit() {
		this.slider.classList.remove('bolt-no-js');

		this.setSliderSize();
		window.addEventListener('resize', () => {
			this.setSliderSize();
		})
	}

	setSliderSize() {
		this.width = this.slider.offsetWidth;
		this.sliderList.style.width = (this.width * this.countSlide) + (this.gap * this.countSlide) + 'px';
		this.slides.forEach(slide => {
			slide.style.width = this.width + 'px';

			if (this.gap)
				slide.style.marginRight = this.gap + 'px';
		});

		//
		console.log('(' + this.width + '*' +  this.countSlide + ') + (' + this.gap + '*' + this.countSlide + ')');
	}

}
