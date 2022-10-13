import { query } from "./Query.js";
import { db_run } from "./MySQL.js";

export class Repository {
  constructor(entity) {
    this.entity = entity;
  }

  async save(entity) {
    this.differ_entity(entity);
    const insert_sql = query
      .table({ entity: this.entity.get_class_name() })
      .insert({
        col: this.entity.columns(),
        value: entity.values(),
        prepared: true,
      }).sql;

    const result = await db_run({ sql: insert_sql, value: entity.values() });
    return result[0];
  }

  async update(entity) {
    this.differ_entity(entity);
    const update_sql = query
      .table({ entity: this.entity.get_class_name() })
      .update();

    Object.keys(entity)
      .filter((col) => !["id", "created_date", "updated_date"].includes(col))
      .map((key) => update_sql.set({ col: key, value: entity[key] }));

    update_sql.where({ col: "id", value: entity.get("id"), operator: "EQ" });
    const result = await db_run({ sql: update_sql.sql });
    return result[0];
  }

  async delete(entity) {
    this.differ_entity(entity);
    const delete_sql = query
      .table({ entity: this.entity.get_class_name() })
      .delete()
      .where({ col: "id", value: entity.id, prepared: true }).sql;

    await db_run({ sql: delete_sql, value: [entity.id] });
  }

  async find_by_id(id) {
    const select_sql = query
      .table({ entity: this.entity.get_class_name() })
      .select()
      .where({ col: "id", value: id }).sql;

    const result = await db_run({ sql: select_sql });
    const object = result[0][0];
    return object ? this.entity.to_entity(object) : null;
  }

  async find_all() {
    const select = query
      .table({ entity: this.entity.get_class_name() })
      .select().sql;
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
    return object ? this.entity.to_entity(object) : null;
  }

  /**
   * 외래키 통해 조회
   */
  async find_all_by_entity(entity) {
    this.differ_entity(entity);

    const entity_name = entity.get_class_name().toLowerCase();
    const foreign_key = this.entity
      .columns()
      .filter((col) => col.includes(entity_name))[0];

    const select_sql = query
      .select({ table: this.entity.get_class_name() })
      .where({ col: foreign_key, value: entity.id }).sql;

    const result = await db_run({ sql: select_sql });
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
