// import { Model, DataTypes } from "sequelize";
// import sequelize from "../../db";
// import { UserModel } from "../Users/model";


// export interface PayRise {
//   id: string;
//   employeeId: string;
//   firstName: string;
//   lastName: string;
//   DateOfHire: Date;
//   currentPay: number;
//   proposedPay: number;
//   reasons: string;
//   attachments: string;
//   userId: string;
// }

// export class PostModel extends Model<Post> {}

// PostModel.init(
//   {
//     id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       primaryKey: true,
//     },
//     userId: {
//       type: DataTypes.UUID,
//     },
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     lastName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },

//     employeeId: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },

//     DateOfHire: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     currentPay: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     proposedPay: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     reasons: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     attachments: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },

//   },
//   { sequelize, tableName: "PayRise" }
// );

// UserModel.hasMany(PostModel, {
//   foreignKey: "userId",
//   as: "PayRise",
//   constraints: false,
// });

// PostModel.belongsTo(UserModel, {
//   foreignKey: "userId",
//   as: "user",
//   constraints: false,
// });
