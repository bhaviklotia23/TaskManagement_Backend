import { AppDataSource } from "../../config/db";
import { User } from "../../entities/user.entities";
import * as bcrypt from "bcrypt";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async createUser(username: string, email: string, password: string) {
    const user = this.userRepository.create({ username, email, password });
    return await this.userRepository.save(user);
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
