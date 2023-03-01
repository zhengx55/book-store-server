import Koa from "koa";
import path from "path";
import fs from "fs";
import Router from "koa-router";
import body from "koa-body";
import json from "koa-json";
import globalException from "./GlobalExce";

class RouteLoader {
  app!: Koa;
  static loader: RouteLoader = new RouteLoader();
  init(app: Koa) {
    this.app = app;
    this.app.use(globalException);
    const rootRouter = this.loadAllRouterWrapper();
    this.app.use(rootRouter.routes());
    this.listen();
  }

  getFiles(dir: string) {
    return fs.readdirSync(dir);
  }

  getAbsoluteFilePaths() {
    const dir = path.join(process.cwd(), "/src/router");
    const allFiles = this.getFiles(dir);
    const allFullFilePaths: string[] = [];
    for (let file of allFiles) {
      const fullFilePath = dir + "/" + allFiles;
      console.log(fullFilePath);
      allFullFilePaths.push(fullFilePath);
    }
    return allFullFilePaths;
  }
  // 加载所有的二级路由到一级路由中
  loadAllRouterWrapper() {
    // 获取一级路由
    const rootRouter = this.getRootRouter();
    // 调用获取绝对路径数组方法
    const allFullFilePaths = this.getAbsoluteFilePaths();
    this.loadAllRouter(allFullFilePaths, rootRouter);
    return rootRouter;
  }

  isRouter(data: any): data is Router {
    return data instanceof Router;
  }

  getRootRouter() {
    const root = new Router();
    root.prefix("/dang");
    this.app.use(json());
    this.app.use(body());
    return root;
  }

  loadAllRouter(paths: string[], root: Router) {
    for (let fullFilePath of paths) {
      // 读取路由模块
      const module = require(fullFilePath);
      if (this.isRouter(module)) {
        root.use(module.routes(), module.allowedMethods());
      }
    }
  }

  listen() {
    this.app.listen(3002);
    console.log("server listening on http://localhost:3002");
  }
}

export default RouteLoader.loader;
