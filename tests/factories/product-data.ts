import Chance from 'chance';

const chance = new Chance();

export const productData = {
    "categories": [
        {
            "_id": "alcoolicas",
            "parent": "bebidas",
            "name": "Bebidas Alcoólicas"
        }
    ],
    "name": chance.name(),
    "qty": 30,
    "price": 20.40
};