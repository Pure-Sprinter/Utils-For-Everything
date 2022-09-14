export class Query {
  constructor() {
    this.db = "";
    this.sql = "";
  }

  run() {
    console.log(this.sql);

    this.db.run(this.sql, (err) => console.log("error : " + err));
    this.db.close();
  }

  create({ table }) {
    this.sql = `CREATE TABLE ${table}(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY)`;
    return this;
  }

  select({ table, col }) {
    let element = col ? (col.length === 0 ? "*" : col.join(", ")) : "*";
    this.sql = `SELECT ${element} FROM ${table} `;
    return this;
  }

  update({ table }) {
    this.sql = `UPDATE ${table} `;
    return this;
  }

  /**
   * @param {string} table 테이블 병
   * @param {Array} col 세팅할 칼럼 명
   * @param {Array} value 칼럼에 넣을 데이터 명
   */
  insert({ table, col, value }) {
    this.sql = `INSERT INTO ${table}(${col.join(", ")}) VALUES(${value
      .map((val) => {
        if (typeof val === "string") {
          return `'${val}'`;
        }
        return val;
      })
      .join(", ")})`;
    return this;
  }

  delete({ table }) {
    this.sql = `DELETE FROM ${table}`;
    return this;
  }

  add_col([col, type]) {
    let temp_sql = this.sql.slice(0, this.sql.length - 1);
    this.sql = temp_sql + `, ${col} ${type} NOT NULL)`;
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

  where({ col, value }) {
    if (this.sql.includes("WHERE")) {
      this.sql += ` AND ${col} = ${value}`;
    } else {
      this.sql += `WHERE ${col} = ${value}`;
    }
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
}

export const text = (value) => {
  return `"${value}"`;
};

export const query = new Query();

/**
 * SELECT 예시
 */
let select = query
  .select({ col: "", table: "payment" })
  .where({ col: "month", value: `"${month}"` })
  .where({ col: "year", value: year }).sql;

console.log(select);
