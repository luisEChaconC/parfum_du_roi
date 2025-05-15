import React, { useState } from 'react';
import './LoginForm.css';

const EyeIcon = ({ open = true }) => (
  open ? (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17.94 17.94a10.94 10.94 0 0 1-11.88 0" />
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
    </svg>
  )
);

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [shake, setShake] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'El correo es obligatorio.';
    } else if (!validateEmail(email)) {
      newErrors.email = 'El correo no tiene un formato válido.';
    }

    if (!password.trim()) {
      newErrors.password = 'La contraseña es obligatoria.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setShake(true);
      setTimeout(() => setShake(false), 500); // dura igual que la animación
      return;
    }

    console.log('Formulario válido. Enviando datos...');
    // Aquí puedes continuar con el envío al backend
  };

  return (
    <main>
      <div className="title-wrapper">
        <p className="subtitle">Por favor, ingresa tu correo y contraseña para continuar</p>
      </div>

      <div className="form-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className={`form-group ${errors.email ? 'has-error' : ''} ${shake ? 'shake' : ''}`}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              autoComplete="email"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className={`form-group password-group ${errors.password ? 'has-error' : ''} ${shake ? 'shake' : ''}`}>
            <label htmlFor="password">Contraseña</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Inserta tu contraseña"
                autoComplete="current-password"
                className={errors.password ? 'input-error' : ''}
              />
              <button
                type="button"
                className={`toggle-password ${showPassword ? 'active' : ''}`}
                onClick={togglePassword}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                <EyeIcon open={!showPassword} />
              </button>
            </div>
            {errors.password && <p className="error-message">{errors.password}</p>}
            <a href="#" className="forgot-password-inline">
              <u>¿Olvidaste tu contraseña?</u>
            </a>
          </div>

          <p className="register">
            ¿No tienes cuenta?
            <a href="#" className="register-link"> Regístrate</a>
          </p>

          <button type="submit" className="boton-elegante">Entrar</button>
        </form>
      </div>
    </main>
  );
};

export default LoginForm;