#!/bin/bash

if [ -z "$1" ]; then
    echo "错误: 请提供迁移文件名称"
    exit 1
fi

mkdir -p migrations

echo "正在创建迁移文件: $1"
pnpm run migration:create ./migrations/$1

echo "迁移文件创建完成！"
