import React, { useState, useEffect  } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./PaymentForm.css";
import { useNavigate } from 'react-router-dom';

const PaymentForm: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setname] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
  if (paymentStatus === 'success') {
    // Espera 2 segundos y redirige
    const timeout = setTimeout(() => {
      navigate("/");
    }, 2000);

    // Limpia el timeout si el componente se desmonta antes
    return () => clearTimeout(timeout);
  }
}, [paymentStatus, navigate]);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      name: ''
    };

    let hasError = false;

    if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = "Número de tarjeta inválido. Deben ser 16 dígitos.";
      hasError = true;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      newErrors.expiryDate = "Fecha inválida. Usa el formato MM/AA.";
      hasError = true;
    } else {
      const [month, year] = expiryDate.split('/').map(Number);
      const expiry = new Date(2000 + year, month);
      const now = new Date();
      if (expiry <= now) {
        newErrors.expiryDate = "La tarjeta está vencida.";
        hasError = true;
      }
    }

    if (!/^\d{3}$/.test(cvv)) {
      newErrors.cvv = "CVV inválido. Debe tener 3 o 4 dígitos.";
      hasError = true;
    }


    const esValido = name.trim() !== "" && !/\d/.test(name);
    if (!esValido) {
      newErrors.name = "Nombre invalido";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      setPaymentStatus('error');
      return;
    }

    setErrors({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      name: ''
    });

    setTimeout(() => {
      setPaymentStatus('success');
    }, 1500);
  };

  const handleExpiryChange = (value: string) => {
    let formatted = value.replace(/\D/g, '');
    if (formatted.length > 2) {
      formatted = formatted.slice(0, 2) + '/' + formatted.slice(2, 4);
    }
    setExpiryDate(formatted);
  };

  return (
    <div className="payment-wrapper">
      <div className="payment-container mt-5 mx-auto" style={{ minWidth: '600px' }}>
        <h3 className="text-pay-online mb-4 text-center">Pago en línea</h3>
        <p className='text'>Todas las transacciones son seguras y están encriptadas.</p>
        <form onSubmit={handlePayment}>
          <div className="mb-3">
            <h5 className='text-card'>Agrega una tarjeta de crédito o débito</h5>
            <input
              type="text"
              className="form-control"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, '') // solo números
                const limitedValue = rawValue.slice(0, 16) // máximo 16 números
                const formattedValue = limitedValue.replace(/(.{4})/g, '$1 ').trim() // cada 4 números, espacio
                setCardNumber(formattedValue)
              }}
              autoComplete="cc-number"
              placeholder="Número de Tarjeta"
            />
            {errors.cardNumber && <div className="text-danger small">{errors.cardNumber}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="expiryDate" className="form-label"></label>
            <input
              type="text"
              className="form-control"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => handleExpiryChange(e.target.value)}
              placeholder="Fecha de vencimiento MM/AA"
              maxLength={5}
            />
            {errors.expiryDate && <div className="text-danger small">{errors.expiryDate}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="cvv" className="form-label"></label>
            <input
              type="password"
              className="form-control"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
              maxLength={4}
              placeholder="Código de seguridad"
            />
            {errors.cvv && <div className="text-danger small">{errors.cvv}</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="form-label"></label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="Nombre del titular"
            />
            {errors.name && <div className="text-danger small">{errors.name}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100"
          >
            Pagar
          </button>
        </form>

        {paymentStatus === 'success' && (
          <div className="alert alert-success mt-4 text-center">
            ¡Pago realizado con éxito!
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
