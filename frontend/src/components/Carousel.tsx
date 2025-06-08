import React, { useRef, useState } from "react";
import "./Carousel.css";

const images = [
  { src: "/img/Nicho/louis_vuitton/pacific-chill.avif", alt: "Pacific Chill" },
  { src: "/img/Nicho/louis_vuitton/meteore.avif", alt: "Météore" },
  { src: "/img/Nicho/louis_vuitton/orage.avif", alt: "Orage" },
  { src: "/img/Nicho/louis_vuitton/california-dream.avif", alt: "California Dream" },
  { src: "/img/Nicho/louis_vuitton/afternoon-swim.avif", alt: "Afternoon Swim" },
  { src: "/img/Nicho/louis_vuitton/ombre-nomade.avif", alt: "Ombre Nomade" },
  { src: "/img/Nicho/louis_vuitton/lmmensite.avif", alt: "L'Immensité" },
  { src: "/img/Nicho/louis_vuitton/imagination.avif", alt: "Imagination" },
];

const Carousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const visibles = 4;

  const moveCarousel = (direction: number) => {
    if (!carouselRef.current) return;
    const items = carouselRef.current.querySelectorAll(".product-item");
    const total = items.length;

    let newIndex = index + direction;
    if (newIndex < 0) newIndex = total - visibles;
    if (newIndex > total - visibles) newIndex = 0;

    setIndex(newIndex);

    const anchoItem = items[0].clientWidth;
    carouselRef.current.style.transform = `translateX(-${anchoItem * newIndex}px)`;
  };

  return (
    <div className="container-perfumes-lv">
      <div className="title">
        <p className="perfumes-name">Louis Vuitton</p>
      </div>
      <div className="container-lv" ref={carouselRef}>
        {images.map((img, idx) => (
          <div className="product-item" key={idx}>
            <img src={img.src} alt={img.alt} className="product-img" />
            <div className="product-buttons">
              <img src="/img/favoritos_transparente.png" alt="Like" className="like-btn" />
              <img src="/img/carrito_transparente.png" alt="Add to Cart" className="cart-btn" />
            </div>
          </div>
        ))}
      </div>
      <div className="button-container-lv">
        <button className="prevBtn" onClick={() => moveCarousel(-1)}></button>
        <button className="nextBtn" onClick={() => moveCarousel(1)}></button>
      </div>
    </div>
  );
};

export default Carousel;
