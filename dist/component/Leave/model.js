"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveModel = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../db"));
const model_1 = require("../User/model");
var EmploymentStatus;
(function (EmploymentStatus) {
    EmploymentStatus["INTERN"] = "INTERN";
    EmploymentStatus["MEMBER"] = "MEMBER";
    EmploymentStatus["TEAM_LEAD"] = "TEAM_LEAD";
})(EmploymentStatus || (EmploymentStatus = {}));
var Department;
(function (Department) {
    Department["Tech"] = "Tech";
    Department["HR"] = "HR";
    Department["Audit"] = "Audit";
    Department["Finance"] = "Finance";
})(Department || (Department = {}));
var Reason;
(function (Reason) {
    Reason["Managed_Project"] = "Managed_Project";
    Reason["Vacation_Leave"] = "Vacation_Leave";
    Reason["Sick_Leave"] = "Sick_Leave";
    Reason["Personal_Leave"] = "Personal_Leave";
    Reason["Others"] = "Others";
})(Reason || (Reason = {}));
class LeaveModel extends sequelize_1.Model {
}
exports.LeaveModel = LeaveModel;
LeaveModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    employeeId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    department: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(Department)),
        allowNull: false,
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    reason: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(Reason)),
        allowNull: false,
    },
    supervisorName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    employmentStatus: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(EmploymentStatus)),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("approved", "pending", "rejected"),
        defaultValue: "pending",
    },
    comment: {
        type: sequelize_1.DataTypes.BLOB("tiny"),
        allowNull: true,
    },
    totalLeaveDaysRequested: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
    },
    attachment: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, { sequelize: db_1.default, tableName: "leave" });
model_1.UserModel.hasMany(LeaveModel, {
    foreignKey: "userId",
    as: "leave",
    constraints: false
});
LeaveModel.belongsTo(model_1.UserModel, {
    foreignKey: "userId",
    as: "user",
    constraints: false
});
