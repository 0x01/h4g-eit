var _ = require('lodash');

// load settings.json
var settings = require('./settings.json')['radar_api.30mhz.com'];

var Dynamite = require('dynamite')

exports.DB = new Dynamite.Client({
    region: settings.dynamodb.region,
    accessKeyId: settings.dynamodb.access_key,
    secretAccessKey: settings.dynamodb.secret_key,
    sslEnabled: true
});

exports.tables = {
    users: settings.dynamodb.users_table_name,
    checks: settings.dynamodb.checks_table_name
};

var braintree = require('braintree');

exports.BrainTree = braintree.connect({
    environment: braintree.Environment[settings.braintree.environment],
    merchantId: settings.braintree.merchant_id,
    publicKey: settings.braintree.public_key,
    privateKey: settings.braintree.private_key
});

console.log(exports.BrainTree.transaction);