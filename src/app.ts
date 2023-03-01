import Koa from "koa";
import RouteLoader from "./common/RouteLoader";
// import dbconfig from "./database/dbconfig";

const app = new Koa();
RouteLoader.init(app);
