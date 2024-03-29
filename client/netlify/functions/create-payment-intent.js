require('dotenv').config();
const stripe = require()(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { body } = event;
    const { amount } = JSON.parse(body);
    const { paymentIntents } = stripe;
    const paymentIntent = paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    return { statusCode: 200, body: JSON.stringify({ paymentIntent }) };
  } catch (error) {
    console.log({ error });

    return { status: 400, body: JSON.stringify({ error }) };
  }
};
