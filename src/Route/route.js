const express = require('express');
const router = express.Router();
const authorController = require('../Controllers/newAuthorController')
const blogController = require('../Controllers/newBlogController')
const middleware = require('../Middelware/middelware')

router.get('/', function(req,res){
    return res.send({ message : "server is started"})
})

//Author routes
router.post('/authors', authorController.createAuthor)
router.post('/login', authorController.loginAuthor)


//Blog routes 
router.post('/blogs', middleware.loginCheck, blogController.createBlog)
router.get('/blog', blogController.getBlog)
router.put('/blogs/:blogId', middleware.loginCheck, blogController.updateDetails)
router.delete('/blogs/:blogId',middleware.loginCheck, blogController.deleteBlogById)
router.delete('/blogs1', middleware.loginCheck, blogController.deleteByQuery)

module.exports = router;