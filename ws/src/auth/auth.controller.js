import User from "../user/user.model";
import { generateToken } from "../utils/jwt";
import hashPassword from "../utils/password-hash";
import bcrypt from "bcrypt";
import {
  loginValidationSchema,
  registerValidationSchema,
} from "./auth-validation.schema";
const authRegister = async (req, res) => {
  try {
    let { email, password } = req.body;
    const validation = await registerValidationSchema.validate(req.body, {
      abortEarly: false,
    });

    if (validation.error) {
      return res.status(400).json({
        success: false,
        messages: validation.error.details.map((err) => err.message),
      });
    }
    const findUser = await User.findOne({ email });

    if (findUser) {
      return res
        .status(409)
        .json({ success: false, message: "This Email already registered !" });
    }

    password = await hashPassword(password);

    const savedUser = await User.create({ ...req.body, password });

    const savedUserObject = savedUser.toObject();

    delete savedUserObject.password;

    const accessToken = generateToken(savedUser);

    return res.status(201).json({
      success: true,
      message: "User saved successfully",
      data: {
        user: savedUserObject,
        accessToken,
      },
    });
  } catch (error) {
    console.log("Error", error);

    return res
      .status(404)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const authLogin = async (req, res) => {
  const { email, password } = req.body;

  const validation = loginValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (validation.error) {
    return res.status(400).json({
      success: false,
      messages: validation.error.details.map((err) => err.message),
    });
  }
  const findUser = await User.findOne({ email });

  if (
    !findUser ||
    findUser.email !== email ||
    !(await bcrypt.compare(password, findUser.password))
  ) {
    return res
      .status(401)
      .json({ success: false, message: `Email or Password is incorrect` });
  }

  const loginUserObject = findUser.toObject();

  delete loginUserObject.password;

  const accessToken = generateToken(findUser);

  return res.status(201).json({
    success: true,
    message: "User Login successfully",
    data: {
      user: loginUserObject,
      accessToken,
    },
  });
};

export { authRegister, authLogin };
