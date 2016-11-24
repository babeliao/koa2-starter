/**
 * Created by liaoyunda on 16/11/23.
 */
var router = require('koa-router')();
var db = require('../config/db');

router.get('/', function (ctx, next) {
    ctx.body = 'this a users response!';
});
module.exports = router;