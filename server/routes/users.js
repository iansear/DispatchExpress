const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const key = 'secret key'
const models = require('../models')
const router = express.Router() 

router.post('/login', (req, res) => {
    models.User.findOne({
        where: {
            username: req.body.username
        }
    }).then((user) => {
        if(user) {
            bcrypt.compare(req.body.password, user.password).then((isPassword) => {
                if(isPassword) {
                    const token = jwt.sign({user: user.id}, key)
                    res.send({user: user, token: token})
                } else {
                    res.send()
                }
            }) 
        } else {
            res.send()
        }
    }).catch((error) => res.send(error))
})

router.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, 13).then((hashword) => {
        const user = models.User.build({
            username: req.body.username,
            password: hashword,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role,
            team: req.body.team
        })
        user.save().then((resp) => res.send(resp)).catch((error) => res.send(error))
    })
})

router.get('/getcouriers/:team', (req, res) => {
    models.User.findAll({
        where: {
            role: 'DELIV',
            team: req.params.team
        }
    }).then((couriers) => res.send(couriers))
})

module.exports = router