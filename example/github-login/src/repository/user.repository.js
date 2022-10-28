import { User } from "../model/user.js";
import { Repository } from "./repository.js";

export default class UserRepository extends Repository {
  constructor() {
    super(new User());
  }
}
