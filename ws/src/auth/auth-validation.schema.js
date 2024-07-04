import Joi from "joi";

export const registerValidationSchema = Joi.object({
  fullName: Joi.string().trim().required().min(4).max(20).messages({
    "string.base": "fullName must be a string",
    "string.empty": "fullName is required",
    "string.min": "fullName must be at least 4 characters long",
    "string.max": "fullName cannot exceed 20 characters",
    "any.required": "fullName is required",
  }),
  password: Joi.string()
    .trim()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z]).+$"))
    .required()
    .messages({
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must include both uppercase and lowercase letters",
      "any.required": "Password is required",
    }),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email address",
      "string.empty": "Email address cannot be empty",
      "any.required": "Email address is required",
    }),
});

export const loginValidationSchema = Joi.object({
  password: Joi.string()
    .trim()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z]).+$"))
    .required()
    .messages({
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must include both uppercase and lowercase letters",
      "any.required": "Password is required",
    }),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email address",
      "string.empty": "Email address cannot be empty",
      "any.required": "Email address is required",
    }),
});
