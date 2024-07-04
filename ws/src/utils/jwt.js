import jwt from "jsonwebtoken";

export const generateToken = ({ _id, fullName, email }) => {
  return jwt.sign({ _id, fullName, email }, process.env.ACCESS_TOKEN, {
    expiresIn: "8h",
    algorithm: "HS512",
  });
};
