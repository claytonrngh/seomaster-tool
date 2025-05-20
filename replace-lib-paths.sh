#!/bin/bash

# 项目根目录下运行此脚本
echo "🔁 Replacing relative lib/ paths with path alias: lib/*"

# 查找所有 ts/tsx 文件中使用 ../../lib 或 ../../../lib 等的路径，并替换为 lib/
find . -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' -E 's|(\.\.\/)+lib/|lib/|g' {} +

echo "✅ Replacement complete."