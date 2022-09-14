import { query } from "./Query.js";
import { db_run } from "./MySQL.js";

export class Repository {
  constructor(entity) {
    this.entity = entity;
  }

  async save(entity) {
    this.differ_entity(entity);
    const insert_sql = query.insert({
      table: this.entity.get_class_name(),
      col: this.entity.columns(),
      value: entity.values(),
    }).sql;

    await db_run({ sql: insert_sql });
  }

  async find_by_id(id) {
    const select_sql = query
      .select({ table: this.entity.get_class_name() })
      .where({ col: "id", value: id }).sql;

    const result = await db_run({ sql: select_sql });
    const object = result[0][0];

    delete object["id"];
    return this.entity.to_entity(object);
  }

  async find_all() {
    const select = query.select({ table: this.entity.get_class_name() }).sql;
    const result = await db_run({ sql: select });
    return result[0];
  }

  /**
   * 에러 관련 함수
   */
  differ_entity(entity) {
    if (entity.get_class_name() !== this.entity.get_class_name()) {
      throw new Error("들어온 클래스가 다른 클래스입니다.");
    }
  }
}
