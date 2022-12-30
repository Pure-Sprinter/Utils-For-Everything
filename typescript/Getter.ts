function Getter<T extends { new (...args: any[]): {} }>(constructor: T) {
  console.log(constructor);
  console.log(constructor.prototype);
  return class extends constructor {
    test: string = "hi";
  };
}

function decorator() {
  return function (
    target: any,
    property: string,
    descriptor: PropertyDescriptor
  ) {
    let val: any;
    return {
      set: function (value: any) {
        val = value;
        console.log("set", value);
        //   return this;
      },
      get: function () {
        console.log("get", val);
        return val;
      },
    };
  };
}

function test(target: any, value: any) {
  console.log("value", value);
  return {
    set: function (value: any) {
      value = value;
      console.log("set", value);
    },
    get: function () {
      console.log("get", value);
      return value;
    },
  } as any;
}

class Model {
  id: string = "1";

  @test
  name: string;
}

const model = new Model();
console.log(Object.keys(model));
