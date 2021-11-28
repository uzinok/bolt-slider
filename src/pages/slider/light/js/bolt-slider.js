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
		this.paginationAria = options.paginationAria || 'Go to slide';

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
	}

	sliderInit() {
		this.slider.classList.remove('bolt-no-js');
		this.slider.setAttribute('aria-roledescription', this.roledescription);

		for (let i = 0; i < this.slideLength; i++) {
			this.sliderItem[i].ariaLive = 'off';
			this.sliderItem[i].setAttribute('aria-roledescription', this.slideRoledescription);
			this.sliderItem[i].setAttribute('tabindex', -1);
		}

		this.setSliderSize();
		window.addEventListener('resize', () => {
			this.setSliderSize();

			// ставим слайдер на нужный слайд
			this.sliderDraw();
		});

		// подготовка к движению слайдера
		this.sliderToggle();

		// ставим слайдер на нужный слайд
		this.sliderDraw();
		this.keyupDraw();
	}

	setSliderSize() {
		this.width = this.slider.offsetWidth;
		this.sliderList.style.width = (this.width * this.slideLength) + (this.gap * this.slideLength) + 'px';
		this.sliderList.style.height = this.sliderItem[this.countVisible].querySelector('.bolt-slider__content').offsetHeight + 'px';

		this.sliderItem.forEach(item => {
			item.style.width = this.width + 'px';

			if (this.gap) {
				item.style.marginRight = this.gap + 'px';
			}
		});
	}

	// подготовка к движению слайдера
	sliderToggle() {

		if (this.sliderPrew) {
			this.sliderPrew.addEventListener('click', () => {
				this.countVisible--;

				if (this.countVisible < 0) {
					return this.countVisible = 0;
				}

				this.sliderAnimation();
			});
		}

		if (this.sliderNext) {
			this.sliderNext.addEventListener('click', () => {
				this.countVisible++;

				if (this.countVisible >= this.slideLength) {
					return this.countVisible = this.slideLength - 1;
				}

				this.sliderAnimation();
			});
		}

		if (this.paginationWrap) {
			this.setPagination();
		}

	}

	setPagination() {

		for (let i = 0; i < this.slideLength; i++) {
			let btn = document.createElement(this.paginationTag);
			btn.classList.add(this.paginationClass);

			this.paginationWrap.append(btn);

			if (this.paginationTag == 'button') {
				btn.dataset.count = i;
				btn.ariaLabel = this.paginationAria + ' ' + (i + 1) + '.';
				btn.addEventListener('click', () => {
					this.countVisible = i;
					this.sliderAnimation();
				});

			}
			this.paginations.push(btn);

		}
	}

	// Движение слайдера
	sliderDraw() {
		this.sliderList.style.transform = `translateX(-${(this.countVisible * this.width) + (this.gap * this.countVisible)}px)`;

		// навигация
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
		}

		// пагинация
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
		}

		// слайды
		if (this.sliderList.querySelector('.bolt-slider__item--active')) {
			this.removeActive = this.sliderList.querySelector('.bolt-slider__item--active');

			if (this.removeActive == this.sliderList.querySelectorAll('.bolt-slider__item')[this.countVisible]) return;
			this.removeActive.ariaLive = 'off';
			this.removeActive.setAttribute('tabindex', -1);
		}

		this.sliderItem.forEach(slide => {
			slide.classList.add('bolt-slider__item--active');
		});

		setTimeout(() => {
			if (this.removeActive) {
				this.removeActive.classList.remove('bolt-slider__item--active');
			}

			this.sliderItem.forEach(slide => {
				slide.classList.remove('bolt-slider__item--active');
			});

			this.removeActive = false;
			this.sliderItem[this.countVisible].classList.add('bolt-slider__item--active');
		}, this.speed);

		this.sliderItem[this.countVisible].ariaLive = 'polite';
		this.sliderItem[this.countVisible].setAttribute('tabindex', 0);

		this.sliderList.style.height = this.sliderItem[this.countVisible].querySelector('.bolt-slider__content').offsetHeight + 'px';

	}

	// клавиатура
	keyupDraw() {
		this.sliderList.addEventListener('keyup', (e) => {
			if (e.key == 'ArrowLeft') {
				e.preventDefault();
				this.countVisible--;

				if (this.countVisible < 0) {
					this.sliderPrew.disabled = true;
					return this.countVisible = 0;
				}

				this.sliderAnimation();
				setTimeout(() => {
					this.sliderItem[this.countVisible].focus();
				}, this.speed)
			}

			if (e.key == 'ArrowRight') {
				this.countVisible++;

				if (this.countVisible > this.slideLength - 1) {
					this.sliderNext.disabled = true;
					this.countVisible = this.slideLength - 1;
					return;
				}

				this.sliderAnimation();
				setTimeout(() => {
					this.sliderItem[this.countVisible].focus();
				}, this.speed)
			}
			console.log(this.countVisible);
		}, {
			passive: false
		});
	}

	// движение слайдера с анимацией
	sliderAnimation() {
		this.sliderList.style.transition = `transform ${this.speed}ms ease-in-out, height ${this.speed}ms ease-in-out`;
		this.sliderDraw();

		setTimeout(() => {
			this.sliderList.style.transition = `transform 0ms ease-in-out, height 0ms ease-in-out`;
		}, this.speed)
	}

	// касание
	touthMove() {

		this.sliderList.addEventListener("touchstart", (e) => {
			this.startClientX = e.touches[0].clientX;
		})

		this.sliderList.addEventListener("touchmove", (e) => {
			this.sliderItem.forEach(slide => {
				slide.classList.add('bolt-slider__item--active');
			});
			this.touchMove = this.startClientX - e.touches[0].clientX;
			if (
				((this.countVisible * this.width) + (this.gap * this.countVisible) + this.touchMove) >=
				0
			) {

				if (
					((this.countVisible * this.width) + (this.gap * this.countVisible) + this.touchMove) <=
					(this.width * (this.slideLength - 1) + this.gap * (this.slideLength - 1))
				) {
					this.sliderList.style.transform = `translateX(-${(this.countVisible * this.width) + (this.gap * this.countVisible) + this.touchMove}px)`;
				}
			}

		});

		this.sliderList.addEventListener("touchend", (e) => {
			if ((this.touchMove < 30) && this.touchMove > -30) {
				return this.sliderAnimation();
			}

			if (this.touchMove > 0) {
				this.countVisible++;
				if (this.countVisible >= this.slideLength - 1) {
					this.countVisible = this.slideLength - 1;
				}
				this.sliderAnimation();
			}

			if (this.touchMove < 0) {
				this.countVisible--;
				if (this.countVisible < 0) {
					this.countVisible = 0;
				}
				this.sliderAnimation();
			}

			this.touchMove = 0;
		})

	}

}
