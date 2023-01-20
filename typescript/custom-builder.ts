interface ConstructorType<T> {
  new (): T;
}

class Builder<T> {
  public object: T;

  constructor(ctor: ConstructorType<T>) {
    this.object = new ctor();
  }

  build(): T {
    return this.object;
  }
}

export { Builder };
