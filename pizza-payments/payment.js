'use strict';

const ApiBuilder = require('claudia-api-builder');
const api = new ApiBuilder();
const paymentRepository = require('./repositories/payment-repository');
const orderRepository = require('./repositories/order-repository');

api.get('/payment-success', request => {
    console.log(request);
    const orderId = 'ORDER-ID';
    return orderRepository.updateOrderStatus(orderId).then(() => {
        return { message: 'success' };
    });
});

api.get('/payment-failure', request => {
    console.log(request);
    return { message: 'failure' };
});

api.get('/charges', request => {
    return paymentRepository.getAllCharges().catch(err => {
        return { message: 'Charges Listing Error', error: err };
    });
});

module.exports = api;
