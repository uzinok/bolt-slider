// user options

slider = document.querySelector(options.slider);

roledescription = options.roledescription || 'carousel';
slideRoledescription = options.slideRoledescription || 'slide';

gap = options.gap || 0;
currentSlide = options.currentSlide || 0;
speed = options.speed || 300;

autoPlay = options.autoPlay || false;
autoplaySpeed = options.autoplaySpeed || 0;
playButton = document.querySelector(options.playButton); // класс используется для обозначения включен/выключен autoPlay

sliderPrew = document.querySelector(options.sliderPrew) || false;
sliderNext = document.querySelector(options.sliderNext) || false;

paginationWrap = document.querySelector(options.paginationWrap) || false;
paginationTag = options.paginationTag || 'span';
paginationClass = options.paginationClass || 'bolt-slider__paginaton-btn';
paginationAria = options.paginationAria || 'Go to slide';
