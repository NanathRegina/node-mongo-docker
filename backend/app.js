const express = require('express')
const restful = require('node-restful')
const server = express()
const mongoose = restful.mongoose
const bodyParser = require('body-parser')
const cors = require('cors')

//Banco de dados
mongoose.Promise = global.Promise
mongoose.connect('mongodb://db/mydb')

//Camada intermediária
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())
server.use(cors())

//ODM - mapeamento objeto x documento
const Client = restful.model('Client', {
    name:{type: String, required: true}
})

//API REST
Client.methods(['get', 'post', 'put', 'delete'])
Client.updateOptions({new: true, runValidatores: true})

//Rotas
Client.register(server, '/clients')

//Inicia o servidor
server.listen(3000)