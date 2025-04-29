import React from "react";
import "./Perfil.css";

const Perfil: React.FC = () => {
  return (
    <div className="perfil-container">
      <h1 className="perfil-title">Mi Perfil</h1>
      <div className="perfil-content">
        <p>Nombre: Antony Picado Alvarado</p>
        <p>Email: antony.picado@ucr.ac.cr</p>
        <button className="perfil-btn">Editar Perfil</button>
      </div>
    </div>
  );
};

export default Perfil;
