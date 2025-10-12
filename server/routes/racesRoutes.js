const express = require('express');

const {
    getAllRaces,
    getRaceByID,
    createRace,
    updateRace,
    deleteRace
} = require('../controllers/racesController');

const router = express.Router();

router.get('/allraces', getAllRaces);
router.get('/:id', getRaceByID);
router.post('/createrace', createRace)
router.put('/updaterace/:id', updateRace);
router.delete('/deleterace/:id', deleteRace);

module.exports = router;
