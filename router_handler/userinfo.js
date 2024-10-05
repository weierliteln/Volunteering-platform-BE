exports.getUserinfo = (req, res) => {
  res.send({
    status: 0,
    message: '获取用户基本信息成功',
    data: {
      id: 1,
      username: 'violet',
      nickname: '小紫',
      email: ''
    }
  })
}