import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import csrf from '@dr.pogodin/csurf';
import { createSessionStore } from '@typeorm/sessionStore';
import { dataSource } from '@infrastructure/persistence/typeorm/data-source';
import { routes } from "@routes";
import { errorHandler } from "@presentation/middleware/error.middleware";

dataSource.initialize();

const app = express();

// Debug logger – remove once issue is resolved
app.use((req, res, next) => {
  console.log(`>>> ${req.method} ${req.originalUrl}`);
  console.log('  Headers:', req.headers);
  let raw = '';
  req.on('data', chunk => { raw += chunk; });
  req.on('end', () => { console.log('  Raw-body:', raw); });
  next();
});

app.use(express.json());

app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError) {
    console.error('JSON parse error:', err.message);
  }
  next(err);
});

app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  store: createSessionStore(),
  cookie: {
    maxAge: 1000 * 60 * 60 * 2, // 2 hours
  },
}));

app.use(csrf());

app.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.use("/api", routes);

interface CustomError extends Error {
  code?: string;
}

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403).json({ error: 'Invalid CSRF token' });
    return;
  }
  next(err);
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
