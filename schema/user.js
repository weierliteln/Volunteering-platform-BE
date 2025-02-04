const joi = require('joi')

const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

const avatar = joi.string().dataUri().required()


// 登录和注册表单的验证规则对象
exports.reg_login_schema = {
  body: {
    username,
    password,
  }
}

// 更新用户信息的验证规则对象
exports.update_userinfo_schema = {
  body: {
    // id,
    nickname,
    email,
    id_card: joi.string().pattern(/^\d{17}[\dXx]$/).required()
  }
}

// 更新密码的验证规则对象
exports.update_password_schema = {
  body: {
    oldPwd: password,
    newPwd: joi.not(joi.ref('oldPwd')).concat(password)
  }
}

// 更新头像的验证规则对象
exports.update_avatar_schema = {
  body: {
    avatar
  }
}