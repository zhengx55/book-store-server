import { Context } from "koa";
import Router from "koa-router";
import { success, fail } from "../common/ResHandler";
import { UserInfo, addUser, findAllUser } from "../dao/UserDaoDefine";

const router = new Router();

router.prefix("/usermodule");

router.get("/userInfo/:username/:psw", async (ctx: Context) => {
  const { username, psw } = ctx.params;
  ctx.body = success(username);
});

router.get("/allUsers", async (ctx: Context) => {
  const dbAllUser = await findAllUser();
  ctx.body = success(dbAllUser);
});

router.post("/addUser", async (ctx: Context) => {
  const user = ctx.request.body;
  ctx.body = user.usernames;
  console.log(ctx.body);
});

router.post("/adduser", async (ctx: Context) => {
  const userinfo: UserInfo = ctx.request.body;
  const dbUserInfo = await addUser(userinfo);
  ctx.body = success(dbUserInfo);
});

module.exports = router;
