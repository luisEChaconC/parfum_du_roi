import axios from "axios";

export interface PaymentData {
  numeroTarjeta: string;
  fechaExpiracion: string;
  cvc: string;
  moneda: string;
}

export interface PaymentResponse {
  aprobado: boolean;
  mensaje: string;
}

export const processPayment = async (paymentData: PaymentData, csrfToken: string) => {
  const response = await axios.post<PaymentResponse>('/api/payments/validate', paymentData, {
    headers: {
      'X-CSRF-Token': csrfToken
    },
    withCredentials: true 
  });

  return response.data;
};
