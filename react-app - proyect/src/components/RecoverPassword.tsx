import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createToken } from '../utils/tokenUtils';
import './RecoverPassword.css';

const RecoverPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const registros = JSON.parse(localStorage.getItem('registros') || '[]');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) return setError('El correo es obligatorio.');
    const userExists = registros.some((u: any) => u.correo === email);
    if (!userExists) return setError('No existe ninguna cuenta con ese correo.');

    // Generar y “enviar” el token
    const token = createToken(email);
    const resetLink = `/resetear?token=${token}`;

    // Simulación de envío de email:
    setMsg(`Se ha enviado un enlace a tu correo.`);

    setTimeout(() => navigate(resetLink), 800);
  };

  return (
    <div className="form-container">
      <h2>Recuperar contraseña</h2>
      <p>Introduce tu correo y te enviaremos un enlace para restablecerla</p>
      <form onSubmit={handleSend}>
        <input
          type="email"
          placeholder="tucorreo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
        <button className="boton-elegante">Enviar enlace</button>
      </form>
      {msg && (
        <p className="success-message" style={{ marginTop: '1rem' }}>
          {msg}
        </p>
      )}
    </div>
  );
};

export default RecoverPassword;