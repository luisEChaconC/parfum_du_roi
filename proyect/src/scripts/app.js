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

const indicesCarrusel = {};

function moverCarrusel(idCarrusel, direccion) {
  const carrusel = document.getElementById(idCarrusel);
  const items = carrusel.querySelectorAll(".product-item");

  if (!indicesCarrusel[idCarrusel]) indicesCarrusel[idCarrusel] = 0;

  let indiceActual = indicesCarrusel[idCarrusel];
  const total = items.length;
  const visibles = 4;

  indiceActual += direccion;

  // Evitar que se desborde
  if (indiceActual < 0) indiceActual = total - visibles;
  if (indiceActual > total - visibles) indiceActual = 0;

  indicesCarrusel[idCarrusel] = indiceActual;

  const anchoItem = items[0].offsetWidth + parseInt(getComputedStyle(items[0]).marginRight || 0);
  carrusel.style.transform = `translateX(-${anchoItem * indiceActual}px)`;
}

// ===================== MOSTRAR CONTRASEÑA ===================== //
function togglePassword() {
  const input = document.getElementById("password");
  const icon = document.getElementById("toggle-icon");

  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";

  icon.src = isPassword ? "../../img/OcultarContraseña.png" : "../../img/MostrarContraseña.png";
  icon.alt = isPassword ? "Ocultar contraseña" : "Mostrar contraseña";
}