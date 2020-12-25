#!/bin/bash

# 安装依赖
cnpm install

# 打包
npm run build

# 删除 ngnix 指向的文件夹下的文件
# rm -rf /root/edu-boss-fed/*

# 将打包好的文件复制过去
mv /tmp/edu-boss-fed/dist/* /root

cd /root/dist/test-serve

npm install

pm2 start pm2.config.json

# 删除 clone 的代码 
rm -rf /tmp/edu-boss-fed