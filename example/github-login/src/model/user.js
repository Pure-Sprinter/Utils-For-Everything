import { Model } from "./model.js";

export class User extends Model {
  COL_TYPE = Object.assign(
    {
      nickname: this.TYPE.VARCHAR(30),
      email: this.TYPE.VARCHAR(50),
      social_id: this.TYPE.VARCHAR(30),
    },
    this.BASIC_TYPE
  );

  constructor() {
    super();
    this.nickname = "";
    this.email = "";
    this.social_id = "";
  }
}
