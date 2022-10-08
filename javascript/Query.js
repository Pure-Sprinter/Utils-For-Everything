export class Query {
  constructor() {
    this.db = "";
    this.entity = "";
    this.sql = "";
  }

  run() {
    console.log(this.sql);

    this.db.run(this.sql, (err) => console.log("error : " + err));
    this.db.close();
  }

  table({ entity }) {
    this.entity = entity;
    return this;
  }

  create() {
    this.sql = `CREATE TABLE ${this.entity}(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY)`;
    return this;
  }

  select({ col = ["*"] }) {
    this.sql = `SELECT ${col.join(", ")} FROM ${this.entity} `;
    return this;
  }

  update() {
    this.sql = `UPDATE ${this.entity} `;
    return this;
  }

  /**
   * @param {Array} col 세팅할 칼럼 명
   * @param {Array} value 칼럼에 넣을 데이터 명
   */
  insert({ col, value }) {
    this.sql = `INSERT INTO ${this.entity}(${col.join(", ")}) VALUES(${value
      .map((val) => {
        if (typeof val === "string") {
          return `'${val}'`;
        }
        return val;
      })
      .join(", ")})`;
    return this;
  }

  delete() {
    this.sql = `DELETE FROM ${this.entity}`;
    return this;
  }

  add_foreign_key({ col, entity }) {
    let temp_sql = this.sql.slice(0, this.sql.length - 1);
    this.sql = temp_sql + `, ${col} INT NOT NULL REFERENCES ${entity} (id))`;
    return this;
  }

  add_col({ col, type, negated = false }) {
    let temp_sql = this.sql.slice(0, this.sql.length - 1);
    this.sql = temp_sql + `, ${col} ${type} ${negated ? "NOT NULL" : "NULL"})`;
    return this;
  }

  set({ col, value }) {
    if (this.sql.includes("SET")) {
      this.sql += `, ${col} = ${value} `;
    } else {
      this.sql += `SET ${col} = ${value} `;
    }
    return this;
  }

  where({ col, value, operator = "EQ" }) {
    let val = this.text(value);
    if (this.sql.includes("WHERE")) {
      this.sql += `${col} ${COMPARE[operator]} ${val}`;
    } else {
      this.sql += `WHERE ${col} ${COMPARE[operator]} ${val}`;
    }
    return this;
  }

  between({ col, left, right }) {
    if (this.sql.includes("WHERE")) {
      this.sql += `${col} BETWEEN ${left} AND ${right}`;
    } else {
      this.sql += `WHERE ${col} BETWEEN ${left} AND ${right}`;
    }
    return this;
  }

  and() {
    this.sql += " AND ";
    return this;
  }

  or() {
    this.sql += " OR ";
    return this;
  }

  /**
   * 하단 부터는 유틸 함수
   */
  insert_space() {
    this.sql = this.sql.length !== " " ? this.sql + " " : this.sql;
    return this;
  }

  exists_table({ database, table }) {
    this.sql = `SELECT COUNT(*) FROM Information_schema.tables WHERE table_schema = '${database}' AND table_name = '${table}'`;
    return this.sql;
  }

  drop_table({ database, table }) {
    this.sql = `DROP TABLE IF EXISTS ${database}.${table}`;
    return this.sql;
  }

  text(value) {
    if (typeof value === "string") {
      return `'${value}'`;
    }
    return value;
  }
}

const COMPARE = {
  EQ: "=",
  LT: "<",
  LE: "<=",
  GT: ">",
  GE: ">=",
};

export const query = new Query();
