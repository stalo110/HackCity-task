import sequelize from "../../db";
import { DataTypes, Model } from "sequelize";
import { UserModel } from "../Users/model";

export interface Project {
  startDate: Date;
  endDate: Date;
  projectTitle: string;
  description: string;
  priority: "HIGH" | "LOW" | "MED";
  OwnerId: string;
  id: string;
  projectStatus: "Upcoming" | "Ongoing" | "Completed";
  //   Task: string[];
}

export class ProjectModel extends Model<Project> {}

ProjectModel.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    projectStatus: {
      type: DataTypes.ENUM("Upcoming", "Ongoing", "Completed"),
      defaultValue: "Upcoming",
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    projectTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM("HIGH", "LOW", "MED"),
      allowNull: false,
    },
    OwnerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    // Task: {
    //   type: DataTypes.ARRAY(DataTypes.UUID),
    //   allowNull: true,
    // },
  },
  { sequelize, tableName: "project" }
);
UserModel.hasMany(ProjectModel, {
  foreignKey: "OwnerId",
  as: "owner",
  constraints: false,
});

ProjectModel.belongsTo(UserModel, {
  foreignKey: "OwnerId",
  as: "owner",
  constraints: false,
});

//relationship between project and user
// UserModel.belongsToMany(ProjectModel, {
//   through: "members", // Replace with your desired join table name
//   foreignKey: "userId", // Foreign key column in the join table referencing UserModel
//   otherKey: "projectId", // Array column in the join table referencing ProjectModel
//   as: "user",
//   constraints:false
// });

// ProjectModel.belongsToMany(UserModel, {
//   through: "members",
//   foreignKey: "projectId",
//   otherKey: "userId",
//   as: "project",
//   constraints:false
// });
// UserModel.belongsToMany(ProjectModel, {
//   through: "members",
//   foreignKey:"userId",
//   as: "projects",
// });

// ProjectModel.belongsToMany(UserModel, {
//   through: "members",
//   foreignKey: "projectId",
//   as: "users",
// });
