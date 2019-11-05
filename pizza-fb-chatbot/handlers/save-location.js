'use strict';

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const rp = require('minimal-request-promise');

const DELIVERY_API_URL =
    process.env.DELIVERY_API_URL ||
    'https://some-like-it-hot-api.effortless-serverless.com/delivery';

const WEBHOOK_URL =
    process.env.WEBHOOK_URL ||
    'https://g8fhlgccof.execute-api.eu-central-1.amazonaws.com/latest/delivery';

function saveLocation(userId, coordinates) {
    return docClient
        .scan({
            TableName: 'pizza-orders',
            Limit: 1,
            FilterExpression: 'user = :u, orderStatus: :s',
            ExpressionAttributeNames: {
                ':u': { S: userId },
                ':s': { S: 'in-progress' },
            },
        })
        .promise()
        .then(result => result.Items[0])
        .then(order => {
            return rp
                .post(DELIVERY_API_URL, {
                    headers: {
                        Authorization: 'aunt-marias-pizzeria-1234567890',
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        pickupTime: '15.34pm',
                        pickupAddress: 'Aunt Maria Pizzeria',
                        deliveryCoords: coordinates,
                        webhookUrl: WEBHOOK_URL,
                    }),
                })
                .then(rawResponse => JSON.parse(rawResponse))
                .then(response => {
                    order.deliveryId = response.deliveryId;
                    return order;
                });
        })
        .then(order => {
            return docClient
                .update({
                    TableName: 'pizza-orders',
                    Key: {
                        orderId: order.orderId,
                    },
                    UpdateExpression:
                        'set orderStatus = :s, coords = :c, deliveryId = :d',
                    ExpressionAttributeValues: {
                        ':s': 'pending',
                        ':c': coordinates,
                        ':d': order.deliveryId,
                    },
                    ReturnValues: 'ALL_NEW',
                })
                .promise();
        });
}

module.exports = saveLocation;
