import UserRepository from "../repository/user.repository";

export class UserService {
  constructor() {
    this.user_repository = new UserRepository();
  }
}
