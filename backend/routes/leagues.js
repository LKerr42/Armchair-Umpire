const express = require("express");
const router = express.Router();

const {
    getLeagueById,
    getAllLeagues
} = require("../controllers/leaguesControllers");

router.get("/", getAllLeagues);
router.get("/:id", getLeagueById);

module.exports = router;