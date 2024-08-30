const express = require('express');

const { getAllBlogscontrollers,
    createBlogControllers,
    updateBlogControllers,
    getBlogByIdControllers,
    deleteBlogControllers,
    userBlogControlllers } = require('../controllers/blogControllers');

//router objet
const router = express.Router()
//routes
//get || all blog
router.get('/all-blog', getAllBlogscontrollers)

//post || create blog

router.post('/create-blog', createBlogControllers)

//put || update

router.put('/update-blog/:id', updateBlogControllers)

//get || singleblog details

router.get('/get-blog/:id', getBlogByIdControllers)

//delete|| delete blog

router.delete('/delete-blog/:id', deleteBlogControllers)

//GET || user blog
router.get("/user-blog/:id", userBlogControlllers);

module.exports = router;