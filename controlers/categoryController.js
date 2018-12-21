const models = require('../models');

const CategoryController = {

    getCategories: async (req, res) => {

        const post = await models.Category.findAll({
            include: [
                { model: models.Post}
            ]
        });
        
        console.log('sasassas',models.Category.const);

        return res.status(200).json({
            status:"success",
            data: post
        })
    }
}

module.exports = CategoryController