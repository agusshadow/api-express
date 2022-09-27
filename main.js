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

app.get('/check', (req, res) => {
    const { ms, pais } = req.query 
    res.json({
        check: `/cobot microservice check_consistency --service ${ms} --country ${pais}`,
        fix: `/cobot microservice fix --service ${ms} --country ${pais}`,
    })
})

// usuarios

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
                id: response.data.id,
                img: response.data.image,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                age: response.data.age,
                gender: response.data.gender,
                contact : {
                    mail: response.data.email,
                    phone: response.data.phone,
                }
            })
        })
})

app.get('/users/:id/posts', (req, res) => {
    const { id } = req.params
    let url = `https://dummyjson.com/posts/${id}`
    axios.get(url)
        .then(response => {
            res.json({
                id: response.data.id,
                img: response.data.image,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                age: response.data.age,
                gender: response.data.gender,
                contact : {
                    mail: response.data.email,
                    phone: response.data.phone,
                }
            })
        })
})

// posts

app.get('/posts', (req, res) => {
    let url = 'https://dummyjson.com/posts'
    axios.get(url)
        .then(response => res.send(response.data))
        .catch(err => res.json(err))
})

app.get('/posts/:id', (req, res) => {
    const { id } = req.params
    let url = `https://dummyjson.com/posts/${id}`
    axios.get(url)
        .then(response => res.send(response.data))
        .catch(err => res.json(err))
})

app.listen(port, () => {
    console.log('escuchando en el puerto ' + port);
})