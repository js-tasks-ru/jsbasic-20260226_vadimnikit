export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.createSlider();
    this.addEventListeners();
  }

  createSlider() {
    const slider = document.createElement('div');
    slider.className = 'slider';

    const segments = this.steps - 1;
    const leftPercents = (this.value / segments) * 100;

    const thumb = document.createElement('div');
    thumb.className = 'slider__thumb';
    thumb.style.left = `${leftPercents}%`;

    const progress = document.createElement('div');
    progress.className = 'slider__progress';
    progress.style.width = `${leftPercents}%`;

    const valueElement = document.createElement('div');
    valueElement.className = 'slider__value';
    valueElement.textContent = this.value;

    const steps = document.createElement('div');
    steps.className = 'slider__steps';

    for (let i = 0; i < this.steps; i++) {
      const step = document.createElement('span');
      if (i === this.value) {
        step.classList.add('slider__step-active');
      }
      steps.appendChild(step);
    }

    slider.appendChild(thumb);
    slider.appendChild(progress);
    slider.appendChild(valueElement);
    slider.appendChild(steps);

    return slider;
  }

  addEventListeners() {
    const thumb = this.elem.querySelector('.slider__thumb');
    
    thumb.ondragstart = () => false;

    thumb.addEventListener('pointerdown', this.onPointerDown.bind(this));
    this.elem.addEventListener('click', this.onClick.bind(this));
  }

  onPointerDown(event) {
    event.preventDefault();
    
    this.elem.classList.add('slider_dragging');
    
    const onPointerMove = (event) => {
      event.preventDefault();
      this.onPointerMove(event);
    };

    const onPointerUp = () => {
      this.elem.classList.remove('slider_dragging');
      this.onPointerUp();
      
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  }

  onPointerMove(event) {
    const left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    const leftPercents = leftRelative * 100;

    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    const segments = this.steps - 1;
    const approximateValue = leftRelative * segments;
    const newValue = Math.round(approximateValue);

    this.updateValue(newValue);
  }

  onPointerUp() {
    const segments = this.steps - 1;
    const leftPercents = (this.value / segments) * 100;

    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    this.dispatchEvent();
  }

  onClick(event) {
    if (event.target === this.elem.querySelector('.slider__thumb')) {
      return;
    }

    const left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    const segments = this.steps - 1;
    const approximateValue = leftRelative * segments;
    const newValue = Math.round(approximateValue);

    const leftPercents = (newValue / segments) * 100;

    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    this.updateValue(newValue);
    this.dispatchEvent();
  }

  updateValue(newValue) {
    if (this.value !== newValue) {
      this.value = newValue;

      const valueElement = this.elem.querySelector('.slider__value');
      valueElement.textContent = this.value;

      const steps = this.elem.querySelectorAll('.slider__steps > span');
      steps.forEach(step => step.classList.remove('slider__step-active'));
      steps[this.value].classList.add('slider__step-active');
    }
  }

  dispatchEvent() {
    const event = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });
    this.elem.dispatchEvent(event);
  }
}
