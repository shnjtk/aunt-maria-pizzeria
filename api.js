'use strict';

const Api = require('claudia-api-builder');
const api = new Api();

const getPizzas = require('./handlers/get-pizzas');
const getOrders = require('./handlers/get-orders');
const createOrder = require('./handlers/create-order');
const updateOrder = require('./handlers/update-order');
const deleteOrder = require('./handlers/delete-order');
const updateDeliveryStatus = require('./handlers/update-delivery-status');
const getSignedUrl = require('./handlers/generate-presigned-url');

api.registerAuthorizer('userAuthentication', {
    providerARNs: [process.env.USER_POOL_ARN],
});

api.get('/', () => 'Welcome to Aunt Maria Pizzeria API');

api.get('/pizzas', () => {
    return getPizzas();
});

api.get(
    '/pizzas/{id}',
    request => {
        return getPizzas(request.pathParams.id);
    },
    {
        error: 404,
    }
);

api.get(
    '/orders',
    request => {
        return getOrders();
    },
    {
        error: 400,
    }
);

api.get(
    '/orders/{id}',
    request => {
        return getOrders(request.pathParams.id);
    },
    {
        error: 400,
    }
);

api.post(
    '/orders',
    request => {
        return createOrder(request);
    },
    {
        success: 201,
        error: 400,
        cognitoAuthorizer: 'userAuthentication',
    }
);

api.put(
    '/orders/{id}',
    request => {
        return updateOrder(request.pathParams.id, request.body);
    },
    {
        error: 400,
        cognitoAuthorizer: 'userAuthentication',
    }
);

api.delete(
    '/orders/{id}',
    request => {
        return deleteOrder(
            request.pathParams.id,
            request.context.authorizer.claims
        );
    },
    {
        error: 400,
        cognitoAuthorizer: 'userAuthentication',
    }
);

api.post(
    '/delivery',
    request => {
        return updateDeliveryStatus(request.body);
    },
    {
        success: 200,
        error: 400,
        cognitoAuthorizer: 'userAuthentication',
    }
);

api.get(
    '/upload-url',
    request => {
        return getSignedUrl();
    },
    {
        error: 400,
        cognitoAuthorizer: 'userAuthentication',
    }
);

module.exports = api;
