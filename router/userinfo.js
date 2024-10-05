const express = require('express')
const router = express.Router()
const userinfo_handler = require('../router_handler/userinfo')

router.get('/userinfo', userinfo_handler.getUserinfo)



module.exports = router