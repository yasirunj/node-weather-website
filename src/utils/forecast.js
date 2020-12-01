const request = require('request');

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ca69a004d5542528314c999c6dbe672b&query=' + lat + ',' + lon;

    request ({url, json:true}, (error, {body}) => { // url - shorthand syntax
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        }
        else if (body.error) {
            callback('Unable to find location', undefined);
        }
        else {
             callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out');
        }
    })
}

module.exports = forecast; 