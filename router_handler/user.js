const db = require('../db/index')

// 导入bcryptjs模块, 用于对用户密码进行加密
const bcrypt = require('bcryptjs')

// 注册
exports.register = (req, res) => {
  const userinfo = req.body
  if (!userinfo.username || !userinfo.password) {
    return res.cc('用户名或密码不能为空')
  }

  // 查询用户是否存在
  const sql = 'select * from ev_users where username=?'
  db.query(sql, userinfo.username, async (err, data) => {
    if (err) return res.cc(err)
    if (data.length > 0) return res.cc('用户名已存在')

    // 对用户密码进行加密
    userinfo.password = await bcrypt.hash(userinfo.password, 10)

    // 插入用户
    const sql = 'insert into ev_users set ?'
    db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, data) => {
      if (err) return res.cc(err)
      if (data.affectedRows !== 1) return res.cc('注册用户失败')
      res.cc('注册成功', 0)
    })
  })
}

// 登录
exports.login = (req, res) => {
  const userinfo = req.body
  if (!userinfo.username || !userinfo.password) {
    return res.cc('用户名或密码不能为空')
  }

  // 查询用户是否存在
  const sql = 'select * from ev_users where username=?'
  db.query(sql, userinfo.username, async (err, data) => {
    if (err) return res.cc(err)
    if (data.length !== 1) return res.cc('登录失败')

    // 对用户密码进行比对
    const compareResult = await bcrypt.compareSync(userinfo.password, data[0].password)
    if (!compareResult) return res.cc('登录失败')

    // 登录成功
    req.session.user = data[0]
    req.session.isLogin = true
    res.cc('登录成功', 0)
  })
}
