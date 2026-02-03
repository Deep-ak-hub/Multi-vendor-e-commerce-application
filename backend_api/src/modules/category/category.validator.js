const Joi = require("joi")
const { Status } = require("../../config/constants")

const createCategoryDTO = Joi.object({
    name: Joi.string().required(),
    status: Joi.string().regex(/^(active|inactive)$/).default(Status.INACTIVE),
    parent: Joi.string().optional().allow(null, "").default(null),
    brands: Joi.array().items(Joi.string().optional().allow(null,'').default(null)).allow(null,'').default(null),
    image: Joi.string().allow(null,'').optional().default(null)
})

const updateCategoryDTO = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().allow(null,'').optional().default(null)
})

module.exports = {createCategoryDTO, updateCategoryDTO}

