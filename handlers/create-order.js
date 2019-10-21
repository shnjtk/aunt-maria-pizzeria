'use strict';

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const uuidv4 = require('uuid');

function createOrder(order) {
    if (!order || !order.pizzaId || !order.address) {
        throw new Error(
            'To order pizza please provide pizza type and address where pizza should be delivered.'
        );
    }

    return docClient
        .put({
            TableName: 'pizza-orders',
            Item: {
                orderId: uuidv4(),
                pizza: order.pizza,
                address: order.address,
                orderStatus: 'pending',
            },
        })
        .promise()
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
