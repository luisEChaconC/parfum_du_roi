import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

import './Profile.css';

const Profile = () => {
  const [usuario, setUsuario] = useState<{ nombre: string; correo: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuarioActual');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    } else {
      navigate('/Login');
    }
  }, [navigate]);

  return (
    <main className="perfil-wrapper">
      <div className="perfil-card">
        <h2 className="perfil-titulo">Perfil de Usuario</h2>
        {usuario && (
          <div className="perfil-datos">
            <div className="perfil-item">
              <span className="label">Nombre:</span>
              <span>{usuario.nombre}</span>
            </div>
            <div className="perfil-item">
              <span className="label">Correo:</span>
              <span>{usuario.correo}</span>
            </div>
            <button
              className="boton-elegante"
              onClick={() => {
                localStorage.removeItem('usuarioActual');
                navigate('/Login');
              }}
            >
              <LogOut size={16} style={{ marginRight: '8px' }} />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Profile;