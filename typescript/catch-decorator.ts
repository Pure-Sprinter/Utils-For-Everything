import { HttpException } from "./http-exception";

function Catch(error: any) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (e) {
        if (e instanceof HttpException) {
          throw e;
        } else {
          throw new error();
        }
      }
    };

    return descriptor;
  };
}

export { Catch };
