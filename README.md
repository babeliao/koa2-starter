# koa2-starter

A koa2 starter by using mysql, gulp includes async/await, pm2, express-style middlewares. Based on [17koa/koa2-demo](https://github.com/17koa/koa2-demo).

基于[17koa/koa2-demo](https://github.com/17koa/koa2-demo)，并增加了mysql和gulp模块，提供了一个较完整的示例。
## Tech Stack

- Koa 2
- nodemon + runkoa（支持async/await，且不需关心babel）
- pm2 for deployment（服务器部署）
- express-style middlewares
  - koa-router
  - koa-views
  - koa-static
  - koa-bodyparser
- sequelize for supporting mysql（orm中间件sequelize支持mysql）
- gulp for front-end automation （较完整的gulp方案）


## Init Config

- config/config.js 里面进行数据库初始化配置。其中config.view_path 配置view的前置路径，已经配好，开发环境下为/views-ejs，生产环境为/dist，dist下文件皆为gulp自动化生成。
- There are database config in path config/config.js. 
- gulpfile.js 下配置qiniu_options，这里默认使用七牛cdn，若使用其他cdn供应商可以自定修改。（此处供生产环境使用，若不跑gulp脚本可忽略）
- Config cdn in gulpfile.js qiniu_options.


## Getting Start
##### Development environment：
开发环境

```
//git clone https://github.com/babeliao/koa2-starter.git
git clone git@github.com:babeliao/koa2-starter.git
cd koa2-starter
npm install
npm start
```

open in browser

http://127.0.0.1:3000/ 

在路径routes/index.js下, 

```
//根据model自动在数据库中创建表  force：是否强制建表，即删除原来表
db.sync({force: true});
```
即访问index页面后程序会自动根据models在数据库建立对应table
##### Production environment ：
生产环境，在之前的基础上  On the basis of previous

```
gulp
```
会自动压缩资源文件，上传cdn，md5并在ejs中替换路径，替换后的ejs文件将生成在dist/ 路径下，此时

```
npm start --production
```
读取正式环境配置数据后启动server。You can freely configure test enviroment of your own free will.
