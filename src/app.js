const express = require('express')

const app = express()


// ** Homepage
app.get('', (req, res) => {
    res.send('Hello express...')
})


// ** Help page
app.get('/help', (req, res) => {
    res.send('Hello, you have reached help page...')
})


//  ** About page
app.get('/about', (req, res) => {
    res.send("I'll tell you about this page...")
})


// ** Weather app
app.get('/weather', (req, res) => {
    res.send('Weather page over here...')
})



app.listen(3000, () => {
    console.log('Server is up on port 3000...')
})