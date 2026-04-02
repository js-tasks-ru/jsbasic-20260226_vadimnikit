function initCarousel() {
  const carouselInner = document.querySelector('.carousel__inner');
  const arrowRight = document.querySelector('.carousel__arrow_right');
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  const slides = document.querySelectorAll('.carousel__slide');

  let currentSlide = 0;
  const totalSlides = slides.length;

  function updateArrows() {
    arrowLeft.style.display = currentSlide === 0 ? 'none' : '';
    arrowRight.style.display = currentSlide === totalSlides - 1 ? 'none' : '';
  }

  function moveSlide(direction) {
    const slideWidth = carouselInner.offsetWidth;
    currentSlide += direction;
    carouselInner.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    updateArrows();
  }

  arrowRight.addEventListener('click', () => moveSlide(1));
  arrowLeft.addEventListener('click', () => moveSlide(-1));

  updateArrows();
}
