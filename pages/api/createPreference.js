import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

export default async function handler(req, res) {

    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            id: 'compra',
            title: 'Eloquent JavaScript',
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