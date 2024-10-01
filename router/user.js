const express = require('express');
const router = express.Router();

// 导入路由处理模块
const user_handler = require('../router_handler/user');

// 注册用户
router.post('/register', user_handler.register);

// 登录
router.post('/login', user_handler.login);

module.exports = router;