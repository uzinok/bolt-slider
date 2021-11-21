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

		// slider options

		// init slider
		this.sliderInit();
	}

	sliderInit() {
		this.slider.classList.remove('bolt-no-js');
	}

}
