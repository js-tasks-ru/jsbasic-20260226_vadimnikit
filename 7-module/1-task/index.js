import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this._render();
    this._setupEventListeners();
    this._updateArrows();
  }

  get elem() {
    return this._container;
  }

  _render() {
    const categoriesHTML = this.categories.map(category => `
      <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
    `).join('');

    this._container = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner">
          ${categoriesHTML}
        </nav>
        <button class="ribbon__arrow ribbon__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    this._inner = this._container.querySelector('.ribbon__inner');
    this._arrowLeft = this._container.querySelector('.ribbon__arrow_left');
    this._arrowRight = this._container.querySelector('.ribbon__arrow_right');
  }

  _setupEventListeners() {
    this._arrowLeft.addEventListener('click', () => {
      this._inner.scrollBy(-350, 0);
    });

    this._arrowRight.addEventListener('click', () => {
      this._inner.scrollBy(350, 0);
    });

    this._inner.addEventListener('scroll', () => {
      this._updateArrows();
    });

    this._container.addEventListener('click', (event) => {
      const item = event.target.closest('.ribbon__item');
      if (item) {
        event.preventDefault();
        
        const previousActive = this._container.querySelector('.ribbon__item_active');
        if (previousActive) {
          previousActive.classList.remove('ribbon__item_active');
        }
        
        item.classList.add('ribbon__item_active');
        
        const categoryId = item.dataset.id;
        
        const customEvent = new CustomEvent('ribbon-select', {
          detail: categoryId,
          bubbles: true
        });
        
        this._container.dispatchEvent(customEvent);
      }
    });
  }

  _updateArrows() {
    const scrollLeft = this._inner.scrollLeft;
    const scrollWidth = this._inner.scrollWidth;
    const clientWidth = this._inner.clientWidth;
    const scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollLeft === 0) {
      this._arrowLeft.classList.remove('ribbon__arrow_visible');
    } else {
      this._arrowLeft.classList.add('ribbon__arrow_visible');
    }

    if (scrollRight < 1) {
      this._arrowRight.classList.remove('ribbon__arrow_visible');
    } else {
      this._arrowRight.classList.add('ribbon__arrow_visible');
    }
  }
}
