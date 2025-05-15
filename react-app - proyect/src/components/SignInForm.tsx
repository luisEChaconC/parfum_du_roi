import React, { useState } from 'react';
import './SignInForm.css';

interface FormData {
  nombre: string;
  ubicacion: string;
  correo: string;
  contraseña: string;
  confirmarContraseña: string;
}

const SignInForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    ubicacion: '',
    correo: '',
    contraseña: '',
    confirmarContraseña: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState('');

  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.nombre.trim()) newErrors.nombre = 'Nombre requerido';
    if (!formData.ubicacion.trim()) newErrors.ubicacion = 'Ubicación requerida';
    if (!formData.correo.trim()) newErrors.correo = 'Correo requerido';
    else if (!validarEmail(formData.correo)) newErrors.correo = 'Correo inválido';
    if (!formData.contraseña) newErrors.contraseña = 'Contraseña requerida';
    if (formData.contraseña !== formData.confirmarContraseña)
      newErrors.confirmarContraseña = 'Las contraseñas no coinciden';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccessMessage('');
      return;
    }

    const registros = JSON.parse(localStorage.getItem('registros') || '[]');
    registros.push(formData);
    localStorage.setItem('registros', JSON.stringify(registros));

    setSuccessMessage('¡Usuario registrado correctamente!');
    setFormData({
      nombre: '',
      ubicacion: '',
      correo: '',
      contraseña: '',
      confirmarContraseña: '',
    });
    setErrors({});
  };

  return (
    <div className="registro-container">
      <p>Ingresa los datos pertinentes</p>
      <form onSubmit={handleSubmit}>
        <div className={`form-group ${errors.nombre ? 'error' : ''}`}>
          <label>Nombre completo</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ejm: Daniel Cabezas"
          />
          {errors.nombre && <div className="error-text">{errors.nombre}</div>}
        </div>

        <div className={`form-group ${errors.ubicacion ? 'error' : ''}`}>
          <label>Ubicación</label>
          <input
            type="text"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            placeholder="Ejm: Ciudad, País"
          />
          {errors.ubicacion && <div className="error-text">{errors.ubicacion}</div>}
        </div>

        <div className={`form-group ${errors.correo ? 'error' : ''}`}>
          <label>Correo electrónico</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
          />
          {errors.correo && <div className="error-text">{errors.correo}</div>}
        </div>

        <div className={`form-group ${errors.contraseña ? 'error' : ''}`}>
          <label>Contraseña</label>
          <input
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            placeholder="Mínimo 6 caracteres"
          />
          {errors.contraseña && <div className="error-text">{errors.contraseña}</div>}
        </div>

        <div className={`form-group ${errors.confirmarContraseña ? 'error' : ''}`}>
          <label>Confirmar contraseña</label>
          <input
            type="password"
            name="confirmarContraseña"
            value={formData.confirmarContraseña}
            onChange={handleChange}
            placeholder="Repite la contraseña"
          />
          {errors.confirmarContraseña && (
            <div className="error-text">{errors.confirmarContraseña}</div>
          )}
        </div>

        <button type="submit">Registrarse</button>
        {successMessage && <div className="success-message">{successMessage}</div>}
      </form>
    </div>
  );
};

export default SignInForm;