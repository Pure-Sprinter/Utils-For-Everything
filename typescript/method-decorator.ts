import "reflect-metadata";
import { RequestHandler } from "express";
import { MetadataKeys } from "./enum/metadata-keys";
import { Methods } from "./enum/method";

interface RouteHandlerDescriptor extends TypedPropertyDescriptor<Function> {
  handler?: RequestHandler;
}

function _routeBinder(method) {
  return function (path: string = "") {
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
    };
  };
}

const Get = _routeBinder(Methods.GET);
const Post = _routeBinder(Methods.POST);
const Put = _routeBinder(Methods.PUT);
const Patch = _routeBinder(Methods.PATCH);
const Delete = _routeBinder(Methods.DELETE);

export { Get, Post, Put, Patch, Delete };
