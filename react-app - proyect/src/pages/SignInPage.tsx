import React from 'react';
import SignInForm from '../components/SignInForm';

const SignInPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Registrarse</h1>
      <SignInForm />
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

export default SignInPage;