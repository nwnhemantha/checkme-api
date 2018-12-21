const models = require('../models');

const CategoryController = {

    getCategories: async (req, res) => {

        const Category = await models.Category.findAll({});
        
        return res.status(200).json({
            status:"success",
            data: Category
        })
    }
}

module.exports = CategoryController