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
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out with maximum of ' + body.daily.data[0].temperatureHigh + ' degrees and low of ' + body.daily.data[0].temperatureLow + ' degrees. There is ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast