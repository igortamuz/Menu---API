import Joi from 'joi';

export const productSchema = Joi.object({
  categories: Joi.array().items(Joi.object({
    _id: Joi.string().required(),
    parent: Joi.string().allow('', null),
    name: Joi.string().required(),
  })).required(),
  name: Joi.string().required(),
  qty: Joi.number().integer().min(1).required(),
  price: Joi.number().precision(2).positive().required(),
});

export const productSchemaUpdate = Joi.object({
  categories: Joi.array().items(Joi.object({
    _id: Joi.string(),
    parent: Joi.string().allow('', null),
    name: Joi.string(),
  })),
  name: Joi.string(),
  qty: Joi.number().integer().min(1),
  price: Joi.number().precision(2).positive(),
});
