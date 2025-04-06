// ===================== SLIDESHOW POPULAR PERFUMES ===================== //
const images = [
  '../../img/aventus_cologne.jpeg',
  '../../img/aventus_absolu.jpg',
  '../../img/creed_aventus.png',
  '../../img/aventus_her.png',
  '../../img/creed_woman.jpeg',
  '../../img/silver_montain_water.jpg',
  '../../img/lv_on.avif'
];

const imgElement = document.querySelector('.popular-perfumes img');
if (imgElement) {
  let index = 0;
  setInterval(() => {
    index = (index + 1) % images.length;
    imgElement.src = images[index];
  }, 3000);
}

// ===================== CARRUSELES GENÉRICOS ===================== //

const carousels = {};

function initCarousel(id) {
  const images = document.querySelectorAll(`#${id} img`);
  const totalImages = images.length > 3 ? images.length - 3 : 1;
  carousels[id] = {
    index: 0,
    total: totalImages,
    container: document.querySelector(`#${id}`)
  };
}

function showNextImage(carouselId) {
  const carousel = carousels[carouselId];
  if (!carousel) return;
  carousel.index = (carousel.index + 1) % carousel.total;
  updateCarousel(carouselId);
}

function showPrevImage(carouselId) {
  const carousel = carousels[carouselId];
  if (!carousel) return;
  carousel.index = (carousel.index - 1 + carousel.total) % carousel.total;
  updateCarousel(carouselId);
}

function updateCarousel(id) {
  const carousel = carousels[id];
  if (!carousel || !carousel.container) return;
  const offset = -carousel.index * 25;
  carousel.container.style.transform = `translateX(${offset}%)`;
}

// ===================== INICIALIZACIÓN ===================== //
initCarousel('carousel1');
initCarousel('carousel2');
initCarousel('carousel3');
initCarousel('carousel4');

// ===================== MOSTRAR CONTRASEÑA ===================== //
function togglePassword() {
  const input = document.getElementById("password");
  const icon = document.getElementById("toggle-icon");

  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";

  icon.src = isPassword ? "../../img/OcultarContraseña.png" : "../../img/MostrarContraseña.png";
  icon.alt = isPassword ? "Ocultar contraseña" : "Mostrar contraseña";
}