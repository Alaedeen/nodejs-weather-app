const request = require('postman-request')

const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+
    encodeURIComponent(adress)+
    '.json?access_token=pk.eyJ1IjoiYWxhZWRlZW4iLCJhIjoiY2tzMDJ2bmVzMHoyZTJvbXI2dndsNG9pZCJ9._cHT8XKv8I5TbRZofFjvLg&limit=1'

    request({ url, json: true }, (err, _, body) => {
        if (err) {
            callback('Unable to fetch data!',undefined)
        } else if (body.features.length === 0) {
            callback('invalid location name!',undefined)
        } else {
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0]
            })
        }

    })
}

module.exports= geocode