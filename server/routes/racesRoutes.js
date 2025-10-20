const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');

const {
    getAllRaces,
    getRaceByID,
    createRace,
    updateRace,
    deleteRace
} = require('../controllers/racesController');

const router = express.Router();

//place router.use here for token verification
router.use(authenticateToken);

router.get('/allraces', getAllRaces);
router.get('/:id', getRaceByID);
router.post('/createrace', createRace);
router.put('/updaterace/:id', updateRace);
router.delete('/deleterace/:id', deleteRace);

module.exports = router;
