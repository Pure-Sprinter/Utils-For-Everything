export class Model {
  constructor() {
    this.id = 0;
    this.created_date = "";
    this.updated_date = "";
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
    return Object.getOwnPropertyNames(this)
      .filter(this.should_not_include)
      .filter((col) => !["created_date", "updated_date"].includes(col));
  }

  types() {
    return this.columns().map((col) => this.COL_TYPE[col]);
  }

  values() {
    return this.columns().map((col) => this[col]);
  }

  to_sql() {
    return Object.keys(this)
      .filter(this.should_not_include)
      .map((col) => {
        return {
          col,
          type: !["created_date", "updated_date"].includes(col)
            ? this.COL_TYPE[col]
            : this.BASIC_TYPE[col],
        };
      });
  }

  to_entity(object) {
    const entity = new this.constructor();
    return Object.assign(object, entity);
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

  /**
   * 테이블 쿼리 생성 시 포함되어서는 안되는 요소들
   */
  should_not_include(col) {
    return !["id", "TYPE", "BASIC_TYPE", "COL_TYPE"].includes(col);
  }

  /**
   * MySQL 기본 타입
   */
  TYPE = {
    /**
     * String Types
     */
    VARCHAR(size = 100) {
      return `VARCHAR(${size})`;
    },
    TEXT(size = 500) {
      return `TEXT(${size})`;
    },
    LONGBLOB: "LONGBLOB",

    /**
     * Numeric Types
     */
    BOOLEAN: "BOOLEAN",
    SMALLINT: "SMALLINT",
    INT: "INT",
    DOUBLE: "DOUBLE",

    /**
     * Date Types
     */
    DATE: "DATE",
    TIME: "TIME",
    DATETIME({ CREATE = false, UPDATE = false }) {
      if (CREATE) {
        return "DATETIME DEFAULT CURRENT_TIMESTAMP";
      } else if (UPDATE) {
        return "DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP";
      }
      return "DATETIME";
    },
  };

  /**
   * 기본 타입에 대한 타입 정의
   */
  BASIC_TYPE = {
    created_date: this.TYPE.DATETIME({ CREATE: true }),
    updated_date: this.TYPE.DATETIME({ UPDATE: true }),
  };

  /**
   * 추가로 생성한 칼럼에 대하여 작성하는 용도
   * 상속 후 재정의 형태는 다음과 같다.
   * COL_TYPE = Object.assign({ name: this.TYPE.VARCHAR(30) }, this.BASIC_TYPE);
   */
  COL_TYPE = {};
}
