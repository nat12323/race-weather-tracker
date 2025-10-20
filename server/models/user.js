const pool = require('../config/db');
const bcrypt = require('bcrypt');

class User {

    //Create a new user with a hashed password
    static async createUser(username, email, password) {
        try {
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(password, salt);

            const result = await pool.query(
                'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at', [username, email, hashedPassword]
            );

            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    //Find by email
    static async findByEmail(email) {
        try {
            const result = await pool.query(
                'SELECT * FROM users WHERE email = $1', [email]
            )

            return result.rows[0];  
        } catch (error) {
            throw error;
        }
    }

    //Find user by username
    static async findByUsername(username) {
        try {
            const result = await pool.query(
                'SELECT * FROM users WHERE username = $1', [username]
            );

            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    //Compare passwords for login
    static async comparePassword(passwordAttempt, hashedPassword) {
        return bcrypt.compare(passwordAttempt, hashedPassword);
    }


}

module.exports = User;