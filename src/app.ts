import Koa from "koa";
import RouteLoader from "./common/RouteLoader";

const app = new Koa();
RouteLoader.init(app);
