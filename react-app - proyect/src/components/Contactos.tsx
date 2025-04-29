import React from "react";
import "./Contactos.css";

const Contactos: React.FC = () => {
  return (
    <div className="contactos-container">
      <h1>Contáctanos</h1>
      <p>¿Tienes alguna duda o comentario? Escríbenos y te responderemos lo antes posible.</p>
      
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input type="email" id="email" name="email" placeholder="tu@email.com" />
        </div>

        <div className="form-group">
          <label htmlFor="mensaje">Mensaje:</label>
          <textarea id="mensaje" name="mensaje" rows={5} placeholder="Escribe tu mensaje aquí..."></textarea>
        </div>

        <button type="submit" className="btn-enviar">Enviar</button>
      </form>
    </div>
  );
};

export default Contactos;
