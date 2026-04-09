export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    
    this.render();
    this.elem.addEventListener('click', this.onClick.bind(this));
  }

  render() {
    this.elem = document.createElement('div');
    this.elem.className = 'slider';

    const thumb = document.createElement('div');
    thumb.className = 'slider__thumb';
    
    const valueElement = document.createElement('span');
    valueElement.className = 'slider__value';
    valueElement.textContent = this.value;
    
    thumb.appendChild(valueElement);

    const progress = document.createElement('div');
    progress.className = 'slider__progress';

    const stepsContainer = document.createElement('div');
    stepsContainer.className = 'slider__steps';

    for (let i = 0; i < this.steps; i++) {
      const step = document.createElement('span');
      if (i === this.value) {
        step.classList.add('slider__step-active');
      }
      stepsContainer.appendChild(step);
    }

    this.elem.appendChild(thumb);
    this.elem.appendChild(progress);
    this.elem.appendChild(stepsContainer);

    this.updateSliderPosition();
  }

  onClick(event) {
    const left = event.clientX - this.elem.getBoundingClientRect().left;
    const leftRelative = left / this.elem.offsetWidth;
    
    const segments = this.steps - 1;
    const approximateValue = leftRelative * segments;
    
    const newValue = Math.round(approximateValue);
    
    if (newValue !== this.value) {
      this.value = newValue;
      this.updateSliderPosition();
      this.emitChangeEvent();
    }
  }

  updateSliderPosition() {
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    const valueElement = thumb.querySelector('.slider__value');
    const steps = this.elem.querySelectorAll('.slider__steps > span');

    valueElement.textContent = this.value;

    steps.forEach((step, index) => {
      step.classList.toggle('slider__step-active', index === this.value);
    });

    const segments = this.steps - 1;
    const valuePercents = this.value / segments * 100;

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
  }

  emitChangeEvent() {
    const event = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });
    this.elem.dispatchEvent(event);
  }
}
