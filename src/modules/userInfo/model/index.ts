import { DataTypes } from "sequelize";
import { sequelize } from "../../BaseDao";

class UserInfo {
  static createModel() {
    const model = sequelize.define(
      "userInfo",
      {
        userid: {
          type: DataTypes.INTEGER,
          field: "userid",
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING(30),
          field: "usernames",
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(50),
          field: "address",
          allowNull: true,
        },
        psw: {
          type: DataTypes.STRING(20),
          field: "psw",
          allowNull: false,
        },
        valid: {
          type: DataTypes.TINYINT,
          field: "valid",
          allowNull: true,
        },
      },
      {
        // 当数据表不存在时创建数据表
        freezeTableName: true,
        timestamps: false,
      }
    );
    // 同步数据库 当为false时为不存在时才创建
    model.sync({ force: false });
    return model;
  }
}

export const model = UserInfo.createModel();
