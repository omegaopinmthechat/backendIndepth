// This imports the config function from the dotenv package. dotenv is used to load variables from a .env file into process.env.

import { config } from "dotenv";

// 2. config({path: \.env.${process.env.NODE_ENV || 'development'}.local`});`
// This tells dotenv to load a specific .env file depending on the environment your app is running in.

// It uses process.env.NODE_ENV (e.g., 'development', 'production', 'test') to pick the right file.

// If NODE_ENV isn't set, it defaults to 'development'.

// So if you're running in development, it will load:

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});

export const {
  PORT,
  NODE_ENV,
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  ARCJET_ENV,
  ARCJET_KEY,
  QSTASH_URL,
  QSTASH_TOKEN,
  SERVER_URL,
} = process.env;