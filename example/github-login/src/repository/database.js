import mysql from "mysql2/promise";
import { query } from "../util/query.js";

const db_config = {
  host: "127.0.0.1",
  user: "root",
  port: "3306",
  password: "1234",
  database: "study_db",
  connectionLimit: 10,
};

const database = mysql.createPool(db_config);

export async function get_db() {
  return await database.getConnection(function (err, connection) {
    return new Promise(function (resolve, reject) {
      return err ? reject(err) : resolve(connection);
    });
  });
}

/**
 * 하나의 SQL 문을 실행하는 함수 입니다.
 * @param {*} sql
 */
export async function db_run({ sql, value = [] }) {
  const db = await get_db();
  return new Promise(async function (resolve, reject) {
    try {
      const result = await db.execute(sql, value);
      return resolve(result);
    } catch (err) {
      return reject(err);
    } finally {
      db.release();
    }
  }).catch((error) => {
    return error;
  });
}

/**
 * 여러 개의 SQL문을 동시에 실행하는 함수 입니다.
 * @param {*} sql_array
 */
export async function db_all({ sql_array }) {
  const db = await get_db();
  if (sql_array) {
    try {
      await db.beginTransaction();
      const all_query = [...sql_array].map((sql) => db.query(sql));
      const result = await Promise.all(all_query);
      await db.commit();
      return result;
    } catch (err) {
      await db.rollback();
      return err;
    } finally {
      db.release();
    }
  }
  db.release();
  return null;
}

/**
 * 테이블 존재 여부 확인
 * @param {*} table
 */
export async function is_exists_table({ database, table }) {
  const exist_sql = query.exists_table({ database: database, table: table });
  const result = await db_run({ sql: exist_sql });
  return result[0][0]["COUNT(*)"];
}

/**
 * 특정 테이블 삭제 함수
 */
export async function drop_table({ database, table }) {
  const drop_sql = query.drop_table({ database: database, table: table });
  const result = await db_run({ sql: drop_sql });
  return result;
}
