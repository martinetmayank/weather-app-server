const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

// Adding template engine 'express handlebars: hbs'
app.set('view engine', 'hbs')

// setup views location
app.set('views', viewsPath)

// Partials
hbs.registerPartials(partialsPath)

// Setup static directory to work
app.use(express.static(publicDirPath))


//  ** ----------------------------------------------------------------------------
//  ** ----------------------------------------------------------------------------
// We are using hbs rendering...
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mayank'
    })
})

// About page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mayank'
    })
})

// Help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Mayank',
        helpText: 'This is my help'
    })
})

// Weather app page
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })

})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

// 404 help page
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Mayank',
        errorMessage: 'Help page not found...'
    })
})

// 404 page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: '404, page not found...',
        name: 'Mayank'
    })
})

//  ** ----------------------------------------------------------------------------

app.listen(3000, () => {
    console.log('Server is up on port 3000...')
})