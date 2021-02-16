const express = require('express')
const axios = require('axios')
const dateFormat = require("dateformat");

const xml = require('./bling-xml')

const app = express()
const port = process.env.PORT
const pipedrive_api_key = process.env.PIPEDRIVE_API_KEY
const bling_api_key = process.env.BLING_API_KEY

app.get('/', (req, res) => {
    axios.get(`https://matt3.pipedrive.com/api/v1/deals?api_token=${pipedrive_api_key}&status=won`, {

    })
    .then(response => {
       res.send(response.data.data)
    })
    .catch(err => {
        res.send(err)
    })
})

app.get('/envio-bling', (req, res) => {
    axios.get(`https://matt3.pipedrive.com/api/v1/deals?api_token=${pipedrive_api_key}&status=won`, {

    })
    .then(response => {

        let pedidos = response.data.data

        for ( pedido of pedidos ){
            let name = pedido.person_id.name

            let won_time = pedido.won_time
            won_time = dateFormat(won_time, 'paddedShortDate')

            let value = pedido.value

            let xmlSend = xml(name, won_time, value)

            console.log(name)

            axios.post(`https://bling.com.br/Api/v2/pedido/?apikey=${bling_api_key}&xml=${xmlSend}`, {
            })
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
        }

       res.send(response.data.data)
    })
    .catch(err => {
        res.send(err)
    })
})

app.get('/bling-pedidos', (req, res) => {
    axios.get(`https://bling.com.br/Api/v2/produtos/json&apikey=${pipedrive_api_key}`, {

    })
    .then(response => {
       res.send(response.data)
    })
})

app.get('/xml-test', (req, res) => {
    res.send(xml())
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})