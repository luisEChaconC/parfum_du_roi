import React, { useState } from 'react';
import './SignInForm.css';

interface FormData {
  nombre: string;
  ubicacion: string;
  correo: string;
  contraseña: string;
  confirmarContraseña: string;
}

const passwordRules = [
  { label: '8+ caracteres', test: (p: string) => p.length >= 8 },
  { label: '1 mayúscula (A–Z)', test: (p: string) => /[A-Z]/.test(p) },
  { label: '1 minúscula (a–z)', test: (p: string) => /[a-z]/.test(p) },
  { label: '1 dígito o carácter especial', test: (p: string) => /[\d\W]/.test(p) },
];

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
  const [passwordProgress, setPasswordProgress] = useState(0);
  const [passwordError, setPasswordError] = useState('');

  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    const progress = passwordRules.reduce(
      (acc, rule) => acc + (rule.test(password) ? 1 : 0),
      0
    );
    setPasswordProgress(progress);

    const secure = progress === passwordRules.length;
    setPasswordError(secure ? '' : 'La contraseña no cumple los requisitos.');
    return secure;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });

    if (name === 'contraseña') {
      validatePassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.nombre.trim()) newErrors.nombre = 'Nombre requerido';
    if (!formData.ubicacion.trim()) newErrors.ubicacion = 'Ubicación requerida';
    if (!formData.correo.trim()) newErrors.correo = 'Correo requerido';
    else if (!validarEmail(formData.correo)) newErrors.correo = 'Correo inválido';
    if (!formData.contraseña) newErrors.contraseña = 'Contraseña requerida';
    else if (!validatePassword(formData.contraseña)) newErrors.contraseña = 'La contraseña no cumple los requisitos.';
    if (formData.contraseña !== formData.confirmarContraseña)
      newErrors.confirmarContraseña = 'Las contraseñas no coinciden';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccessMessage('');
      return;
    }

    try {
      // Paso 1: Obtener token CSRF
      const csrfResponse = await fetch("http://localhost:8080/csrf-token", {
        credentials: "include",
      });
      const { csrfToken } = await csrfResponse.json();

      // Paso 2: Enviar solicitud POST con token CSRF y cookies
      const response = await fetch("http://localhost:8080/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        credentials: "include", 
        body: JSON.stringify({
          email: formData.correo,
          password: formData.contraseña,
          fullName: formData.nombre,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al registrar usuario");
      }

      const data = await response.json();
      console.log("Usuario creado:", data);
      setSuccessMessage("¡Usuario registrado correctamente!");

      setFormData({
        nombre: '',
        ubicacion: '',
        correo: '',
        contraseña: '',
        confirmarContraseña: '',
      });
      setErrors({});
      setPasswordProgress(0);
      setPasswordError('');

    } catch (error: any) {
      setErrors({ correo: error.message });
      setSuccessMessage('');
    }
  };

  return (
    <div className="registro-layout">
      <div className="registro-imagen">
        <img src="../img/Registro.png" alt="Registro visual" />
      </div>
      <div className="registro-container">
        <p>Registro</p>
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
              placeholder="Debe cumplir los requisitos"
            />
            {errors.contraseña && <div className="error-text">{errors.contraseña}</div>}

            <div className="progress-wrapper">
              <div
                className="progress-bar"
                style={{ width: `${(passwordProgress / passwordRules.length) * 100}%` }}
              ></div>
            </div>

            <ul className="checklist">
              {passwordRules.map((rule, i) => (
                <li key={i} className={rule.test(formData.contraseña) ? 'ok' : 'ko'}>
                  {rule.test(formData.contraseña) ? '✓' : '✗'} {rule.label}
                </li>
              ))}
            </ul>

            {passwordError && <div className="error-text">{passwordError}</div>}
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
    </div>
  );
};

export default SignInForm;
