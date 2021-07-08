import React from "react";
import path from "path";
import "regenerator-runtime";
import Koa from "koa";
import Router from 'koa-router';
import mount from 'koa-mount';
import staticly from 'koa-static';
import { renderToString } from "react-dom/server";
import Home from "./pages/Home";
const app = new Koa();
const router = new Router();
router.get("/", async ctx => {
  const content = renderToString(<Home text="hello ssr" />);
  const html = `<html><body>${content}</body></html>`;
  ctx.body = html;
});
app.use(router.routes()).use(router.allowedMethods());
app.use(mount('/', staticly(path.join(__dirname, './build'), { maxage: 24 * 60 * 60 * 1000 })));
app.listen(8001, () => console.log("listening on port 8001"));