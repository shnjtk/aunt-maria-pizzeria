'use strict';

const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));
const docClient = new AWS.DynamoDB.DocumentClient();
const rp = require('minimal-request-promise');

const DELIVERY_API_URL =
    process.env.DELIVERY_API_URL ||
    'https://fake-delivery-api.effortlessserverless.com/delivery';

const WEBHOOK_URL =
    process.env.WEBHOOK_URL ||
    'https://g8fhlgccof.execute-api.eu-central-1.amazonaws.com/latest/delivery';

function createOrder(request) {
    console.log('Save an order', request.body);
    const userData = request.context.authorizer.claims;
    console.log('User data', userData);

    let userAddress = request.body && request.body.address;
    if (!userAddress) {
        userAddress = JSON.parse(userData.address).formatted;
    }

    if (!request.body || !request.body.pizzaId || !userAddress) {
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
                deliveryAddress: userAddress,
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
                        address: userAddress,
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
