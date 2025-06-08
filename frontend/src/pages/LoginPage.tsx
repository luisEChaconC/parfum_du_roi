import React from 'react';
import LogInForm from '../components/LoginForm';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div style={styles.container}>
      <h1 id="title" style={styles.title}>Perfil</h1>
      <LogInForm />
    </div>
  );
};

const styles: {
  container: React.CSSProperties;
  title: React.CSSProperties;
} = {
  container: {
    padding: '2rem',
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#1e1e1e',
    minHeight: '100vh',
  },
  title: {
    color: '#c59d5f',
  },
};

export default LoginPage;