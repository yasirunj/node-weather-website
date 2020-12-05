const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { title } = require('process');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Yasiru Nimanka'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Yasiru Nimanka'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
       helpText: 'Helpful Text',
       title: 'Help',  
       name: 'Yasiru Nimanka'       
    });
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { // = {} if error occurs, will output a empty object
        if (error) {
            return res.send({error});
        }

        forecast(latitude, longitude, (error,forecastData) => {
            if (error) {
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a serach term'
        })
    }

    res.send({
        products: []
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',  
        name: 'Yasiru Nimanka',
        errorMsg: 'Help article not found'       
     });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',  
        name: 'Yasiru Nimanka',
        errorMsg: 'Page not found'      
     });
})


 app.listen(port, () => {
     console.log('Server is UP on port' + port);
 });      