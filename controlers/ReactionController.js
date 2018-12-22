const models = require('../models');

const ReactionController = {

    createLike: async (req, res) => {

        try {
            
            const { post_id, user_id } = req.body
    
            const like = await models.Like.findOrCreate({
                where: {
                    user_id,
                    post_id
                },
                defaults: {
                    user_id,
                    post_id
                }
            });
            
            return res.status(200).json({
                status:"success",
                data: like
            })

        } catch (error) {
            return res.status(500).json({
                status:"error",
                data: error
            })
        }
    },

    createComment: async (req, res) => {

        try {
            
            const { post_id, user_id, comment } = req.body
    
            const comments = await models.Comment.create({
                user_id,
                post_id,
                comment
            });
            
            return res.status(200).json({
                status:"success",
                data: comments
            })

        } catch (error) {
            return res.status(500).json({
                status:"error",
                data: error
            })
        }
    },

    createShare: async (req, res) => {

        try {
            
            const { post_id, user_id} = req.body
    
            const comments = await models.Share.create({
                user_id,
                post_id
            });
            
            return res.status(200).json({
                status:"success",
                data: comments
            })

        } catch (error) {
            return res.status(500).json({
                status:"error",
                data: error
            })
        }
    }

}

module.exports = ReactionController