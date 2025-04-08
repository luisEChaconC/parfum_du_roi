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