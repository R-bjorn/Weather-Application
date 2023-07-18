const express = require('express');
const router = express.Router();
const stripe =  require('stripe')
    ('sk_test_51NUrfgD90vK9yhfdR9QOlKsvMcXSd3OZ2swXzQnZc2RQr2ra1zddjZ3jawMUGVwvrMfD2nfEy4Mdyzi0IhVgVHir00aqLdgTNj');

router.post('/intents', async (req, res) => {
    try {
        const customer = await stripe.customers.create();
        const ephemeralKey = await stripe.ephemeralKeys.create(
            {customer: customer.id},
            {apiVersion: '2022-11-15'}
        );
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'usd',
            customer: customer.id,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: customer.id,
            publishableKey: "pk_test_51NUrfgD90vK9yhfdi1ynlA7pQFSVIxzrjWBbgEuGpjLjJ20RkgaKZqbcDzQ3p8oTPsmrX1VdeCfYCcVGMldQy5fw00syggW8a1"
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

module.exports = router;