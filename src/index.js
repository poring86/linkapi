require('./database/mongodb');


const express = require('express')
const routes = require('./routes')

const app = express()

app.use(routes)

const port = process.env.PORT


// cron.schedule("1,2,4,5 * * * * *", () => {
// 	console.log("running a task every 10 second")
// })


app.listen(port, () => {
    console.log(`Listening at port ${port}`)
})