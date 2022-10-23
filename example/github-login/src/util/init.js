import { User } from "../model/user.js";
import { db_all, drop_table, is_exists_table } from "../repository/database.js";
import { query } from "./query.js";

export async function init_table() {
  await Promise.all([{ database: "study_db", table: "User" }].map(drop_table));
  const tables = [new User()];
  const find_not_exist_table = await Promise.all(
    tables.map(async (table) => {
      return await is_exists_table({
        database: "study_db",
        table: table.get_class_name(),
      });
    })
  );

  return await db_all({
    sql_array: find_not_exist_table
      .map((value, index) => {
        if (value === 0) {
          const table = tables[index];
          const create_sql = query
            .table({ entity: table.get_class_name() })
            .create();

          table
            .to_sql()
            .forEach((val) => create_sql.add_col({ ...val, negated: true }));
          return create_sql.sql;
        }
        return "";
      })
      .filter((sql) => sql !== ""),
  });
}
