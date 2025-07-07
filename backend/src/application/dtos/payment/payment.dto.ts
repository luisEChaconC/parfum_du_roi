export interface PaymentDTO {
  numeroTarjeta: string;
  fechaExpiracion: string; // formato MM/AA
  cvc: string;
  moneda: 'CRC' | 'USD';
}