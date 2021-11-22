const slider2 = new boltSlider({
	slider: document.querySelector('.slider-2'),

	gap: 20,
	countVisible: 1,

	paginationWrap: document.querySelector('.pagination-2'),
	paginationTag: 'button',
	paginationClass: 'bolt-slider__pagination-btn',
	paginationAria: 'Go to slide'
});
