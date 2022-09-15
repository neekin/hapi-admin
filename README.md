```bash
npm init #创建项目
npm install --save hapi-admin #下载hapi-admin依赖 ,如果使用了pnpm 还需要加上 mongoose 如果使用mysql 就不用了 安装对应的数据库
npx hapi-admin init # 初始化项目目录
npx hapi-admin init -D mongo #包含初始化数据库配置 目前只有mongodb如果想用其他数据库 可以直接添加对应的文件
npx hapi-admin generate scaffold post title:string:required content:string rating:number #创建所有资源 包括 控制器 路由 服务
npx hapi-admin generate controller post # 单独创建控制器
npx hapi-admin generate service post  # 单独创建一个服务
npx hapi-admin generate model post title:string:required content:string rating:number # 创建数据库 schema

npx hapi-admin destory service post # 删除一个服务
npx hapi-admin destory init # 删除所有hapi-admin创建的文件
npx hapi-admin destory scaffold post # 删除所有脚手架的文件

命令都有相应的简写 比如 model 简写 m ,controller 简写 c
```