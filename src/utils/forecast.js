const request = require('postman-request')

const forecast = (latitude, longitude, callback)=> {
    const url = 'http://api.weatherstack.com/current?access_key=ee1898a590e295cc2ad4ccd10e787dce&query='+
    latitude+','+ longitude

request({url , json: true},(err,_,body)=>{

    if (err) {
        callback('Unable to fetch data!',undefined)
    } else if (!body.current) {
        callback('invalid location coordinates!',undefined)
    } else {

        callback(undefined,{
            weather_descriptions : body.current.weather_descriptions[0],
            locationName: body.location.name,
            region: body.location.region,
            country: body.location.country,
            temperature: body.current.temperature,
            feelslike: body.current.feelslike
        })
    }

})
} 

module.exports = forecast