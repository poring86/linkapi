require('../database/mongodb');


const express = require('express')
const axios = require('axios')
const dateFormat = require("dateformat")
// const cron = require("node-cron")
const moment = require('moment')


const xml = require('../utils/bling-xml')

const Order = require('../model/Order')

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

app.get('/envio-bling', async (req, res) => {
    axios.get(`https://matt3.pipedrive.com/api/v1/deals?api_token=${pipedrive_api_key}&status=won`, {

    })
    .then(response => {

        let pedidos = response.data.data

        for ( pedido of pedidos ){
            let orderId = pedido.id

            let name = pedido.person_id.name

            let won_time = pedido.won_time
            won_time = dateFormat(won_time, 'paddedShortDate')

            let value = pedido.value

            let xmlSend = xml(name, won_time, value)


            axios.post(`https://bling.com.br/Api/v2/pedido/?apikey=${bling_api_key}&xml=${xmlSend}`, {
            })
            .then(response => {

                const order = new Order({
                    value,
                    name,
                    won_time,
                    orderId
                })

                try{
                    order.save()
                }
                catch(err){
                    console.log(err)
                }
                
            })
            .catch(err => {
                console.log(err)
            })
        }

       res.send('Pedidos enviados ao bling!')
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
    .catch(err => {
        console.log(err)
    })
})

app.get('/xml-test', (req, res) => {
    res.send(xml())
})

app.get('/total', async (req, res) => {
    if (!req.query.data){
        res.send('Envie o parâmetro data!')
    }
    else{
        let data = req.query.data

        orders = await Order.find({
            won_time: {
              $gte: moment(data).startOf('day'),
              $lte: moment(data).endOf('day').toDate()
            }
        })
    
        let totalAmout = 0
        orders.map( order => {
            totalAmout += order.value
        })
    
    
        let stringSend = `O total do dia 2021-02-22 é ${totalAmout}`
    
    
        res.send(stringSend)
    }
})

// cron.schedule("1,2,4,5 * * * * *", () => {
// 	console.log("running a task every 10 second")
// })


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})