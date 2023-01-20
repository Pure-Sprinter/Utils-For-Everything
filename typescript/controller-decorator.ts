import "reflect-metadata";
import express, { Router } from "express";
import { MetadataKeys } from "./enum/metadata-keys";

// 실제로는 외부에서 선언한 const globalRouter = express.Router() 이다.
let globalRouter: Router = express.Router();

function Controller(routePrefix: string) {
  return function (target: Function) {
    Object.getOwnPropertyNames(target.prototype).forEach((key) => {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );
      const method = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );

      if (method) {
        globalRouter[method](`${routePrefix}${path}`, routeHandler);
      }
    });
  };
}

export { Controller };
