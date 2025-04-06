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

function initCarousel(className) {
  const images = document.querySelectorAll(`.${className} img`);
  const totalImages = images.length > 3 ? images.length - 3 : 1;
  carousels[className] = {
    index: 0,
    total: totalImages,
    container: document.querySelector(`.${className}`)
  };
}

function showNextImage(className) {
  const carousel = carousels[className];
  if (!carousel) return;
  carousel.index = (carousel.index + 1) % carousel.total;
  updateCarousel(className);
}

function showPrevImage(className) {
  const carousel = carousels[className];
  if (!carousel) return;
  carousel.index = (carousel.index - 1 + carousel.total) % carousel.total;
  updateCarousel(className);
}

function updateCarousel(className) {
  const carousel = carousels[className];
  if (!carousel || !carousel.container) return;
  const offset = -carousel.index * 25;
  carousel.container.style.transform = `translateX(${offset}%)`;
}

// ===================== INICIALIZACIÓN ===================== //
initCarousel('container-lv');
initCarousel('container-creed');
initCarousel('container-nv');
initCarousel('container-usx');

// ===================== MOSTRAR CONTRASEÑA ===================== //
function togglePassword() {
  const input = document.getElementById("password");
  const icon = document.getElementById("toggle-icon");

  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";

  icon.src = isPassword ? "../../img/OcultarContraseña.png" : "../../img/MostrarContraseña.png";
  icon.alt = isPassword ? "Ocultar contraseña" : "Mostrar contraseña";
}