import express from "express";
import { init_table } from "./src/util/init.js";

(async function () {
  await init_table();
  console.log("실행");
})();

const app = express();
