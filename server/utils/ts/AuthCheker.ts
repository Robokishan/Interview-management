import { AuthChecker } from "type-graphql";
import jwt from "jsonwebtoken";
import config from "../../config/config";
export const customAuthChecker: AuthChecker = async (
  { root, args, context, info },
  roles
) => {
  // here we can read the user from context
  // and check his permission in the db against the `roles` argument
  // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
  const { req, res } = context as any;
  const authorization = req.headers["authorization"];
  if (!authorization && !req.cookies.token) {
    var message =
      process.env.NODE_ENV === "production"
        ? "Page Not found"
        : "Please mention authorizatin token";
  }

  //get the token from authorization : Bearer <token>
  var token = null;
  try {
    if (req.cookies.token) {
      token = req.cookies.token;
    }
  } catch (error) {
    console.error("auth error", error);
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, config.SECRET) as any;
      //   no need it is just to check if user has changed password nor not
      //   const user = await Users.findOne({ id: decoded.userId });
      //   req.userId = decoded.userId;
      (context as any).req = {
        ...req,
        userId: decoded.userId,
        owner: decoded,
      };
    } catch (Err) {
      console.log("Err", Err);
    }
  }
  if (!!!token) throw new Error("Authorization error");
  return !!token;
};
