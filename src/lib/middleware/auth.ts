import { NextFunction, Request, Response } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { User, UserModel } from "../../component/Users/model";

export class AuthMiddleware {
  static Authenticate =
    (auth: string[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.headers["authorization"] as string;

        if (!token) {
          return res
            .status(401)
            .json({ error: "unauthorized, no token provided" });
        }
        const verified = Jwt.verify(token, process.env.JWT_SECRET!);
        if (!verified) {
          return res.status(401).json({ error: "unauthorized" });
        }

        const { id, exp } = verified as JwtPayload;
        const user = (await UserModel.findOne({
          where: { id },
        })) as unknown as User;
        if (!user) {
          return res.status(401).json({ error: "unauthorized" });
        }
        if (exp !== undefined) {
          const currentTimeInSeconds = Math.floor(Date.now() / 1000);

          // Check if the token has expired by comparing the expiration time with the current time
          const isTokenExpired = currentTimeInSeconds >= exp;

          if (isTokenExpired) {
            return res.status(401).json({ error: "Token expired" });
          }
        }

        // Get the current time in seconds since the UNIX epoch

        if (!auth.includes(user.role)) {
          return res.status(401).json({ error: "Unauthorized" });
        }
        req.user = user.id;
        next();
      } catch (error) {
        return res.status(500).json({ error });
      }
    };
}
