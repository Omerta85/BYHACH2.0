const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: 'AIzaSyCWKRh2JwzdT7y1Au-_ZWnrw5jyY1dejtE',
    formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;