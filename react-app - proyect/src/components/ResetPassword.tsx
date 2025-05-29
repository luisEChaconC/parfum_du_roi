import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { validateToken, invalidateToken } from '../utils/tokenUtils';
import './ResetPassword.css';

const passwordRules = [
  { label: '8+ caracteres', test: (p: string) => p.length >= 8 },
  { label: '1 mayúscula (A–Z)', test: (p: string) => /[A-Z]/.test(p) },
  { label: '1 minúscula (a–z)', test: (p: string) => /[a-z]/.test(p) },
  { label: '1 dígito o carácter especial', test: (p: string) => /[\d\W]/.test(p) },
];

const ResetPassword: React.FC = () => {
  const [params] = useSearchParams();
  const token = params.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [ready, setReady] = useState(false);
  const [shake, setShake] = useState(false);
  const [passwordProgress, setPasswordProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const email = validateToken(token);
    if (!email) setError('El enlace no es válido o ha expirado.');
    else setReady(true);
  }, [token]);

  useEffect(() => {
    const progress = passwordRules.reduce(
      (acc, rule) => acc + (rule.test(password) ? 1 : 0),
      0
    );
    setPasswordProgress(progress);
  }, [password]);

  const isSecure = passwordProgress === passwordRules.length;

  const handleChange = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!isSecure) return setError('La contraseña no cumple los requisitos.');
    if (password !== confirm) return setError('Las contraseñas no coinciden.');

    const registros = JSON.parse(localStorage.getItem('registros') || '[]');
    const user = registros.find((u: any) => u.correo === validateToken(token));
    if (!user) return setError('Usuario no encontrado.');
    user.contraseña = password;
    localStorage.setItem('registros', JSON.stringify(registros));

    invalidateToken(token);
    setSuccess(true);

    setTimeout(() => {
      navigate('/login', {
        state: { success: 'Contraseña actualizada. Inicia sesión.' },
      });
    }, 2000); // Espera 2 segundos antes de redirigir
  };

  useEffect(() => {
    if (error) {
      setShake(true);
      const timeout = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  if (error && !ready) return <p className="error-message">{error}</p>;
  if (!ready) return <p className="loading-message">Cargando…</p>;

  return (
    <div className="reset-page">
      <div className={`reset-container ${shake ? 'shake' : ''}`}>
        <h2>Cambiar contraseña</h2>

        <div className="progress-wrapper">
          <div
            className="progress-bar"
            style={{
              width: `${(passwordProgress / passwordRules.length) * 100}%`,
            }}
          ></div>
        </div>

        <ul className="checklist">
          {passwordRules.map((rule, i) => (
            <li key={i} className={rule.test(password) ? 'ok' : 'ko'}>
              {rule.test(password) ? '✓' : '✗'} {rule.label}
            </li>
          ))}
        </ul>

        <form onSubmit={handleChange}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button className="boton-elegante">Guardar</button>
        </form>
      </div>

      {success && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>✅ Contraseña actualizada</h3>
            <p>Serás redirigido en unos segundos…</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;