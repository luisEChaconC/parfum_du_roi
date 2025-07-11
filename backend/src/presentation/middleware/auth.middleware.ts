import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.session.userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
};

export const optionalAuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  next();
}; 