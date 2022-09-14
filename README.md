```bash
npm init #创建项目
npm install --save hapi-admin #下载hapi-admin依赖 ,如果使用了pnpm 还需要加上 mongoose 如果使用mysql 就不用了 安装对应的数据库
npx scaffold init # 初始化项目目录
npx scaffold generate db:mongo #初始化数据库配置 目前只有mongodb如果想用其他数据库 可以直接添加对应的文件
npx scaffold scaffold post title:string:required content:string rating:number #创建所有资源 包括 控制器 路由 服务
npx scaffold controller post # 单独创建控制器
npx scaffold service post  # 单独创建一个服务
npx scaffold model post title:string:required content:string rating:number # 创建数据库 schema

```