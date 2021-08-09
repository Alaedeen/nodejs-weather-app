const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define paths for Express config
const pubDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) // not required usualy naming the folder 'views' would work fine without having to define it like this
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(pubDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Alaedeen'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Alaedeen'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'feel free to ask us anything',
        title: 'Help page',
        name: 'Alaedeen'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.adress) {
        return res.send({
            error: 'You must provide an adress'
        })
    }
    const location = req.query.adress

    geocode(location, (err, { latitude, longitude } = {}) => {
        if (err) {
            return res.send({
                error: err
            })
        } else {
            forecast(latitude, longitude, (err, { weather_descriptions, locationName,
                region, country, temperature, feelslike } = {}) => {

                if (err) {
                    return res.send({
                        error: err
                    })
                } else {
                    res.send({
                        forecast: 'It is ' + weather_descriptions +'. The temperature is ' +
                            temperature + '°, while it feels like ' + feelslike + '°.',
                        location : locationName + ', ' + region + ' ' + country
                    })
                }
            })
        }
    })


})

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        errorMessage: 'Help article not found.',
        title: '404 Not Found',
        name: 'Alaedeen'
    })
})

app.get('*', (req, res) => {
    res.render('notfound', {
        errorMessage: 'Page not found',
        title: '404 Not Found',
        name: 'Alaedeen'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})