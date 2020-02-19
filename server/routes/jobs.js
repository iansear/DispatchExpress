const express = require('express')
const models = require('../models')
const router = express.Router() 

router.post('/createjob', (req, res) => {
    const job = models.Job.build({
        pickup: req.body.pickup,
        dropoff: req.body.dropoff,
        notes: req.body.notes,
        status: req.body.status,
        team: req.body.team
    })
    job.save().then((resp) => res.send(resp)).catch((error) => res.send(error))
})

router.post('/updatejob/:id', (req, res) => {
    console.log(req.body)
    models.Job.update({
        pickup: req.body.pickup,
        dropoff: req.body.dropoff,
        notes: req.body.notes,
        status: req.body.status,
        courier: req.body.courier
    }, {
        where: {
            id: req.params.id
        }
    }).then((resp) => res.send(resp))
})

router.get('/myjobs/:id', (req, res) => {
    models.Job.findAll({
        where: {
            courier: req.params.id
        }
    }).then((jobs) => res.send(jobs))
})

router.get('/:team', (req, res) => {
    models.Job.findAll({
        where: {
            team: req.params.team
        }
    }).then((jobs) => res.send(jobs))
})

module.exports = router