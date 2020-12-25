#!/bin/bash

# 删除除test-serve之外没有用的文件
# rm -rf !(dist)

# 进入跨域服务文件
cd dist/test-serve/

# 安装依赖
yarn

# 托管运行
pm2 start pm2.config.json