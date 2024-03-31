import dotenv from 'dotenv'
dotenv.config();
export const {
    PORT,
    DB_URL,
    DEBUG,
    JWT_SECRET_KEY,
    API_KEY,
    API_SECRET,
    CLOUD_NAME
} = process.env;