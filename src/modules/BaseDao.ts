import { Dialect } from "sequelize";
import dbconfig from "../database/dbconfig";
import path from "path";
import { Sequelize } from "sequelize-typescript";
class BaseDao {
  static baseDao: BaseDao = new BaseDao();
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
  addModels() {
    const modelPath = path.join(process.cwd(), "/src/modules/decormodel");
    this.sequelize.addModels([modelPath]);
  }
}
const baseDao = BaseDao.baseDao;
baseDao.addModels();
export const { sequelize } = baseDao;
