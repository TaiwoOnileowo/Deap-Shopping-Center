// (app/payment/route.js)
import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  // const data = res;
  const body = await req.json();
  // const bodyRes= await req
  // console.log(req)
  // console.log(body)
  const params = {
    submit_type: 'pay',
    mode: 'payment',
    payment_method_types: ['card'],
    billing_address_collection: 'auto',
    shipping_options: [
      { shipping_rate: 'shr_1OjlGQKhZyalbaHqbn5z7UcZ' },
      { shipping_rate: 'shr_1OjlKLKhZyalbaHqiecGgMMq' },
    ],
    line_items:body.map((item) => {
      const img = item.image[0].asset._ref;
      const newImage = img.replace('image-', 'https://cdn.sanity.io/images/vfxfwnaw/production/').replace('-webp', '.webp');

      return {
        price_data: { 
          currency: 'usd',
          product_data: { 
            name: item.name,
            images: [newImage],
          },
          unit_amount: item.price * 100,
        },
        adjustable_quantity: {
          enabled:true,
          minimum: 1,
        },
        quantity: item.quantity
      }
    }),
    success_url: `http://localhost:3000/success`,
    cancel_url: `http://localhost:3000/`,
  }
    const session = await stripe.checkout.sessions.create(params);
    return NextResponse.json({url:session.url})
  // try {
  //   res.status(200).json({ session });
  // } catch (error) {
  //   res.status(error.statusCode || 500).json({ error: error.message });
  // }
}
