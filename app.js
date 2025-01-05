const express = require('express')
const app = express()
const joi = require('joi')




// 配置解析表单数据中间件
app.use(express.urlencoded({ extended: false }))

// 配置解析json数据的中间件
app.use(express.json())

// 配置跨域cors中间件
const cors = require('cors')
app.use(cors())

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
}).unless({
  path: [/^\/api/, /^\/activity/, /^\/team/]
}))

// 导入用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 导入用户信息路由模块
const userinfoRuoter = require('./router/userinfo')
app.use('/user', userinfoRuoter)


// 导入活动路由模块
const activityRouter = require('./router/activity')
app.use('/activity', activityRouter)

// 导入团队路由模块
const teamRouter = require('./router/team')
app.use('/team', teamRouter)


// 错误中间件
app.use((err, req, res, next) => {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 身份认证失败
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败')
  // 未知错误
  res.cc(err)
})



// AI
const { Server } = require("socket.io");
const http = require("http");
const OpenAI = require("openai");
const socketIO = require("socket.io");

const server = http.createServer(app);

const io = socketIO(server);

app.use(express.static("public"));

const client = new OpenAI({
  apiKey: "sk-5iI3k79xzEn67cAwIjkNUX0y10m7lEyLRtdDtnzL7zcJzfxa",
  baseURL: "https://api.moonshot.cn/v1",
});

const systemMessages = [
  {
    role: "system",
    content: "现在你将扮演一个大学生，而不是机器人，热爱生活，性格积极活泼可爱。",
  },
]

let messages = []

async function makeMessages(input, n = 20) {
  messages.push({
    role: "user",
    content: input,
  });

  let newMessages = [];

  newMessages = systemMessages.concat(newMessages);
  if (messages.length > n) {
    messages = messages.slice(-n);
  }

  newMessages = newMessages.concat(messages);
  return newMessages;
}

async function chat(input) {
  const completion = await client.chat.completions.create({
    model: "moonshot-v1-8k",
    messages: await makeMessages(input),
    temperature: 0.3
  });

  const assistantMessage = completion.choices[0].message
  messages.push(assistantMessage);

  return assistantMessage.content;
}


io.on("connection", (socket) => {
  // 向客户端发送消息
  chat("你好").then(reply => {
    console.log(reply);
    socket.emit("receiveMessage", {
      message: reply,
    });
  })
})


io.on("connection", (socket) => {
  console.log("a user connected");

  //从客户端接收消息
  socket.on('sendMessage', data => {
    console.log(data)
    chat(data.message).then(reply => {
      console.log(reply);
      socket.emit("receiveMessage", {
        message: reply,
      });
    });
  })

})

app.listen(3006, () => {
  console.log("Server is running on port 3006")
}).on('error', (err) => {
  console.error('Server error:', err)
})

