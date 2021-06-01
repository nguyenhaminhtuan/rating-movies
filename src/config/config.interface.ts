export interface Environment {
  NODE_ENV: 'development' | 'production' | 'test';
  HOST: string;
  PORT: number;
  ALLOWED_HOSTS: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_DATABASE: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  JWT_SECRET: string;
}
