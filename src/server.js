import React from "react";
import express from "express";
import { renderToString } from "react-dom/server";
import Home from "./pages/Home";
const app = express();
app.use(express.static("public"));
app.get("*", (req, res) => {
  const content = renderToString(<Home text="hello ssr" />);
  const html = `<html><body>${content}</body></html>`
  res.send(html);
});
app.listen(8001, () => console.log("listening on port 8001"));