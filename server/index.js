// const express = require('express')
// const stripe = require('stripe')
// const cors = require('cors')

import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';

const app = express()


// esta clave se encuentra la cuenta de stripe:https://dashboard.stripe.com/test/apikeys
const stripe = new Stripe("clave")

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.post('/api/checkout', async (req, res) => {

    try {

        const payment = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'USD',
            description: "Pruebas",
            payment_method: req.body.id,
            confirm: true
        })
        console.log(payment)
        res.send({ message: 'Successull payment' })
    } catch (error) {

        console.log(error)
    }

})

app.listen(3001, () => {
    console.log('Server on port', 3001)
})