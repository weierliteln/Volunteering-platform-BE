const mysql = require('mysql2');

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'l18373246702',
  database: 'blog_data'
});

module.exports = db;