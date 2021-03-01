const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const orderSchema = new mongoose.Schema({
    value: {
        type: Number,
        required: true
    },
    orderId: {
        type: Number,
        required: true,
        unique: true,
        index : {
            unique : true,
            dropDups : true
        }
    },
    name: {
        type: String,
        required: true
    },
    won_time: { 
        type: Date,
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now, 
        required: true 
    }
}, {
    timestamps: true
})

orderSchema.plugin(uniqueValidator)

const Order = mongoose.model('Order', orderSchema)

module.exports = Order