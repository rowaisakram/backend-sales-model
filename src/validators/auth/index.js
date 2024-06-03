import Joi from "joi";

const authValidators = {
  signUp: (req, res, next) => {
    const strongPasswordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/;
    const schema = Joi.object({
      firstName: Joi.string().min(3).max(20).required().messages({
        "string.base": "First name should be a type of text",
        "string.empty": "First name cannot be empty",
        "string.min": "First name should have at least 3 characters",
        "string.max": "First name should have at most 20 characters",
        "any.required": "First name is required",
      }),
      lastName: Joi.string().min(3).max(20).required().messages({
        "string.base": "Last name should be a type of text",
        "string.empty": "Last name cannot be empty",
        "string.min": "Last name should have at least 3 characters",
        "string.max": "Last name should have at most 20 characters",
        "any.required": "Last name is required",
      }),
      email: Joi.string().email().required().messages({
        "string.base": "Email should be a type of text",
        "string.empty": "Email cannot be empty",
        "string.email": "Email must be a valid email",
        "any.required": "Email is required",
      }),
      password: Joi.string().regex(strongPasswordRegex).required().messages({
        "string.base": "Password should be a type of text",
        "string.empty": "Password cannot be empty",
        "string.pattern.base":
          "Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length",
        "any.required": "Password is required",
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
  signIn: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.required().messages({
        "any.required": "Email is required",
      }),
      password: Joi.required().messages({
        "any.required": "Password is required",
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
export default authValidators;
