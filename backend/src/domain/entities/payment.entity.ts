export class Payment {
    constructor(
        public cardNumber: string,
        public expirationDate: string, // MM/AA
        public cvc: string,
        public currency: 'CRC' | 'USD',
        public amount: number
    ) {}
}