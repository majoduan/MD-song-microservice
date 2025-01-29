const sql = require('mssql');
const { getConnection } = require('../config/database');

const songController = {
    // Get all songs
    getAllSongs: async (req, res) => {
        try {
            const pool = await getConnection();
            const result = await pool.request().query('SELECT * FROM TBL_SONG');
            res.json(result.recordset);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Get song by ID
    getSongById: async (req, res) => {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', sql.Int, req.params.id)
                .query('SELECT * FROM TBL_SONG WHERE Id = @id');
            
            if (result.recordset.length > 0) {
                res.json(result.recordset[0]);
            } else {
                res.status(404).json({ message: 'Song not found' });
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Create new song
    createSong: async (req, res) => {
        const { name, path } = req.body;
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('name', sql.VarChar, name)
                .input('path', sql.VarChar, path)
                .query('INSERT INTO TBL_SONG (Name, Path, Plays) VALUES (@name, @path, 0); SELECT SCOPE_IDENTITY() AS id');
            
            res.status(201).json({ id: result.recordset[0].id, name, path, plays: 0 });
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Update song
    updateSong: async (req, res) => {
        const { name, path } = req.body;
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', sql.Int, req.params.id)
                .input('name', sql.VarChar, name)
                .input('path', sql.VarChar, path)
                .query('UPDATE TBL_SONG SET Name = @name, Path = @path WHERE Id = @id');
            
            if (result.rowsAffected[0] > 0) {
                res.json({ message: 'Song updated successfully' });
            } else {
                res.status(404).json({ message: 'Song not found' });
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Delete song
    deleteSong: async (req, res) => {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', sql.Int, req.params.id)
                .query('DELETE FROM TBL_SONG WHERE Id = @id');
            
            if (result.rowsAffected[0] > 0) {
                res.json({ message: 'Song deleted successfully' });
            } else {
                res.status(404).json({ message: 'Song not found' });
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};

module.exports = songController;