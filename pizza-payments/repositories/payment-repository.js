'use strict';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = {
    getAllCharges: function() {
        return stripe.charges.list().then(response => response.data);
    },
};
