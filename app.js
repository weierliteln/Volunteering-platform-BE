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

// 导入用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 错误中间件
app.use((err, req, res, next) => {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 未知错误
  res.cc(err)
})

app.listen(3006, () => {
  console.log("Server is running on port 3006")
}).on('error', (err) => {
  console.error('Server error:', err) // 添加这行以在控制台输出启动错误
})