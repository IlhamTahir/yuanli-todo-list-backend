import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

export default registerAs('database', () => {
  return {
    host: process.env.DATABASE_HOST || '127.0.0.1',
    username: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'todolist',
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  };
});
