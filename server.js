const express = require('express')
const jsonServer = require('json-server')

const app = express()
app.use('/', express.static('dist'))
app.use('/', express.static('assets'))
const router = jsonServer.router('data.json')
app.use(jsonServer.bodyParser)
app.use('/api', (req, res, next) => router(req, res, next))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))