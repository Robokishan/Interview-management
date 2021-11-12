import { sign } from "jsonwebtoken";
var bcrypt = require("bcrypt");
var config = require("../../config/config");

interface Verified {
  isValid: boolean;
  id: any;
  email: any;
}

function verifyPassword(password: string, user: any): Promise<Verified> {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve({ isValid: result, id: user.id, email: user.email });
      }
    });
  });
}

const createAccessToken = (user): string => {
  return sign(
    {
      userId: user.id,
      email: user.email,
      user_name: user.user_name,
    },
    config.SECRET,
    {
      expiresIn: config.JWT_EXPIRATION,
    }
  );
};

export { verifyPassword, createAccessToken };
