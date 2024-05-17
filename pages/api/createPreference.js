import { MercadoPagoConfig, Preference } from 'mercadopago';

// Configura Mercado Pago con tu access token
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

export default async function handler(req, res) {

    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            id: 'donacion',
            title: 'Hola',
            quantity: 1,
            unit_price: 1000,
          }
        ],
        back_urls: {
          success: "http://localhost:3000"
        },
        auto_return: 'approved',
      }
    });

    const redirectUrl = preference.sandbox_init_point;
    res.status(200).json({ redirectUrl });
}
