/* global describe, it, expect */
'use strict';

const underTest = require('../api');

describe('API', () => {
    [
        {
            path: '',
            requestTypes: ['GET'],
        },
        {
            path: 'pizzas',
            requestTypes: ['GET'],
        },
        {
            path: 'pizzas/{id}',
            requestTypes: ['GET'],
        },
        {
            path: 'orders',
            requestTypes: ['GET', 'POST'],
        },
        {
            path: 'orders/{id}',
            requestTypes: ['GET', 'PUT', 'DELETE'],
        },
        {
            path: 'delivery',
            requestTypes: ['POST'],
        },
        {
            path: 'upload-url',
            requestTypes: ['GET'],
        },
    ].forEach(route => {
        it(`should setup /${route.path} route`, () => {
            expect(
                Object.keys(underTest.apiConfig().routes[route.path])
            ).toEqual(route.requestTypes);
        });
    });
});
