"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.EmploymentStatus = exports.Department = exports.JOBTITLE = exports.ROLE = void 0;
const db_1 = __importDefault(require("../../db"));
const sequelize_1 = require("sequelize");
var ROLE;
(function (ROLE) {
    ROLE["HR"] = "HR";
    ROLE["EMPLOYEE"] = "EMPLOYEE";
})(ROLE || (exports.ROLE = ROLE = {}));
var JOBTITLE;
(function (JOBTITLE) {
    JOBTITLE["UI_UX"] = "UI/UX";
    JOBTITLE["SOFTWARE_ENGINEER"] = "SOFTWARE_ENGINEER";
    JOBTITLE["PROJECT_MANAGER"] = "PROJECT_MANAGER";
    JOBTITLE["DATA_ANALYTICS"] = "DATA_ANALYTICS";
})(JOBTITLE || (exports.JOBTITLE = JOBTITLE = {}));
var Department;
(function (Department) {
    Department["Audit"] = "Audit";
    Department["Tech"] = "Tech";
    Department["Finance"] = "Finance";
})(Department || (exports.Department = Department = {}));
var EmploymentStatus;
(function (EmploymentStatus) {
    EmploymentStatus["INTERN"] = "INTERN";
    EmploymentStatus["MEMBER"] = "MEMBER";
    EmploymentStatus["TEAM_LEAD"] = "TEAM_LEAD";
})(EmploymentStatus || (exports.EmploymentStatus = EmploymentStatus = {}));
class UserModel extends sequelize_1.Model {
}
exports.UserModel = UserModel;
UserModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    password: {
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
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    employee_Status: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(EmploymentStatus)),
        allowNull: true,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(ROLE)),
        allowNull: false,
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
    resetPasswordExpiration: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true,
        defaultValue: null,
    },
    resetPasswordStatus: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    resetPasswordCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    employee_Department: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(Department)),
        allowNull: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    preferredName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    DateOfEmployment: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    WorkLocation: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    salary: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    workSchedule: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    bankName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    accountNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    accountName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    isEmployee: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    DateOfBirth: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    isTeamLead: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    JobTitle: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(JOBTITLE)),
        allowNull: true,
    },
    nameOfEmergencyContact: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    relationshipWithEmergencyContact: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    phoneNumberOfEmergencyContact: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    employeeId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    loginCount: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true,
    },
    loginRetrival: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    City_State: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    Zip_code: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true,
    },
}, { sequelize: db_1.default, tableName: "user" });
