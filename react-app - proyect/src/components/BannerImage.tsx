import React, { useState, useEffect } from "react";
import "./BannerImage.css";

const BannerImage: React.FC = () => {
  const images = [
    '/img/aventus_cologne.jpeg',
    '/img/aventus_absolu.jpg',
    '/img/creed_aventus.png',
    '/img/aventus_her.png',
    '/img/creed_woman.jpeg',
    '/img/silver_montain_water.jpg',
    '/img/lv_on.avif'
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
      <div className="banner-text">
        <h1>Tu Perfume, </h1>
        <h1>Tu esencia </h1>
      </div>
    </div>
  );
};

export default BannerImage;
