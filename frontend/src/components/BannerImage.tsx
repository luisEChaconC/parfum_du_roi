import React, { useState, useEffect } from "react";
import "./BannerImage.css";

const BannerImage: React.FC = () => {
  const images = [
    '/img/Nicho/promotion/portraits_volteada.avif',
    '/Angels_share.avif',
    '/Angels_share_paradise.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000); // Cambiar la imagen cada 3 segundos

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
    {/* <h1 id="title">Tu Perfume,<br />Tu Esencia </h1> */}
  </div>
</div>
  );
};

export default BannerImage;
