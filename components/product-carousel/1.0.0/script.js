let carouselSlideIndex = 1;
carouselShowSlides(carouselSlideIndex);

// Next/previous controls
function carouselPlusSlides(n) {
  carouselShowSlides((carouselSlideIndex += n));
}

// Thumbnail image controls
function carouselCurrentSlide(n) {
  carouselShowSlides((carouselSlideIndex = n));
}

function carouselShowSlides(n) {
  let i;
  let slides = document.getElementsByClassName('carousel-mySlides');
  let dots = document.getElementsByClassName('carousel-dot');
  if (n > slides.length) {
    carouselSlideIndex = 1;
  }
  if (n < 1) {
    carouselSlideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }
  slides[carouselSlideIndex - 1].style.display = 'block';
  dots[carouselSlideIndex - 1].className += ' active';
}
