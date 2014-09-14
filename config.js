var _ = require('lodash');

// load settings.json
var settings = require('./settings.json');

var Dynamite = require('dynamite')

exports.DB = new Dynamite.Client({
    region: settings.dynamodb.region,
    accessKeyId: settings.dynamodb.access_key,
    secretAccessKey: settings.dynamodb.secret_key,
    sslEnabled: true
});

exports.tables = settings.dynamodb.tables;