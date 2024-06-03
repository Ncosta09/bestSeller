import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

export async function POST(request) {
    try {
        const body = await request.json();
        const paymentId = body.data.id;

        const payment = await new Payment(client).get({ id: paymentId });

        const pago = {
            id: payment.id,
            amount: payment.transaction_amount,
            date: payment.date_created,
        };

        console.log(pago);

        return NextResponse.json({ success: true, pago });
    } catch (error) {
        console.error('Error fetching payment:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
