import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
try {
  // Resolve absolute path to .env relative to this file (which is in src/config/)
  const envPath = path.resolve(__dirname, '../../.env');
  process.loadEnvFile(envPath);
} catch (error) {
  // Fallback to default path loading from the current working directory
  try {
    process.loadEnvFile();
  } catch (err) {
    // If no .env is found, assume variables are set in the environment directly
  }
}

// Extract and validate environment variables
const PORT = parseInt(process.env.PORT || '3000', 10);
const MONGODB_URL = process.env.MONGODB_URL;
const NODE_ENV = process.env.NODE_ENV || 'development';

if (!MONGODB_URL) {
  console.warn('WARNING: MONGODB_URL is not defined in the environment variables.');
}

export const env = {
  PORT,
  MONGODB_URL,
  NODE_ENV,
  isProduction: NODE_ENV === 'production',
  isDevelopment: NODE_ENV === 'development',
};

export default env;
