function GetSet(target: any, propertyKey: any) {
  if (propertyKey.includes("_")) {
    const key = propertyKey.replaceAll("_", "");
    [key, propertyKey].forEach((element) => {
      Object.defineProperty(target, element, {
        set: function (value: any) {
          propertyKey = value;
        },
        get: function () {
          return propertyKey === element || propertyKey == "_" + element
            ? undefined
            : propertyKey;
        },
      });
    });
  }
}

class BaseTimeEntity {
  createdAt?: Date;
  updatedAt?: Date;
}

class Example extends BaseTimeEntity {
  firstMessage?: number;
  secondMessage?: string;
}

class ExampleImpl extends Example {
  @GetSet
  private _firstMessage: number;

  @GetSet
  private _secondMessage: string;

  constructor() {
    super();
  }

  test() {
    console.log(`first message: ${this._firstMessage}`);
    console.log(`second message: ${this._secondMessage}`);
  }
}

let example = new ExampleImpl();
example.firstMessage = 1;
example.secondMessage = "hihi";
example.test();
console.log(example.firstMessage);
console.log(example.secondMessage);
