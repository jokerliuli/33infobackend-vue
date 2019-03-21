'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // 阿里云环境
  // BASE_API: '"http://101.132.163.120:8090"'
  // 本地环境
  BASE_API: '"http://localhost:8090"'
  // 腾讯云环境
  // BASE_API: '"http://139.199.82.83:8090"'
  // 3阿里云环境
  // BASE_API: '"http://47.100.27.31:8090"'
})
