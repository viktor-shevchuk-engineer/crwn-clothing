import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import Stripe from 'stripe';

if (process.env.NODE_ENV !== 'production') {
  const dotenv = await import('dotenv');
  dotenv.config();
}

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, (error) => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});

app.post('/payment', (request, response) => {
  debugger;
  const {
    body: {
      token: { id },
      amount,
    },
  } = request;

  const body = {
    source: id,
    amount: amount,
    currency: 'usd',
  };

  const { charges } = stripe;
  charges.create(body, (stripeError, stripeResponse) =>
    stripeError
      ? response.status(500).send({ error: stripeError })
      : response.status(200).send({ success: stripeResponse })
  );
});
