const pool = require('../config/db');

class Race {


    //get and view all races
    static async getAll() {
        const result = await pool.query('SELECT * FROM upcoming_races ORDER BY race_date ASC');
        return result.rows
    }

    //add race by its id
    static async getByID(id) {
        const result = await pool.query('SELECT * FROM upcoming_races WHERE id = $1', [id]);
        return result.rows[0];
    }

    //add new races
    static async addRace(raceData) {
        const {race_name, race_type, race_date, latitude, longitude, city, state, address, description, website_url } = raceData

        const result = await pool.query('INSERT INTO upcoming_races (race_name, race_type, race_date, latitude, longitude, city, state, address, description, website_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', 
        [race_name, race_type, race_date, latitude, longitude, city, state, address, description, website_url]);

        return result.rows[0];
    }

    //update existing race
    static async updateRace(id, raceData) {
        const { race_name, race_type, race_date, latitude, longitude, city, state, address, description, website_url } = raceData

        const result = await pool.query(
            'UPDATE upcoming_races SET race_name=$1, race_type=$2, race_date=$3, latitude=$4, longitude=$5, city=$6, state=$7, address=$8, description=$9, website_url=$10 WHERE id=$11 RETURNING *',
            [race_name, race_type, race_date, latitude, longitude, city, state, address, description, website_url, id]
        );

        return result.rows[0];
    }

    //delete a race
    static async deleteRace(id) {
        const result = await pool.query('DELETE FROM upcoming_races WHERE id = $1 RETURNING *', [id])

        return result.rows[0];
    }

};

module.exports = Race