const db = require('../db/index')

// 获取活动信息
// exports.getActivity = (req, res) => {
//   const sql = 'select * from activity_info'
//   db.query(sql, (err, data) => {
//     if (err) return res.cc(err)
//     res.send({
//       status: 0,
//       message: '获取活动信息成功',
//       data: data
//     })
//   })
// }

// 使用外连接查询获取活动信息和团队信息,要包含所有活动信息，包括没有团队的活动
exports.getActivity = (req, res) => {
  const sql = 'select * from activity_info left join team_info on team_info.teamId=activity_info.teamId'
  db.query(sql, (err, data) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取活动信息成功',
      data: data
    })
  })
}

// 查询活动信息
exports.getActivityDetail = (req, res) => {
  if (req.query.id) {
    const sql = 'select * from activity_info left join team_info on team_info.teamId=activity_info.teamId where id=?'
    db.query(sql, req.query.id, (err, data) => {
      if (err) return res.cc(err)
      res.send({
        status: 0,
        message: '获取活动信息成功',
        data: data
      })
    })
  }
  if (req.query.address) {
    const sql = 'select * from activity_info left join team_info on team_info.teamId=activity_info.teamId where address=?'
    db.query(sql, req.query.address, (err, data) => {
      if (err) return res.cc(err)
      res.send({
        status: 0,
        message: '获取活动信息成功',
        data: data
      })
    })
  }
  if (req.query.serveCategory) {
    const sql = 'select * from activity_info left join team_info on team_info.teamId=activity_info.teamId where serveCategory=?'
    db.query(sql, req.query.serveCategory, (err, data) => {
      if (err) return res.cc(err)
      res.send({
        status: 0,
        message: '获取活动信息成功',
        data: data
      })
    })
  }
  if (req.query.status) {
    const sql = 'select * from activity_info left join team_info on team_info.teamId=activity_info.teamId where status=?'
    db.query(sql, req.query.status, (err, data) => {
      if (err) return res.cc(err)
      res.send({
        status: 0,
        message: '获取活动信息成功',
        data: data
      })
    })
  }

  if (req.query.title) {
    const sql = 'select * from activity_info left join team_info on team_info.teamId=activity_info.teamId where title like ?'
    db.query(sql, req.query.title, (err, data) => {
      if (err) return res.cc(err)
      res.send({
        status: 0,
        message: '获取活动信息成功',
        data: data
      })
    })
  }
}


// 添加活动
exports.addActivity = (req, res) => {
  const sql = 'insert into activity_info set ?'
  db.query(sql, req.body, (err, data) => {
    if (err) return res.cc(err)
    if (data.affectedRows !== 1) return res.cc('添加活动失败')
    res.cc('添加活动成功', 0)
  })
}

// 更新活动信息
exports.updateActivity = (req, res) => {
  const sql = 'update activity_info set ? where id=?'
  db.query(sql, [req.body, req.body.id], (err, data) => {
    if (err) return res.cc(err)
    if (data.affectedRows !== 1) return res.cc('更新活动信息失败')
    res.cc('更新活动信息成功', 0)
  })
}

// 删除活动
exports.deleteActivity = (req, res) => {
  const sql = 'delete from activity_info where id=?'
  db.query(sql, req.query.id, (err, data) => {
    if (err) return res.cc(err)
    if (data.affectedRows !== 1) return res.cc('删除活动失败')
    res.cc('删除活动成功', 0)
  })
}

