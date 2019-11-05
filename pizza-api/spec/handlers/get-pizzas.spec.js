/* global describe, it, expect */
'use strict';

const underTest = require('../../handlers/get-pizzas');
const pizzas = [
    {
        id: 1,
        name: 'Capricciosa',
    },
    {
        id: 2,
        name: 'Napoletana',
    },
];

describe('Get pizzas handler', () => {
    it('should return a list of all pizzas if called without pizza ID', () => {
        expect(underTest(undefined, pizzas)).toEqual(pizzas);
    });
    it('should return a single pizza if the existing ID is passed as a first parameter', () => {
        expect(underTest(1, pizzas)).toEqual(pizzas[0]);
        expect(underTest(2, pizzas)).toEqual(pizzas[1]);
    });
    it('should throw an error if non-existing ID is passed', () => {
        expect(() => underTest(0, pizzas)).toThrow(
            new Error('The pizza you requested was not found.')
        );
    });
    it('should throw an error if non-existing ID is passed', () => {
        expect(() => underTest(3, pizzas)).toThrow(
            new Error('The pizza you requested was not found.')
        );
    });
    it('should throw an error if non-existing ID is passed', () => {
        expect(() => underTest(1.5, pizzas)).toThrow(
            new Error('The pizza you requested was not found.')
        );
    });
    it('should throw an error if non-existing ID is passed', () => {
        expect(() => underTest(42, pizzas)).toThrow(
            new Error('The pizza you requested was not found.')
        );
    });
    it('should throw an error if non-existing ID is passed', () => {
        expect(() => underTest('A', pizzas)).toThrow(
            new Error('The pizza you requested was not found.')
        );
    });
    it('should throw an error if non-existing ID is passed', () => {
        expect(() => underTest([], pizzas)).toThrow(
            new Error('The pizza you requested was not found.')
        );
    });
});
