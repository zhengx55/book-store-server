import { Context } from "koa";
import Router from "koa-router";
import { success, fail } from "../common/ResHandler";

const router = new Router();

router.prefix("/usermodule");

router.get("/userInfo/:username", async (ctx: Context) => {
  const { username } = ctx.params;
  ctx.body = success(username);
});

router.post("/addUser", async (ctx: Context) => {
  const user = ctx.request.body;
  ctx.body = user.usernames;
  console.log(ctx.body);
});

module.exports = router;
