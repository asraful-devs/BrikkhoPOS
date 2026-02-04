import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 12,
    jwt: {
        access_secret: process.env.JWT_ACCESS_SECRET,
        refresh_secret: process.env.JWT_REFRESH_SECRET,
        reset_token: process.env.JWT_RESET_TOKEN_SECRET,
        access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
        refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
        reset_token_expires_in: process.env.JWT_RESET_TOKEN_EXPIRES_IN,
    },
};
