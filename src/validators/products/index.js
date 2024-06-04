import Joi from "joi";

const productValidators = {
  create: (req, res, next) => {
    const schema = Joi.object({
      productName: Joi.string().required().messages({
        "any.required": "Name is required",
        "string.base": "Name should be string",
      }),
      productStock: Joi.number().greater(0).required().messages({
        "number.base": "Stock should be number",
        "number.greater": "Stock should be greater than 0",
        "any.required": "Stock is required",
      }),
      productRate: Joi.number().required().messages({
        "number.base": "Rate should be number",
        "any.required": "Rate is required",
      }),
      categories: Joi.array().items(Joi.number()).min(1).required().messages({
        "array.base": "Categories should be an array",
        "array.min": "Categories should contain at least one item",
        "array.includes": "Categories must only contain numbers",
        "any.required": "Categories are required",
      }),
    });
    const { value, error } = schema.validate(req.body);
    console.log(value);
    if (error) {
      return res.status(400).json({
        message: "Invalid Data",
        error,
      });
    }
    next();
  },
  update: (req, res, next) => {
    const schema = Joi.object({
      productName: Joi.string().messages({
        "string.base": "Name should be string",
      }),
      productStock: Joi.number().greater(0).messages({
        "number.base": "Stock should be number",
        "number.greater": "Stock should be greater than 0",
      }),
      productRate: Joi.number().messages({
        "number.base": "Rate should be number",
      }),
      categories: Joi.array().items(Joi.number()).min(1).messages({
        "array.base": "Categories should be an array",
        "array.min": "Categories should contain at least one item",
        "array.includes": "Categories must only contain numbers",
      }),
    });
    const { value, error } = schema.validate(req.body);
    console.log(value);
    if (error) {
      return res.status(400).json({
        message: "Invalid Data",
        error,
      });
    }
    next();
  },
};

export default productValidators;
