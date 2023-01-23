import { AppDataSource } from "../ormconfig";
import { validate } from "class-validator";

import { User } from "./entity/User";

export default class Initializer {
  static initialize = async () => {
    const userRepository = AppDataSource.getRepository(User);
    const user = new User();
    user.username = "admin";
    user.password = "admin";
    user.role = "ADMIN";
    const errors = await validate(user);
    if (errors.length > 0) {
      console.log(errors);
      return;
    }
    user.hashPassword();
    try {
      await userRepository.save(user);
    } catch (e) {
      console.log("username already in use");
      return;
    }
    console.log("User created");
  };
}
