const express = require("express");
const router = express.Router();

const {
    getAllGames,
    getGameById
} = require("../controllers/gamesControllers");

router.get("/", getAllGames);
router.get("/:id", getGameById);

module.exports = router;