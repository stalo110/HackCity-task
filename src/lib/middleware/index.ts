// import { NextFunction, Request, Response } from "express";
// import { Users, UsersModel } from "../../component/Users/model";
// import { Google } from "../../component/Oauth";
// export class AuthMiddleware {
//   static Authenticate =
//     (role: string[]) =>
//     async (req: Request, res: Response, next: NextFunction) => {
//       if (req.user) {
//         const { id, email } = req.user as Google;
//         const user = (await UsersModel.findOne({
//           where: { googleId: id, email },
//         })) as unknown as Users;
//         if (user) {
//           if (role.includes(user.role)) {
//             next();
//           } else {
//             res.status(401).send("Unauthorized");
//           }
//         } else res.status(401).send("Unauthorized");
//       } else {
//         //register
//       }
//     };
// }
