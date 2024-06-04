import Joi from "joi";

const categoryValidators = {
  create: (req, res, next) => {
    const schema = Joi.object({
      categoryName: Joi.string().required().messages({
        "any.required": "Name is required",
        "string.base": "Name should be string",
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

export default categoryValidators;
