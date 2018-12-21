'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // 阿里云环境
  // BASE_API: '"http://101.132.163.120:8080"'
  // 本地环境
  // BASE_API: '"http://localhost:8080"'
  // 腾讯云环境
  BASE_API: '"http://139.199.82.83:8080"'
})
