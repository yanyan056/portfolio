# AI作品集数据管理指南

## 📁 文件夹结构
```
public/assets/ai-projects/
├── projects-config.json     # 项目配置文件
├── README.md               # 使用说明
├── coze-workflow.jpg       # 示例项目图片
├── xiaohongshu-ai.jpg     # 示例项目图片
├── rag-system.jpg         # 示例项目图片
└── cursor-games.jpg       # 示例项目图片
```

## 🚀 跨服务器部署流程

### 1. 导出数据（开发环境）
1. 在AI作品集页面点击"📤 导出数据"按钮
2. 下载生成的 `ai-portfolio-backup-YYYY-MM-DD.json` 文件
3. 将你上传的所有图片手动保存到本地

### 2. 准备部署文件
1. 将导出的JSON文件重命名为 `projects-config.json`
2. 将所有项目图片复制到 `public/assets/ai-projects/` 目录
3. 更新 `projects-config.json` 中的图片路径为 `/assets/ai-projects/图片名.jpg`

### 3. 部署到新服务器
1. 将整个项目代码上传到新服务器
2. 确保 `public/assets/ai-projects/` 目录包含所有图片和配置文件
3. 运行 `npm install` 和 `npm run build`
4. 部署到生产环境

### 4. 验证数据
1. 访问新服务器的AI作品集页面
2. 确认所有项目和图片正常显示
3. 如需要，可以使用"📥 导入数据"功能重新导入

## 💡 最佳实践

### 图片管理
- 建议图片大小控制在1MB以内
- 使用JPG格式以获得更好的压缩比
- 图片命名使用英文和数字，避免特殊字符

### 数据备份
- 定期导出数据作为备份
- 在添加重要项目后立即导出
- 保存导出文件的多个版本

### 部署注意事项
- 确保所有图片路径使用相对路径
- 检查图片文件是否正确上传到服务器
- 测试所有GitHub链接是否可以正常访问

## 🔧 技术说明

### 数据格式
```json
{
  "projects": [
    {
      "id": 1,
      "image": "/assets/ai-projects/project-image.jpg",
      "title": "项目标题",
      "description": "项目描述...",
      "github": "https://github.com/username/repo",
      "date": "2024-01-01"
    }
  ],
  "exportDate": "2024-12-21T10:00:00.000Z",
  "version": "1.0"
}
```

### 自动加载逻辑
- 首次访问时自动检查是否有配置文件
- 如果localStorage为空，则从配置文件加载
- 用户数据优先于配置文件数据
