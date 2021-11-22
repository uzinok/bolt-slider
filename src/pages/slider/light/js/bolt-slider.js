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
		this.countVisible = options.countVisible || 0;

		this.sliderPrew = options.sliderPrew || false;
		this.sliderNext = options.sliderNext || false;

		this.paginationWrap = options.paginationWrap || false;
		this.paginationTag = options.paginationTag || 'span';
		this.paginationClass = options.paginationClass || 'bolt-slider__paginaton-btn';
		this.paginationAria = options.paginationAria || 'of';

		// slider options
		this.width = 0;
		this.sliderList = this.slider.querySelector('.bolt-slider__list');
		this.sliderListWrap = this.slider.querySelector('.bolt-slider__list-wrap');
		this.slides = this.sliderList.querySelectorAll('.bolt-slider__item');
		this.slideLength = this.slides.length;

		// init slider
		this.sliderInit();
	}

	sliderInit() {
		this.slider.classList.remove('bolt-no-js');

		this.setSliderSize();
		window.addEventListener('resize', () => {
			this.setSliderSize();
		});

		// подготовка к движению слайдера
		this.sliderToggle();
	}

	setSliderSize() {
		this.width = this.slider.offsetWidth;
		this.sliderList.style.width = (this.width * this.slideLength) + (this.gap * this.slideLength) + 'px';

		this.slides.forEach(slide => {
			slide.style.width = this.width + 'px';

			if (this.gap) {
				slide.style.marginRight = this.gap + 'px';
			}
		});

		// ставим слайдер на нужный слайд
		this.sliderDraw();
	}

	// подготовка к движению слайдера
	sliderToggle() {

		if (this.sliderPrew) {
			this.sliderPrew.addEventListener('click', () => {
				this.countVisible--;

				if (this.countVisible < 0) {
					return this.countVisible = 0;
				}

				this.sliderDraw();
			})
		}

		if (this.sliderNext) {
			this.sliderNext.addEventListener('click', () => {
				this.countVisible++;

				if (this.countVisible >= this.slideLength) {
					return this.countVisible = this.slideLength;
				}

				this.sliderDraw();
			})
		}

		if (this.paginationWrap) {

			for (let i = 0; i < this.slideLength; i++) {
				let btn = document.createElement(this.paginationTag);
				btn.classList.add(this.paginationClass);
				btn.dataset.count = i;

				this.paginationWrap.append(btn);

				if (this.paginationTag == 'button') {
					btn.ariaLabel = this.paginationAria + ' ' + (i + 1);
					btn.addEventListener('click', () => {
						this.countVisible = i;
						this.sliderDraw();
					})
				}
			}

		}

	}

	// Движение слайдера
	sliderDraw() {
		console.log(this.countVisible);
		this.sliderList.style.transform = `translateX(-${(this.countVisible * this.width) + (this.gap * this.countVisible)}px)`;
	}

}
