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

    return await db_run({ sql: insert_sql });
  }

  async delete(entity) {
    this.differ_entity(entity);
    const delete_sql = query
      .delete({ table: this.entity.get_class_name() })
      .where({ col: "id", value: entity.id }).sql;

    await db_run({ sql: delete_sql });
  }

  async find_by_id(id) {
    const select_sql = query
      .select({ table: this.entity.get_class_name() })
      .where({ col: "id", value: id }).sql;

    const result = await db_run({ sql: select_sql });
    const object = result[0][0];
    if (object) {
      return this.entity.to_entity(object);
    }
    return null;
  }

  async find_all() {
    const select = query.select({ table: this.entity.get_class_name() }).sql;
    const result = await db_run({ sql: select });
    return result[0];
  }

  /**
   * where 조건을 통해 얻은 요소
   * @param {Object Literal} where
   */
  async find_one(where) {
    const condition = { ...where };
    const select_sql = query.select({ table: this.entity.get_class_name() });
    Object.keys(condition)
      .map((key) => {
        return { col: key, value: condition[key] };
      })
      .map((element) => select_sql.where(element));

    const result = await db_run({ sql: select_sql.sql });
    const object = result[0][0];

    if (object) {
      return this.entity.to_entity(object);
    }
    return null;
  }

  /**
   * 외래키를 통해 모든 것 조회
   */
  async find_all_by_entity({ col, entity }) {
    this.differ_entity(entity);

    const select_sql = query
      .select({ table: this.entity.get_class_name() })
      .where({ col: col, value: entity.id }).sql;

    return await db_run({ sql: select_sql });
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
