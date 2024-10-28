const express = require('express')

const router = express.Router()

const activity_handler = require('../router_handler/activity')


router.put('/updateActivity', activity_handler.updateActivity)

router.get('/getActivity', activity_handler.getActivity)

router.delete('/deleteActivity', activity_handler.deleteActivity)

router.post('/addActivity', activity_handler.addActivity)

router.get('/getActivityDetail', activity_handler.getActivityDetail)


module.exports = router