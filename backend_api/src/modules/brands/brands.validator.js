const Joi = require("joi")
const { Status } = require("../../config/constants")

const createBrandDTO = Joi.object({
    name: Joi.string().min(2).max(50).required() ,
    status: Joi.string().regex(/^(active|inactive)$/).default(Status.INACTIVE),
    logo: Joi.string().allow(null,'').optional().default(null)
})

const updateBrandDTO = Joi.object({
    name: Joi.string().min(2).max(50).optional(),
    status: Joi.string().regex(/^(active|inactive)$/).optional(),
    logo: Joi.string().allow(null,'').optional().default(null)
})

module.exports = {createBrandDTO, updateBrandDTO}