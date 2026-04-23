// Environment variable loader and validator
import dotenv from 'dotenv';

dotenv.config();

/**
 * Asserts that a required environment variable is set.
 * Throws a descriptive error if the variable is missing or empty.
 */
function assertEnv(name: string, value: string | undefined): string {
  if (!value || value.trim() === '') {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
      `Please add it to your .env file.`
    );
  }
  return value;
}

export interface EnvConfig {
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  N8N_WEBHOOK_URL: string;
  FRONTEND_URL: string;
}

export const env: EnvConfig = {
  PORT: Number(assertEnv('PORT', process.env.PORT)),
  DATABASE_URL: assertEnv('DATABASE_URL', process.env.DATABASE_URL),
  JWT_SECRET: assertEnv('JWT_SECRET', process.env.JWT_SECRET),
  JWT_EXPIRES_IN: assertEnv('JWT_EXPIRES_IN', process.env.JWT_EXPIRES_IN),
  N8N_WEBHOOK_URL: assertEnv('N8N_WEBHOOK_URL', process.env.N8N_WEBHOOK_URL),
  FRONTEND_URL: assertEnv('FRONTEND_URL', process.env.FRONTEND_URL),
};

export default env;
