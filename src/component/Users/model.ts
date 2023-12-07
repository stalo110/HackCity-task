import { Model, DataTypes } from "sequelize";
import sequelize from "../../db";

export interface Users {
  id: string;
  usersId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  forgotPassword: string;
  dateOfBirth: Date;

}

export class UsersModel extends Model<Users> {}

UsersModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    usersId: {
      type: DataTypes.UUID,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
 
  phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  
      forgotPassword: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { sequelize, tableName: "User" }
);

