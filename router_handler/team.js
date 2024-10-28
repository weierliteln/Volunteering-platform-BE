const db = require('../db/index')

// 根据teamid使用内连接查询获取活动信息和团队信息,要包含所有团队信息，包括没有活动的团队
exports.getTeam = (req, res) => {
  let sql = 'select * from team_info left join activity_info on team_info.teamId=activity_info.teamId where team_info.teamId=?'
  if (req.query.teamId !== '' && req.query.teamId !== undefined) {
    db.query(sql, req.query.teamId, (err, data) => {
      if (err) return res.cc(err)
      res.send({
        status: 0,
        message: '获取团队信息成功',
        data: data
      })
    })
  } else if (req.query.teamId === '') {
    sql = 'select * from team_info'
    db.query(sql, (err, data) => {
      if (err) return res.cc(err)
      res.send({
        status: 0,
        message: '获取团队信息成功',
        data: data
      })
    })
  }
}

// 添加团队
exports.addTeam = (req, res) => {
  const sql = 'insert into team_info set ?'
  db.query(sql, req.body, (err, data) => {
    if (err) return res.cc(err)
    if (data.affectedRows !== 1) return res.cc('添加团队失败')
    res.cc('添加团队成功', 0)
  })
}

// 更新团队信息
exports.updateTeam = (req, res) => {
  const sql = 'update team_info set ? where teamId=?'
  db.query(sql, [req.body, req.body.teamId], (err, data) => {
    if (err) return res.cc(err)
    if (data.affectedRows !== 1) return res.cc('更新团队信息失败')
    res.cc('更新团队信息成功', 0)
  })
}

// 删除团队
exports.deleteTeam = (req, res) => {
  const sql = 'delete from team_info where teamId=?'
  db.query(sql, req.query.teamId, (err, data) => {
    if (err) return res.cc(err)
    if (data.affectedRows !== 1) return res.cc('删除团队失败')
    res.cc('删除团队成功', 0)
  })
}

// 获取团队成员
exports.getTeamMembers = (req, res) => {
  const sql = 'select * from team_members where team_id=?'
  db.query(sql, req.query.id, (err, data) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取团队成员成功',
      data: data
    })
  })
}

// 多表查询，根据activity_info里面的userId查询用户所有的活动信息
exports.getUserActivity = (req, res) => {
  const sql = 'select * from team_info left join activity_info on team_info.teamId=activity_info.teamId  where activity_info.userId=?'
  db.query(sql, req.auth.id, (err, data) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取用户活动信息成功',
      data: data
    })
  })
}