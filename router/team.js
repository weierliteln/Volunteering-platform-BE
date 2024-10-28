const express = require('express')

const router = express.Router()

const team_handler = require('../router_handler/team')

router.put('/updateTeam', team_handler.updateTeam)

router.get('/getTeam', team_handler.getTeam)

router.delete('/deleteTeam', team_handler.deleteTeam)

router.post('/addTeam', team_handler.addTeam)

router.get('/getUserActivity ', team_handler.getUserActivity)

module.exports = router