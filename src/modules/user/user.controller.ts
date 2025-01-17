import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";
import { ApiError } from "../../utils/ApiError";
import { generateToken } from "../../utils/jwt";

const userService = new UserService();

export class UserController {
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      next(new ApiError("Failed to fetch users", 500));
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = req.body;
      const existingUser = await userService.findUserByEmail(email);

      if (existingUser) {
        throw new ApiError("User with this email already exists", 400);
      }

      await userService.createUser(username, email, password);
      res
        .status(201)
        .json({ success: true, message: "User created successfully" });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await userService.findUserByEmail(email);
      if (!user) {
        throw new ApiError("Invalid email or password", 401);
      }

      const isPasswordValid = await userService.comparePassword(
        password,
        user.password
      );
      if (!isPasswordValid) {
        throw new ApiError("Invalid email or password", 401);
      }

      // Generate JWT
      const token = generateToken({ id: user.id, email: user.email });
      res.json({ token });
    } catch (error) {
      next(error);
    }
  }
}
