import React from 'react';
import PerfumeDetail from '../components/PerfumeDetail';

const PerfumeDetailPage = () => {
  return (
    <div style={styles.container}>
      <PerfumeDetail />
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

export default PerfumeDetailPage;