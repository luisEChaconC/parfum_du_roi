import React, { useState, useEffect } from "react";
import "./BannerImage.css";

const BannerImage: React.FC = () => {
  const images = [
    '/img/Nicho/promotion/portraits.avif',
    //'/img/aventus_cologne.jpeg',
    //'/img/creed_aventus.png',
    //'/img/lv_on.avif'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000); // Cambiar la imagen cada 3 segundos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  return (
<div className="banner-container">
  <img
    src={images[currentImageIndex]}
    alt="Banner"
    className="banner-image"
  />
  <div className="banner-overlay"></div> {}
  <div className="banner-text">
    <h1 id="title">Tu Perfume, Tu esencia </h1>
    <p id="description">
      Las fragancias para hombre y mujer de Parfum du Roi 
      exploran territorios olfativos dedicados a la pasión
      por la aventura y la evasión. Fragancias excepcionales,
      elaboradas con las mejores esencias de todo el mundo. 
    </p>
  </div>
</div>
  );
};

export default BannerImage;
