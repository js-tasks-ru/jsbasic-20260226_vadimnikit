import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this._element = null;
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._title = '';
    this._body = null;
  }

  open() {
    this._element = createElement(this._getTemplate());
    document.body.appendChild(this._element);
    document.body.classList.add('is-modal-open');
    
    if (this._title) {
      this._element.querySelector('.modal__title').textContent = this._title;
    }
    if (this._body) {
      const bodyElement = this._element.querySelector('.modal__body');
      bodyElement.innerHTML = '';
      bodyElement.appendChild(this._body);
    }
    
    this._element.querySelector('.modal__close').addEventListener('click', this._handleCloseClick);
    document.addEventListener('keydown', this._handleKeyDown);
  }

  close() {
    if (this._element) {
      this._element.remove();
      this._element = null;
    }
    document.body.classList.remove('is-modal-open');
    
    document.removeEventListener('keydown', this._handleKeyDown);
  }

  setTitle(title) {
    this._title = title;
    if (this._element) {
      this._element.querySelector('.modal__title').textContent = title;
    }
  }

  setBody(node) {
    this._body = node;
    if (this._element) {
      const bodyElement = this._element.querySelector('.modal__body');
      bodyElement.innerHTML = '';
      bodyElement.appendChild(node);
    }
  }

  _handleKeyDown(event) {
    if (event.code === 'Escape') {
      this.close();
    }
  }

  _handleCloseClick() {
    this.close();
  }

  _getTemplate() {
    return `
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `;
  }
}
