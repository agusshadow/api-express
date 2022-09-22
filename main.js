// pm run (script)
// ej: npm run dev -> corre en dev

const { log } = require('console');
const fs = require('fs')
const axios = require('axios')
const express = require('express');
const app = express();
const port = 3002;

app.get('/', (req, res) => {
    fs.readFile('./index.html', (err, data) => {
        err ? console.log(err) : res.send(data.toString())
    })
})

//'http://localhost:3002/user?nombre=agustin&apellido=gonzalez'

app.get('/user', (req, res) => {
    const { nombre, apellido } = req.query 
    res.json({
        nombre: nombre,
        apellido: apellido,
    })
})

app.get('/users', (req, res) => {
    let url = 'https://dummyjson.com/users'
    axios.get(url)
        .then(response => res.send(response.data))
        .catch(err => res.json(err))
})

app.get('/users/:id', (req, res) => {
    const { id } = req.params
    let url = `https://dummyjson.com/users/${id}`
    axios.get(url)
        .then(response => {
            res.json({
                nombre: response.data.firstName,
                apellido: response.data.lastName,
            })
        })
})

app.listen(port, () => {
    console.log('escuchando en el puerto ' + port);
})