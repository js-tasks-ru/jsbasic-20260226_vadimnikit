import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentSlide = 0;
    this._render();
    this._setupEventListeners();
  }

  get elem() {
    return this._container;
  }

  _render() {
    const slidesHTML = this.slides.map((slide, index) => `
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `).join('');

    this._container = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${slidesHTML}
        </div>
      </div>
    `);

    this._inner = this._container.querySelector('.carousel__inner');
    this._arrowRight = this._container.querySelector('.carousel__arrow_right');
    this._arrowLeft = this._container.querySelector('.carousel__arrow_left');
    
    this._updateArrows();
  }

  _setupEventListeners() {
    this._arrowRight.addEventListener('click', () => this._nextSlide());
    this._arrowLeft.addEventListener('click', () => this._previousSlide());
    
    this._container.addEventListener('click', (event) => {
      const button = event.target.closest('.carousel__button');
      if (button) {
        const slide = event.target.closest('.carousel__slide');
        const slideId = slide.dataset.id;
        
        const customEvent = new CustomEvent('product-add', {
          detail: slideId,
          bubbles: true
        });
        
        this._container.dispatchEvent(customEvent);
      }
    });
  }

  _nextSlide() {
    if (this.currentSlide < this.slides.length - 1) {
      this.currentSlide++;
      this._updateSlidePosition();
    }
  }

  _previousSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this._updateSlidePosition();
    }
  }

  _updateSlidePosition() {
    const offset = -this.currentSlide * this._inner.offsetWidth;
    this._inner.style.transform = `translateX(${offset}px)`;
    this._updateArrows();
  }

  _updateArrows() {
    if (this.currentSlide === 0) {
      this._arrowLeft.style.display = 'none';
    } else {
      this._arrowLeft.style.display = '';
    }

    if (this.currentSlide === this.slides.length - 1) {
      this._arrowRight.style.display = 'none';
    } else {
      this._arrowRight.style.display = '';
    }
  }
}
