import { Sequelize } from "sequelize-typescript";
import { Op } from "sequelize";
import { model } from "../model";

class UserDao {
  static addUser(userInfo: UserInfo) {
    return model.create(userInfo);
  }
  static findAllUser() {
    return model.findAll({ raw: true });
  }

  static findByLike(key: string) {
    // 模糊查询
    return model.findAll({
      raw: true,
      where: {
        username: {
          [Op.like]: `%${key}%`,
        },
      },
    });
  }

  static findByUsmAndPsw(username: string, psw: string) {
    return model.findOne({
      raw: true,
      where: {
        [Op.or]: [{ username }, { psw }],
      },
    });
  }

  static findByUsmAndAddr(username: string, address: string) {
    return model.findAll({
      raw: true,
      where: {
        [Op.or]: [
          {
            username: {
              [Op.like]: `%${username}%`,
            },
          },
          {
            address,
          },
        ],
      },
    });
  }

  // 聚合查询
  static countUserInfo() {
    return model.findAll({
      raw: true,
      group: "address",
      // 分组字段
      attributes: [
        "address",
        [Sequelize.fn("count", Sequelize.col("valid")), "total"],
      ],
      where: {
        valid: 1,
      },
    });
  }

  // 分页查询
  static findUserPaginations(offset: number, pageSize: number) {
    return model.findAll({
      raw: true,
      limit: pageSize,
      offset,
    });
  }
}

export type UserInfo = {
  userid: number;
  username: string;
  psw: string;
  address: string;
  valid: number;
};

export const { addUser, findAllUser, findByUsmAndPsw } = UserDao;
