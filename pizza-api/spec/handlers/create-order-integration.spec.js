/* global jasmine, beforeAll, afterAll, beforeEach, afterEach, describe, it, expect */
'use strict';

const underTest = require('../../handlers/create-order');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB({
    apiVersion: '2012-08-10',
    region: 'ap-northeast-1',
});
const https = require('https');
const fakeHttpRequest = require('fake-http-request');

const tableName = `pizzaOrderTest${new Date().getTime()}`;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

describe('Create order (integration)', () => {
    beforeAll(done => {
        const params = {
            AttributeDefinitions: [
                {
                    AttributeName: 'orderId',
                    AttributeType: 'S',
                },
            ],
            KeySchema: [
                {
                    AttributeName: 'orderId',
                    KeyType: 'HASH',
                },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
            },
            TableName: tableName,
        };
        dynamoDb
            .createTable(params)
            .promise()
            .then(() =>
                dynamoDb
                    .waitFor('tableExists', {
                        TableName: tableName,
                    })
                    .promise()
            )
            .then(done)
            .catch(done.fail);
    });

    afterAll(done => {
        dynamoDb
            .deleteTable({
                TableName: tableName,
            })
            .promise()
            .then(() =>
                dynamoDb
                    .waitFor('tableNotExists', {
                        TableName: tableName,
                    })
                    .promise()
            )
            .then(done)
            .catch(done.fail);
    });

    beforeEach(() =>
        fakeHttpRequest.install({
            type: 'https',
            matcher: /fake-delivery-api/,
        })
    );

    afterEach(() => fakeHttpRequest.uninstall('https'));

    it('should save the order in the DynamoDB table if Some Like It Hot delivery API request was successful', done => {
        underTest(
            {
                context: { authorizer: { claims: '' } },
                body: { pizzaId: 1, address: '221b Baker Street' },
            },
            tableName
        )
            .then(() => {
                const params = {
                    Key: {
                        orderId: {
                            S: 'order-id-from-delivery-api',
                        },
                    },
                    TableName: tableName,
                };

                dynamoDb
                    .getItem(params)
                    .promise()
                    .then(result => {
                        console.log(result);
                        expect(result.Item.orderId.S).toBe(
                            'order-id-from-delivery-api'
                        );
                        expect(result.Item.address.S).toBe('221b Baker Street');
                        expect(result.Item.pizza.N).toBe('1');
                        done();
                    })
                    .catch(done.fail);
            })
            .catch(done.fail);

        https.request.pipe(() =>
            https.request.calls[0].respond(
                200,
                'Ok',
                JSON.stringify({
                    deliveryId: 'order-id-from-delivery-api',
                    pizza: 1,
                })
            )
        );
    });
});
