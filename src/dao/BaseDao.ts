import mysql, { Connection } from "mysql";
import dbconfig from "@/database/dbconfig";

class BaseDao {
  static baseDao: BaseDao = new BaseDao();
  con!: Connection;
  constructor() {
    this.connect();
  }

  async connect() {
    this.con = await mysql.createConnection(dbconfig.getConfig());
  }

  async query<T>(sql: string) {
    return new Promise<T>((resolve, reject) => {
      this.con.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}
