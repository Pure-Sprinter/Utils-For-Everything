export class Model {
  constructor() {
    this.id = 0;
  }

  get(col) {
    this.not_exist_col_error(col);
    return this[col];
  }

  set(col, value) {
    this.not_exist_col_error(col);
    this.differ_type_error(col, value);
    this[col] = value;
    return this;
  }

  get_class_name() {
    return this.constructor.name;
  }

  columns() {
    return Object.getOwnPropertyNames(this).slice(1);
  }

  types() {
    return this.columns().map((col) => type_into_sql[typeof this[col]]);
  }

  values() {
    return Object.values(this).slice(1);
  }

  to_sql() {
    const types = this.types();
    return this.columns().map((value, index) => {
      return { col: value, type: types[index] };
    });
  }

  to_entity(object) {
    const entity = new this.constructor();
    Object.keys(this).map((key) => {
      entity[key] = object[key];
    });
    return entity;
  }

  /**
   * 에러 관련 함수
   */
  not_exist_col_error(col) {
    if (!this.columns().includes(col)) {
      throw new Error("존재하지 않는 칼럼입니다.");
    }
  }

  differ_type_error(col, value) {
    if (typeof this[col] !== typeof value) {
      throw new Error("주입한 값의 타입이 다릅니다.");
    }
  }
}

const type_into_sql = {
  number: "INT",
  string: "TEXT",
  object: "TEXT",
  undefined: "TEXT",
};
