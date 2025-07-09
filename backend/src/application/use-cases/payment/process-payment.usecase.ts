import { PaymentDTO } from '../../dtos/payment/payment.dto';
import { IProcessPaymentUseCase } from '@application/ports/use-cases/payment/process-payment.use-case.interface';
import * as fs from 'fs';
import * as path from 'path';

export class ProcessPaymentUseCase implements IProcessPaymentUseCase {
  private binsValidos: Set<string>;

  constructor() {
    const binsPath = path.resolve('bins.json');

    if (!fs.existsSync(binsPath)) {
      throw new Error('El archivo bins.json no fue encontrado en la raíz del proyecto.');
    }

    const bins: string[] = JSON.parse(fs.readFileSync(binsPath, 'utf8'));
    this.binsValidos = new Set(bins);
  }

  execute(data: PaymentDTO): { aprobado: boolean; mensaje: string } {
    const { numeroTarjeta, fechaExpiracion, cvc, moneda } = data;

    if (!/^\d{16}$/.test(numeroTarjeta)) {
      return { aprobado: false, mensaje: 'Número de tarjeta inválido.' };
    }

    const bin = numeroTarjeta.substring(0, 6);
    if (!this.binsValidos.has(bin)) {
      return { aprobado: false, mensaje: 'El BIN no pertenece a un banco de CR.' };
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(fechaExpiracion)) {
      return { aprobado: false, mensaje: 'Formato de fecha inválido. Use MM/AA.' };
    }

    const [mesStr, anioStr] = fechaExpiracion.split('/');
    const fecha = new Date(Number(`20${anioStr}`), Number(mesStr));
    const fechaActual = new Date();
    fecha.setDate(1); // Para comparar inicio de mes
    fechaActual.setDate(1);
    if (fecha <= fechaActual) {
      return {
        aprobado: false,
        mensaje: 'La tarjeta está expirada o muy próxima a vencer.',
      };
    }

    const marca = this.detectarMarca(numeroTarjeta);

    if (marca === 'Amex' && !/^\d{4}$/.test(cvc)) {
      return { aprobado: false, mensaje: 'CVC inválido para American Express.' };
    }

    if ((marca === 'Visa' || marca === 'MasterCard') && !/^\d{3}$/.test(cvc)) {
      return { aprobado: false, mensaje: 'CVC inválido para Visa o MasterCard.' };
    }

    if (!['CRC', 'USD'].includes(moneda)) {
      return { aprobado: false, mensaje: 'Moneda inválida.' };
    }

    return { aprobado: true, mensaje: 'Transacción aprobada.' };
  }

  private detectarMarca(numero: string): 'Visa' | 'MasterCard' | 'Amex' | 'Desconocida' {
    if (numero.startsWith('34') || numero.startsWith('37')) return 'Amex';
    if (numero.startsWith('4')) return 'Visa';
    if (numero.startsWith('5')) return 'MasterCard';
    return 'Desconocida';
  }
}
