const express = require('express')
const router = express.Router()

// 导入路由处理模块
const user_handler = require('../router_handler/user')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user')

// 注册用户
router.post('/register', expressJoi(reg_login_schema), user_handler.register)

// 登录
router.post('/login', expressJoi(reg_login_schema), user_handler.login)

module.exports = router