const models = require('../models');

const TagController = {

    getTags: async (req, res) => {

        const Tags = await models.Tag.findAll({ order: models.Sequelize.literal('rand()'), limit: 50 });
        
        return res.status(200).json({
            status:"success",
            data: Tags
        })
    }
}

module.exports = TagController