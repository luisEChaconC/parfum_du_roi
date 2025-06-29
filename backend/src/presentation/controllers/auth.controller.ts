import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { Request, Response } from "express";
import { ILogInUseCase } from "@port/use-case/user/log-in.use-case.interface";
import { LogInRequestDto } from "@dto/user/log-in-request.dto";

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.LogInUseCase)
    private readonly logInUseCase: ILogInUseCase,
  ) {}

  async logIn(req: Request, res: Response): Promise<void> {
    try {
      const loginDto = req.body as LogInRequestDto;
      const userId = await this.logInUseCase.executeAsync(loginDto);
      req.session.userId = userId;
      res.status(200).json({ message: "Logged in!" });
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  }

  async logOut(req: Request, res: Response): Promise<void> {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.status(200).json({ message: "Logged out" });
    });
  }
} 