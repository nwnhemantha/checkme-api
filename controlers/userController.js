const models = require('../models');

const UserController = {

    signIn: async (req, res) => {
        
        try {
            const userData = req.body.userData;

            if(userData.login_type != models.User.const.login_type.anonymous) {
                const isExist = await models.User.findOne({
                    where: {
                        email: userData.email,
                        login_type: userData.login_type
                    }
                });
                
                if(isExist) {
                    return res.status(200).json({
                        status:"success",
                        data: isExist
                    });
                    return false;
                } else {
                    const user = await models.User.create(userData);
                    return res.status(200).json({
                        status:"success",
                        data: user
                    });
                    return false;
                }
    
            } else {
                const user = await models.User.create(userData);
                return res.status(200).json({
                    status:"success",
                    data: user
                })
            }
        } catch (error) {
            return res.status(500).json({
                status:"error",
                data: error
            })
        }
        
        
        
    }
}

module.exports = UserController