require('dotenv').config();

module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'stock_manager',
    host: 'localhost',
    dialect: "mysql"
  },
  test: {
    username: '',
    password: '',
    database: '',
    host: '',
    dialect: '',
  },
  production: {
    username: '',
    password: '',
    database: '',
    host: '',
    dialect: ''
  }
}
