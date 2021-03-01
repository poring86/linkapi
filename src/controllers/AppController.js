
const express = require('express')

const axios = require('axios')
const dateFormat = require("dateformat")
// const cron = require("node-cron")
const moment = require('moment')


const xml = require('../utils/bling-xml')
const Order = require('../models/Order')

const pipedrive_api_key = process.env.PIPEDRIVE_API_KEY
const bling_api_key = process.env.BLING_API_KEY

class AppController {
    async getDeals(req, res){
        try {
            const response = await axios.get(`https://matt3.pipedrive.com/api/v1/deals?api_token=${pipedrive_api_key}&status=won`)
            return res.json(response.data.data)
        }
        catch (err) {
            res.send(err)
        }
    }

    async sendBling(req, res){
        try{
            const response = await axios.get(`https://matt3.pipedrive.com/api/v1/deals?api_token=${pipedrive_api_key}&status=won`)
    
            let pedidos = response.data.data
    
            for ( pedido of pedidos ){
                let orderId = pedido.id
    
                let name = pedido.person_id.name
    
                let won_time = pedido.won_time
                won_time = dateFormat(won_time, 'paddedShortDate')
    
                let value = pedido.value
    
                let xmlSend = xml(name, won_time, value)
    
                try{
                    await axios.post(`https://bling.com.br/Api/v2/pedido/?apikey=${bling_api_key}&xml=${xmlSend}`)
    
                    const order = new Order({
                        value,
                        name,
                        won_time,
                        orderId
                    })
    
                    try{
                        await order.save()
                    }
                    catch(err){
                        console.log(err)
                    }
                    
    
                }
                catch(err){
                    console.log(err)
                }
            }
    
            res.send('Pedidos enviados ao bling!')
        }
        catch (err) {
            res.send(err)
        }
    }

    async getBling(req, res){
        try{
            const response = await axios.get(`https://bling.com.br/Api/v2/pedidos/json?apikey=${bling_api_key}`)
            res.send(response.data)
        }
        catch (err) {
            res.send(err)
        }
    }

    async testXml(req, res){
        res.send(xml())
    }

    async total(req, res){
        if (!req.query.data){
            try{
                const allByDay = await Order.aggregate(
                    [
                        {
                            $group : {
                                _id: { day: { $dayOfMonth: "$date"}, month: { $month: "$date"}, year: { $year: "$date" } },
                                totalAmount: { $sum: "$value" },
                            }
                        }
                    ]
                )
                res.send(allByDay)
            }
            catch(err){
                console.log(err)
            }
        }
        else{
            let data = req.query.data

            try{
                const orders = await Order.find({
                    won_time: {
                      $gte: moment(data).startOf('day'),
                      $lte: moment(data).endOf('day').toDate()
                    }
                })
            
                let totalAmout = 0
                orders.map( order => {
                    totalAmout += order.value
                })
        
                let stringSend = `O total do dia ${data} é ${totalAmout}`
        
                res.send(stringSend)
            }
            catch (err) {
                console.error(err)
            }
        }
    }
}

module.exports = new AppController()