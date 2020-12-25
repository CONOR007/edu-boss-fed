const express = require('express')
const app = express()
const path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware')
// 托管dist目录 dist中的任何资源都能通过这个web服务器访问到了 当访问/的时候默认会返回托管目录中的index.html文件
app.use(express.static(path.join(__dirname, '../dist')))

// 配置跨域代理
app.use('/boss', createProxyMiddleware({ target: 'http://eduboss.lagou.com', changeOrigin: true }))
app.use('/front', createProxyMiddleware({ target: 'http://edufront.lagou.com', changeOrigin: true }))

app.listen(3080)
