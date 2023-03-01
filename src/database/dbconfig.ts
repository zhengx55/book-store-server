import { isString } from "@/utils/helper";

interface DbConfig {
  host: string;
  user: string;
  password: string;
  port: number;
  database: string;
}

interface EnvConfig {
  dev: DbConfig;
  prod: DbConfig;
}

class Config {
  static config: Config = new Config();
  env!: keyof EnvConfig;
  envConfig!: EnvConfig;
  constructor() {
    this.env = process.env.NODE_ENV === "dev" ? "dev" : "prod";
    this.initConfig();
  }

  initConfig() {
    this.envConfig = {
      dev: {
        host: "localhost",
        user: "admin",
        password: "123",
        database: "dangdang",
        port: 3306,
      },
      prod: {
        host: "xxx",
        user: "xxx",
        password: "123",
        database: "dangdang",
        port: 3306,
      },
    };
  }

  getConfig(): DbConfig;
  getConfig(key: string): string;
  getConfig(key: any = ""): any {
    if (key.length > 0 && this.isDbConfigKeys(key)) {
      return this.envConfig[this.env][key];
    } else {
      return this.envConfig[this.env];
    }
  }

  isDbConfigKeys(key: any): key is keyof DbConfig {
    return (
      key === "host" ||
      key === "user" ||
      key === "password" ||
      key === "database" ||
      key === "port"
    );
  }
}

export default Config.config;
