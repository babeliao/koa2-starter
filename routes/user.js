/**
 * Created by liaoyunda on 16/11/23.
 */
var router = require('koa-router')();
var t_user_review_config = require('../models/user');
var db = require('../config/db');

router.get('/user/:userId', async function (ctx, next) {
    var config = await t_user_review_config.findOne({
        where:{
            userId: ctx.params.userId,
            config_type: "0"
        }
    });
    console.log(config.id+config.userId);
    ctx.state = {
        userName: config.userName
    };

    await ctx.render('user', {
    });
})
module.exports = router;
