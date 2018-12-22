const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const PostController = {

    createPost: async (req, res) => {
        
        try {
            const { postDate } = req.body;
      
            const post = await models.Post.create(postDate);
            
            if(postDate.tags) {

                postDate.tags.map( async (tag)=> {
                    tag = tag.split(' ').join('-')
                    await models.PostTag.create({ post_id:post.id, tag});
                    
                });

                postDate.tags.map( async (tag)=> {
                    tag = tag.split(' ').join('-')
                    await models.Tag.create({tag});
                    
                });
            }

            return res.status(200).json({
                status:"success",
                data: post
            });

        } catch (error) {
            return res.status(500).json({
                status:"error",
                data: error
            })
        }
    
    },

    getPosts: async (req, res) => {

        const limit = req.params.limit || 20;
        const offset = req.params.offset || 0;

        try {
            
            let post = await models.Post.findAll({
                where: {
                    status: models.Post.const.status.active
                },
                include:[{ model: models.User }, { model: models.Category }, { model: models.PostTag }],
                order: [
                    ['id', 'DESC']  
                ],
                offset: Number(offset),
                limit: Number(limit),
            });

            const postCount = await models.Post.count({
                where: {
                    status: models.Post.const.status.active  
                }
            });
            

            return res.status(200).json({
                status:"success",
                data: {
                    post,
                    postCount
                }
            })

        } catch (error) {
            return res.status(500).json({
                status:"error",
                data: error
            }) 
        }

    },

    getTagPosts: async (req, res) => {

        const limit = req.params.limit || 20;
        const offset = req.params.offset || 0;
        const tag = req.params.tag;

        try {
            
            const post = await models.Post.findAll({
                where: {
                    status: models.Post.const.status.active,
                },
                include: [ 
                    {
                        model: models.User
                    },
                    {
                        model: models.Category
                    },
                    {
                        model: models.PostTag,
                        where: {
                            tag:tag
                        }
                    }
                ],
                order: [
                    ['id', 'DESC']  
                ],
                offset: Number(offset),
                limit: Number(limit),
            });
            
            const postCount = await models.Post.count({
                where: {
                    status: models.Post.const.status.active,
                },
                include: [ 
                    {
                        model: models.PostTag,
                        where: {
                            tag:tag
                        }
                    }
                ]
            });

            return res.status(200).json({
                status:"success",
                data: {
                    postCount,
                    post
                }
            })

        } catch (error) {
            return res.status(500).json({
                status:"error",
                data: error
            }) 
        }

    },

    getCategoryPosts: async (req, res) => {

        const limit = req.params.limit || 20;
        const offset = req.params.offset || 0;
        const category_id = req.params.category_id

        try {
            
            let post = await models.Post.findAll({
                where: {
                    status: models.Post.const.status.active,
                    category_id
                },
                include:[{ model: models.User }, { model: models.Category }, { model: models.Category }],
                order: [
                    ['id', 'DESC']  
                ],
                offset: Number(offset),
                limit: Number(limit),
            });

            const postCount = await models.Post.count({
                where: {
                    status: models.Post.const.status.active,
                    category_id
                }
            });
            

            return res.status(200).json({
                status:"success",
                data: {
                    post,
                    postCount
                }
            })

        } catch (error) {
            return res.status(500).json({
                status:"error",
                data: error
            }) 
        }

    },


    getPost: async (req, res) => {

        const id = req.params.id || 2;

        try {
            
            let post = await models.Post.findOne({
                where: {
                    id: Number(id),
                    status: models.Post.const.status.active
                },
                include: [{ model: models.User },  { model: models.Category }, { model: models.PostTag }],
            });

            const comments = await models.Comment.findAll({
                where: {
                    post_id: Number(id),
                    status: models.Comment.const.status.active
                },
                include: [{ model: models.User }],
            });
            
            const likeCount = await models.Like.count({
                where: {
                    post_id: Number(id),
                    status: models.Like.const.status.active  
                }
            });

            const shareCount = await models.Share.count({
                where: {
                    post_id: Number(id),
                    status: models.Share.const.status.active  
                }
            });

            const commentCount = comments.length;

            const data = Object.assign({ commentCount, likeCount, shareCount, comments }, post.toJSON());
           

            return res.status(200).json({
                status:"success",
                data
            })

        } catch (error) {
            return res.status(500).json({
                status:"error",
                data: error
            }) 
        }
        

    }
}

module.exports = PostController