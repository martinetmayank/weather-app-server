const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const API = 'f6e2f08f428e4add899986d425d6872f'
    const url = 'https://api.darksky.net/forecast/' + API + '/' + latitude + ',' + longitude + '?units=ca'

    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        /**
         * Since we are using only one property of repsonse,
         * we can destructure it and
         * change all the occurences of 'response.body' to 'body'
         */

        if (error) {
            callback('Unable to connect ot weather service...', undefined)
        } else if (body.error) {
            callback('Unable to find location...', undefined)
        } else {
            callback(undefined, {
                temperature: body.currently.temperature,
                rainChance: body.currently.precipProbability,
                humidity: body.currently.humidity,
                visibility: body.currently.visibility,
                windSpeed: body.currently.windSpeed,
                summary: body.daily.data[0].summary,
            })
        }
    })
}

module.exports = forecast