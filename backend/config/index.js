import dotenv from 'dotenv'
dotenv.config();
export const {
    PORT,
    DB_URL,
    DEBUG,
    JWT_SECRET_KEY
} = process.env;