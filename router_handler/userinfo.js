const db = require('../db/index')
const bcrypt = require('bcryptjs')

// 获取用户信息
exports.getUserinfo = (req, res) => {
  const sql = 'select id, username, nickname, email, user_pic,id_card from ev_users where id=?'
  db.query(sql, req.auth.id, (err, data) => {
    if (err) return res.cc(err)
    if (data.length !== 1) return res.cc('获取用户信息失败')
    res.send({
      status: 0,
      message: '获取用户信息成功',
      data: data[0]
    })
  })
}

// 更新用户信息
exports.updateUserInfo = (req, res) => {
  const sql = 'update ev_users set ? where id=?'
  db.query(sql, [req.body, req.auth.id], (err, data) => {
    if (err) return res.cc(err)
    if (data.affectedRows !== 1) return res.cc('修改用户信息失败')
    res.cc('修改用户信息成功', 0)
  })
}

// 更新密码
exports.updatePassword = (req, res) => {
  const sql = 'select * from ev_users where id=?'

  db.query(sql, req.auth.id, (err, data) => {
    if (err) return res.cc(err)
    if (data.length !== 1) return res.cc('用户不存在')
    const compareResult = bcrypt.compareSync(req.body.oldPwd, data[0].password)
    if (!compareResult) return res.cc('原密码错误')

    const sql = 'update ev_users set password=? where id=?'
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
    db.query(sql, [newPwd, req.auth.id], (err, data) => {
      if (err) return res.cc(err)
      if (data.affectedRows !== 1) return res.cc('更新密码失败')
      res.cc('更新密码成功', 0)
    })

  })
}

// 更新头像
exports.updateAvatar = (req, res) => {
  const sql = 'update ev_users set user_pic=? where id=?'
  db.query(sql, [req.body.avatar, req.auth.id], (err, data) => {
    if (err) return res.cc(err)
    if (data.affectedRows !== 1) return res.cc('更新头像失败')
    res.cc('更新头像成功', 0)
  })
}

// 根据userId获取团队信息
exports.getTeamInfo = (req, res) => {
  const sql = 'select * from team_info where userId=?'
  db.query(sql, req.auth.id, (err, data) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取团队信息成功',
      data: data
    })
  })
}