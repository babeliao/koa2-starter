/**
 * Created by liaoyunda on 16/11/22.
 */
var config;
if (process.env.NODE_ENV === 'production') {
    console.log("Load productionConfig...");
    config = {
        database: 'db', // 使用哪个数据库
        username: 'root', // 用户名
        password: 'password', // 口令
        host: 'localhost', // 主机名
        port: 3306, // 端口号，MySQL默认3306
        view_path:"/dist"//模版前置路径（经自动化工具处理后的模版文件）
    };
//} else if (process.env.NODE_ENV === 'test'){
//    console.log("Load testConfig}...");
//    config = {
//        database: 'new_kpt', // 使用哪个数据库
//        username: 'root', // 用户名
//        password: 'password', // 口令
//        host: 'localhost', // 主机名
//        port: 3306 // 端口号，MySQL默认3306
//    };
}else {
    console.log("Load localConfig}...");
    config = {
    database: 'db', // 使用哪个数据库
    username: 'root', // 用户名
    password: 'password', // 口令
    host: 'localhost', // 主机名
    port: 3306, // 端口号，MySQL默认3306
    view_path:"/views-ejs"//模版前置路径（经自动化工具处理后的模版文件）
};
}

module.exports = config;