'use strict';

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const rp = require('minimal-request-promise');

const DELIVERY_API_URL =
    process.env.DELIVERY_API_URL ||
    'https://fake-delivery-api.effortlessserverless.com/delivery';

const WEBHOOK_URL =
    process.env.WEBHOOK_URL ||
    'https://g8fhlgccof.execute-api.eu-central-1.amazonaws.com/latest/delivery';

function createOrder(order) {
    if (!order || !order.pizzaId || !order.address) {
        throw new Error(
            'To order pizza please provide pizza type and address where pizza should be delivered.'
        );
    }

    return rp
        .post(DELIVERY_API_URL, {
            headers: {
                Authorization: 'aunt-marias-pizzeria-1234567890',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                pickupTime: '15.34pm',
                pickupAddress: 'Aunt Maria Pizzeria',
                deliveryAddress: order.address,
                webhookUrl: WEBHOOK_URL,
            }),
        })
        .then(rawResponse => JSON.parse(rawResponse.body))
        .then(response => {
            return docClient
                .put({
                    TableName: 'pizza-orders',
                    Item: {
                        orderId: response.deliveryId,
                        pizza: order.pizza,
                        address: order.address,
                        orderStatus: 'pending',
                    },
                })
                .promise();
        })
        .then(res => {
            console.log('Order is saved!', res);
            return res;
        })
        .catch(error => {
            console.log('Oops, order is not saved :(', error);
            throw error;
        });
}

module.exports = createOrder;
