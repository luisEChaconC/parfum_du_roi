import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import csrf from '@dr.pogodin/csurf';
import { createSessionStore } from '@typeorm/sessionStore';
import { dataSource } from '@infrastructure/persistence/typeorm/data-source';
import { routes } from "@routes";
import { errorHandler } from "@presentation/middleware/error.middleware";
import { paymentValidationRoutes } from "@presentation/routes/payment-validation.route";
import https from 'https';
import fs from 'fs';
import path from 'path';

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

app.use("/api/payments", paymentValidationRoutes);

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

// Configurar HTTPS
const privateKey = fs.readFileSync(path.join(__dirname, '../certs/parfumduroi.local+3-key.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, '../certs/parfumduroi.local+3.pem'), 'utf8');
const credentials = { key: privateKey, cert: certificate };

const PORT = process.env.PORT || 3000;

https.createServer(credentials, app).listen(PORT, () => {
  console.log(`Server is running with HTTPS on https://localhost:${PORT}`);
});
