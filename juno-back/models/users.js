const Sequelize = require('sequelize');
const database = require('../config/db');
 
const Users = database.define('users', {
    name: { type: Sequelize.STRING },
    email: { 
        type: Sequelize.STRING, 
        unique: true, 
        allowNull: false 
    },
    password: { 
        type: Sequelize.STRING,
        allowNull: false
    },
}, 
{
    timestamps: false,
})

Users.associate = models => { 
    User.hasMany(models.AuthToken); 
};
 
module.exports = Users;