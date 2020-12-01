const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieWFzaXJ1bmoiLCJhIjoiY2tocmp2NXFyMHY3czJ2bWc0bzlzd3ducSJ9.jvnIH4WdnUB7LKQ9VUOrjQ&limit=1'

    request ( {url, json:true}, (error,{body}) => { // url - shorthand object syntax
        if (error) {
            callback('Unable to connect to loaction services!', undefined);
        }
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search!', undefined);
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;