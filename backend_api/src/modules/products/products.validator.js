const Joi = require("joi");
const { Status } = require("../../config/constants");

const RegisterProductDTO = Joi.object({
  name: Joi.string().min(3).max(200).required(),
  description: Joi.string().required(),
  price: Joi.number().min(1000).required(),
  discount: Joi.number().min(0).max(90).default(0),
  afterDiscount: Joi.number().required(),
  category: Joi.string().optional().allow(null, "").default(null),
  brand: Joi.string().optional().allow("", null).default(null),
  seller: Joi.string().required(),
  status: Joi.string().regex(/^(active|inactive)$/).default(Status.INACTIVE),
  isFeatured: Joi.boolean().optional().default(false),
  images: Joi.string().allow(null, "").optional().default(null),
});

const UpdateProductDTO = Joi.object({
  name: Joi.string().min(3).max(200).optional(),
  description: Joi.string().optional(),
  price: Joi.number().min(1000).optional(),
  discount: Joi.number().min(0).max(90).optional(),
  category: Joi.string().optional().allow(null, "").optional(),
  brand: Joi.string().optional().allow("", null).optional(),
  seller: Joi.string().optional(),
  status: Joi.string().regex(/^(active|inactive)$/).optional(),
  isFeatured: Joi.boolean().optional(),
  images: Joi.string().allow(null, "").optional().default(null),
}).min(1).messages({
    "object.min": "At least one field is required to update the product"
});

module.exports = { RegisterProductDTO, UpdateProductDTO };
