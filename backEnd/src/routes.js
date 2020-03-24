const express = require('express')
const routes = express.Router()

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

routes.get('/', (req,res) => {
    return res.json({
        version: 1,
        description: 'Omnistack11 API'
    }) 
})

routes.post('/session', SessionController.create)

routes.post('/ongs', OngController.create)
routes.get('/ongs', OngController.read)

routes.get('/profile', ProfileController.read)

routes.post('/incidents', IncidentController.create)
routes.get('/incidents', IncidentController.read)
routes.delete('/incidents/:id', IncidentController.delete)

module.exports = routes