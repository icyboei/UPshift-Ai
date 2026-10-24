import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { apiRouter } from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

// CORS setup to allow client origin
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));

// Body parsing with 10mb limit for code submissions and rich logs
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.path.startsWith('/api')) {
      console.log(`[API] ${req.method} ${req.path} -> ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// Register API routes
app.use('/api', apiRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'upshift-ai-server', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 UPSHIFT AI Backend Server running on port ${PORT}`);
  console.log(`📡 Client origin: ${process.env.CLIENT_ORIGIN || 'http://localhost:5173'}`);
  console.log(`🧠 AI Engine: ${process.env.GEMMA_API_KEY ? 'Gemma 4 Live' : 'High-Fidelity Simulation Engine'}`);
  console.log(`=======================================================`);
});
