import path from "path";
import sqlite3 from "sqlite3";

const __dirname = path.resolve();
const sql = sqlite3.verbose();
const db_path = path.join(__dirname, "/sql/data", "db");

export async function get_db() {
  const db = new sql.Database(db_path, (err) => {
    if (err) {
      return console.error(err.message);
    }

    console.log("'db'가 성공적으로 생성되었습니다");
  });
  return db;
}

export async function db_run(query, value) {
  const db = await get_db();
  console.log(query);
  return new Promise(function (resolve, reject) {
    db.run(query, (err) => {
      if (err) {
        return reject(err);
      }
      resolve(value);
    });
  });
}

export async function db_get(query) {
  const db = await get_db();
  console.log(query);
  return new Promise(function (resolve, reject) {
    db.get(query, (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row);
    });
  });
}

export async function db_all(query) {
  const db = await get_db();
  console.log(query);
  return new Promise(function (resolve, reject) {
    db.all(query, function (err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}
