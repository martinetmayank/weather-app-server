const path = require('path')
const express = require('express')


const app = express()
const publicDirPath = path.join(__dirname, '../public')


// ? Adding template engine 'express handlebars: hbs'
app.set('view engine', 'hbs')
app.use(express.static(publicDirPath))


// ? We are using hbs rendering...
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mayank'
    })
})



app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mayank'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Mayank',
        helpText: 'This is my help'
    })
})

// ** Weather app
app.get('/weather', (req, res) => {
    res.send({
        forecast: '20.0',
        location: 'Gurgaon'
    })
})



app.listen(3000, () => {
    console.log('Server is up on port 3000...')
})