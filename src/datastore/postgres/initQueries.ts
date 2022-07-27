export const initUUID = 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"';

export const createUserTable = `
CREATE TABLE IF NOT EXISTS users 
      (
         id SERIAL PRIMARY KEY, 
         username VARCHAR(255) UNIQUE NOT NULL, 
         password VARCHAR(255) NOT NULL, 
         token uuid NOT NULL, 
         rate_limit int NOT NULL,
         active BOOLEAN DEFAULT TRUE, 
         is_admin BOOLEAN DEFAULT FALSE, 
         created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP)
`;