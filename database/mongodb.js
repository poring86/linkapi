  
const Mongoose = require('mongoose');

Mongoose.connect('mongodb://localhost:27017/linkapi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

console.log('Connected to database!')