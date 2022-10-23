import { User } from "../model/user.js";
import { Repository } from "./repository.js";

export class UserRepository extends Repository {
  constructor() {
    super(new User());
  }
}
