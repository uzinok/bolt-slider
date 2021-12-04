// user options
this.slider = options.slider;

this.slideAria = options.slideAria || 'of';
this.roledescription = options.roledescription || 'carousel';
this.slideRoledescription = options.slideRoledescription || 'slide';

this.gap = options.gap || 0;
this.currentSlide = options.currentSlide || 0;
this.speed = options.speed || 300;

this.sliderPrew = options.sliderPrew || false;
this.sliderNext = options.sliderNext || false;

this.paginationWrap = options.paginationWrap || false;
this.paginationTag = options.paginationTag || 'span';
this.paginationClass = options.paginationClass || 'bolt-slider__paginaton-btn';
this.paginationAria = options.paginationAria || 'Go to slide';
