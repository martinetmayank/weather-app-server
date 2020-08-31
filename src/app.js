const path = require('path')
const express = require('express')


const app = express()
const publicDirPath = path.join(__dirname, '../public')

app.use(express.static(publicDirPath))

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