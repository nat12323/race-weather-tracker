const Race = require('../models/races');

const getAllRaces = async (req, res) => {
    try {
        const races = await Race.getAll();
        res.json(races);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch races'})
    }
}

const getRaceByID = async (req, res) => {
    try {
        const race = await Race.getByID(req.params.id);
        if (!race) {
            return res.status(404).json({ error: 'Race not found'})
        }
        res.json(race);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch race'})
    }
}

const createRace = async (req, res) => {
    try {
        const newRace = await Race.addRace(req.body);
        res.status(201).json(newRace);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create race'})
    }
}

const updateRace = async (req, res) => {
    try {
        const updatedRace = await Race.updateRace(req.params.id, req.body);
        if (!updatedRace) {
            return res.status(404).json({ error: 'Race not found' });
        }
        res.json(updatedRace);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update race'})
    }
}

const deleteRace = async (req, res) => {
    try {
        const deletedRace = await Race.deleteRace(req.params.id);
        if (!deletedRace) {
            return res.status(404).json({ error: 'Could not find race to delete' });
        }
        res.json({ message: 'Race deleted successfully.'})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete race'})
    }
}

module.exports = {
    getAllRaces,
    getRaceByID,
    createRace,
    updateRace,
    deleteRace
};