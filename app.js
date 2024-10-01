const express = require('express');
const app = express();


// 配置跨域cors中间件
const cors = require('cors');
app.use(cors());

// 配置解析表单数据中间件
app.use(express.urlencoded({ extended: false }));

// 封装res.cc函数
app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

// 导入用户路由模块
const userRouter = require('./router/user');
app.use('/api', userRouter);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});