// Image slideshow for popular-perfumes
const images = [
  '../../img/lv_on.avif',
  '../../img/creed_aventus.png',
  '../../img/aventus_her.png'
];

const imgElement = document.querySelector('.popular-perfumes img');
if (imgElement) {
  let index = 0;
  setInterval(() => {
    index = (index + 1) % images.length;
    imgElement.src = images[index];
  }, 3000);
}

// ===================== CARRUSELES ======================

// Índices individuales
let currentIndexLV = 0;
let currentIndexCreed = 0;
let currentIndexNV = 0;
let currentIndexUSX = 0;

// Obtener imágenes
const images_lv = document.querySelectorAll('.container-lv img');
const images_creed = document.querySelectorAll('.container-creed img');
const images_nv = document.querySelectorAll('.container-nv img');
const images_usx = document.querySelectorAll('.container-usx img');

// Calcular cantidad visible (4 visibles → mover en bloques de 25%)
const totalImagesLV = images_lv.length > 3 ? images_lv.length - 3 : 1;
const totalImagesCreed = images_creed.length > 3 ? images_creed.length - 3 : 1;
const totalImagesNV = images_nv.length > 3 ? images_nv.length - 3 : 1;
const totalImagesUSX = images_usx.length > 3 ? images_usx.length - 3 : 1;

// ========== LV ==========
function showNextImage_lv() {
  currentIndexLV = (currentIndexLV + 1) % totalImagesLV;
  updateCarousel_lv();
}

function showPrevImage_lv() {
  currentIndexLV = (currentIndexLV - 1 + totalImagesLV) % totalImagesLV;
  updateCarousel_lv();
}

function updateCarousel_lv() {
  const carousel = document.querySelector('.container-lv');
  if (carousel) {
    const offset = -currentIndexLV * 25;
    carousel.style.transform = `translateX(${offset}%)`;
  }
}

// ========== CREED ==========
function showNextImage_creed() {
  currentIndexCreed = (currentIndexCreed + 1) % totalImagesCreed;
  updateCarousel_creed();
}

function showPrevImage_creed() {
  currentIndexCreed = (currentIndexCreed - 1 + totalImagesCreed) % totalImagesCreed;
  updateCarousel_creed();
}

function updateCarousel_creed() {
  const carousel = document.querySelector('.container-creed');
  if (carousel) {
    const offset = -currentIndexCreed * 25;
    carousel.style.transform = `translateX(${offset}%)`;
  }
}

// ========== NV ==========
function showNextImage_nv() {
  currentIndexNV = (currentIndexNV + 1) % totalImagesNV;
  updateCarousel_nv();
}

function showPrevImage_nv() {
  currentIndexNV = (currentIndexNV - 1 + totalImagesNV) % totalImagesNV;
  updateCarousel_nv();
}

function updateCarousel_nv() {
  const carousel = document.querySelector('.container-nv');
  if (carousel) {
    const offset = -currentIndexNV * 25;
    carousel.style.transform = `translateX(${offset}%)`;
  }
}

// ========== USX ==========
function showNextImage_usx() {
  currentIndexUSX = (currentIndexUSX + 1) % totalImagesUSX;
  updateCarousel_usx();
}

function showPrevImage_usx() {
  currentIndexUSX = (currentIndexUSX - 1 + totalImagesUSX) % totalImagesUSX;
  updateCarousel_usx();
}

function updateCarousel_usx() {
  const carousel = document.querySelector('.container-usx');
  if (carousel) {
    const offset = -currentIndexUSX * 25;
    carousel.style.transform = `translateX(${offset}%)`;
  }
}
