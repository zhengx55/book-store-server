import Koa, { Context } from "koa";
import { success, fail } from "./ResHandler";

const globalException = async (ctx: Context, next: Koa.Next) => {
  try {
    await next();
  } catch (error) {
    const errorMsg = error as { message: string };
    ctx.body = fail(`Server error: ${errorMsg.message}`);
  }
};

export default globalException;
