const express = require('express')
const app = express()
const joi = require('joi')


// 配置跨域cors中间件
const cors = require('cors')
app.use(cors())

// 配置解析表单数据中间件
app.use(express.urlencoded({ extended: false }))

// 封装res.cc函数
app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

// 配置解析token的中间件
const config = require('./config')
const { expressjwt } = require('express-jwt')
app.use(expressjwt({
  secret: config.jwtSecretKey, algorithms: ["HS256"]
}).unless({ path: [/^\/api/] }))

// 导入用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 导入用户信息路由模块
const userinfoRuoter = require('./router/userinfo')
app.use('/user', userinfoRuoter)

// 错误中间件
app.use((err, req, res, next) => {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 身份认证失败
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败')
  // 未知错误
  res.cc(err)
})

app.listen(3006, () => {
  console.log("Server is running on port 3006")
}).on('error', (err) => {
  console.error('Server error:', err)
})