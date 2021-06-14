const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const Users = require('../../models/users')

exports.register = async (req, res) => {
    bcrypt.hash(req.body.password, 10, async (error, hash) => {
        if(error) {
            return res.status(400).json(error)
        }

        const user = await Users.create({
            name: req.body.name,
            email: req.body.email,
            password: hash
        })

        const token = await jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email
        },
        config.get('jwt_key'),
        {
            expiresIn: "1h"
        })

        return res.status(200).json({access_token: token});
    })
}

exports.login = async (req, res) => {
    const user = await Users.findOne({ where: { email: req.body.email } })

    if(user) {
        bcrypt.compare(req.body.password, user.password, async (error, result) => {
            if(error) {
                return res.status(401).json({error: 'E-mail ou Senha incorretos'});
            }
            
            if(result) {
                const token = await jwt.sign({
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                config.get('jwt_key'),
                {
                    expiresIn: "1h"
                })

                return res.status(200).json({access_token: token});
            }
        })
    } else {
        return res.status(401).json({error: 'E-mail ou Senha incorretos'});
    }
}