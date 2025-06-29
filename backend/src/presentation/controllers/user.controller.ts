import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { Request, Response } from "express";
import { ICreateUserUseCase } from "@port/use-case/user/create-user.use-case.interface";
import { CreateUserRequestDto } from "@dto/user/create-user-request.dto";
import { CreateUserResponseDto } from "@dto/user/create-user-response.dto";

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.CreateUserUseCase)
    private readonly createUserUseCase: ICreateUserUseCase,
  ) {}

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, fullName } = req.body;
      console.log(email, password, fullName);
      const createdUser = await this.createUserUseCase.executeAsync(req.body);
      res.status(201).json(createdUser);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}