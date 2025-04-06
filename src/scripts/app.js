const images = [
  '../../img/lv_on.avif',
  '../../img/creed_aventus.png',
  '../../img/aventus_her.png'
];

const imgElement = document.querySelector('.popular-perfumes img');

let index = 0;

setInterval(() => {
  index = (index + 1) % images.length;
  imgElement.src = images[index];
}, 3000);

let currentIndex = 0;
const images_lv = document.querySelectorAll('.container-lv img');
const images_creed = document.querySelectorAll('.container-creed img');
const totalImagesLV = images_lv.length -3;
const totalImagesCreed = images_creed.length -3;

// lv
function showNextImage_lv() {
  currentIndex = (currentIndex + 1) % totalImagesLV; 
  updateCarousel_lv();
}

function showPrevImage_lv() {
  currentIndex = (currentIndex - 1 + totalImagesLV) % totalImagesLV; 
  updateCarousel_lv();
}

function updateCarousel_lv() {
  const carousel = document.querySelector('.container-lv');
  const offset = -currentIndex * 25; 
  carousel.style.transform = `translateX(${offset}%)`;
}

// Creed
function showNextImage_creed() {
  currentIndex = (currentIndex + 1) % totalImagesCreed; 
  updateCarousel_creed();
}

function showPrevImage_creed() {
  currentIndex = (currentIndex - 1 + totalImagesCreed) % totalImagesCreed; 
  updateCarousel_creed();
}

function updateCarousel_creed() {
  const carousel = document.querySelector('.container-creed');
  const offset = -currentIndex * 25; 
  carousel.style.transform = `translateX(${offset}%)`;
}

/* Me di cuenta que esto marea con varios carouseles jaja
setInterval(showNextImage_lv, 3000); 
setInterval(showNextImage_creed, 3000); 
*/

