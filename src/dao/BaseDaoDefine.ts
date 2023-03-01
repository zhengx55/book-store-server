import dbconfig from "@/database/dbconfig";
import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";

class BaseDaoDefine {
  static baseDaoOrm: BaseDaoDefine = new BaseDaoDefine();
  sequelize!: Sequelize;
  constructor() {
    this.initSeqConfig("mysql");
  }
  initSeqConfig(dialect: Dialect) {
    let { host, user, password, database, port } = dbconfig.getConfig();
    this.sequelize = new Sequelize(database, user, password, {
      host,
      port,
      dialect,
      define: { timestamps: false, freezeTableName: true },
    });
  }
}

export const { sequelize } = BaseDaoDefine.baseDaoOrm;
