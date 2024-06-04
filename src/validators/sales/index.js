import Joi from "joi";
const salesValidators = {
  create: (req, res, next) => {
    const salesProductschema = Joi.object({
      ProductId: Joi.number().greater(0).required().messages({
        "number.base": "Product Id should be number",
        "number.greater": "Product Id should be greater than 0",
        "any.required": "Product is required",
      }),
      productQuantity: Joi.number().greater(0).required().messages({
        "number.base": "Stock should be number",
        "number.greater": "Stock should be greater than 0",
        "any.required": "Stock is required",
      }),
      productRate: Joi.number().greater(0).required().messages({
        "number.base": "Rate should be number",
        "any.required": "Rate is required",
        "number.greater": "Rate should be greater",
      }),
    });
    const schema = Joi.object({
      salesProducts: Joi.array()
        .items(salesProductschema)
        .min(1)
        .required()
        .messages({
          "array.base": "SalesProducts should be an array",
          "array.min": "Sales Products should contain at least one item",
          "array.includes":
            "Sales Products must only contain valid product objects",
          "any.required": "Sales Products are required",
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
    const salesProductschema = Joi.object({
      ProductId: Joi.number().greater(0).required().messages({
        "number.base": "Product Id should be number",
        "number.greater": "Product Id should be greater than 0",
        "any.required": "Product is required",
      }),
      productQuantity: Joi.number().greater(0).required().messages({
        "number.base": "Stock should be number",
        "number.greater": "Stock should be greater than 0",
        "any.required": "Stock is required",
      }),
    });
    const schema = Joi.object({
      returnedProducts: Joi.array()
        .items(salesProductschema)
        .min(1)
        .required()
        .messages({
          "array.base": "Returned Products should be an array",
          "array.min": "Returned Products should contain at least one item",
          "array.includes":
            "Returned Products must only contain valid product objects",
          "any.required": "Returned Products are required",
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

export default salesValidators;
