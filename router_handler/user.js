const db = require('../db/index')
const bcrypt = require('bcryptjs')

// 注册
exports.register = (req, res) => {
  const userinfo = req.body
  if (!userinfo.username || !userinfo.password) {
    // return res.send({ status: 1, message: '用户名或密码不能为空' })
    return res.cc(err)
  }

  // 查询用户是否存在
  const sql = 'select * from ev_users where username=?'
  db.query(sql, userinfo.username, (err, data) => {
    if (err) {
      return res.cc(err)
    }
    if (data.length > 0) {
      return res.cc('用户名已存在')
    }

    userinfo.password = bcrypt.hashSync(userinfo.password, 10)

    // 插入用户
    const sql = 'insert into ev_users set ?'
    db.query(sql, {
      username: userinfo.username, password: userinfo.password
    }, (err, data) => {
      if (err) {
        return res.cc(err)
      }
      if (data.affectedRows !== 1) {
        return res.cc('注册用户失败')
      }
      res.cc('注册成功', 0)
    }
    )

  })


  console.log(userinfo)
  userinfo.ctime = new Date()
}

// 登录
exports.login = (req, res) => {
  res.send('login')
}