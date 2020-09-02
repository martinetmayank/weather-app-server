const request = require('request')

const geocode = (address, callback) => {

    const MapBoxAPI = 'pk.eyJ1IjoibWFydGluZXRtYXlhbmsiLCJhIjoiY2tlMGJqOHQ2MXJtOTMwb3NkMGFvc254biJ9.r2mocrfZoiLzOWMA_7GpSw'

    /*
    We can use 'encodeURIComponent(address)' or 'address'
    Both are correct but, the function, 'encodeURIComponent(address)' encodes
    properly and takes care of special characters such as:
    'space' is represented as '%2f'.
    'New York' will be 'New%20York'
    */

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + MapBoxAPI + '&limit=1'

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
            callback('Unable to connect to location services...', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location, try another search...', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode