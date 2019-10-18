const Router = require('koa-router')
const database = require('database')
const HttpStatus = require('http-status');
const koaBody = require('koa-body');
const router = Router()

// --------------------------- posts 

//  get posts
router.get('/posts', async ctx => {
    result = await database.query('SELECT * FROM posts;').then(c => c.rows);
    ctx.status = 200;
    ctx.body = result;
});

// create post
router.post('/posts', koaBody(), async ctx => {
        post = JSON.stringify(ctx.request.body.post);
        id = '1';   // no user login implemented yet, default user = '1'
        var queryConfig = {
            text: 'INSERT INTO posts (userid, body) VALUES ($1, $2);',
            values: [id, post]
        };
        ctx.status = 200;
        result = await database.query(queryConfig);
        ctx.body = result;
});

// update post
router.put('/posts', koaBody(), async ctx => {
        id = JSON.stringify(ctx.request.body.id);
	post = JSON.stringify(ctx.request.body.post);
	var queryConfig = {
            text: 'UPDATE posts SET body = $1 WHERE posts.id = $2;',
            values: [post, id]
        };
        ctx.status = 200;
        result = await database.query(queryConfig);
        ctx.body = result;

});

// delete post
router.del('/posts', async ctx => {
    id = ctx.request.query.id;
    var queryConfig = {
    text: 'DELETE FROM posts WHERE posts.id = $1;',
    values: [id]
  };
     result = await database.query(queryConfig);
       ctx.status = 200;
       ctx.body = result;

});

module.exports = router


