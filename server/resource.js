var _ = require('lodash');
var Q = require('kew');
var mach = require('mach');
var config = require('../config');

var db = config.DB;
var tables = config.tables;

// moneyeyes
var H = require('../H');

function mockDb(){
    return Q
        .fcall(function(){
            return [{
                first_name:'jelle',
                last_name:'foo',
                email_address:'jelle@defekt.nl',
                ping_count: 123,
                credits: 5,
                ping_cost: 1.2,
                sms_cost: 1.4
            }];
        })
};

exports.list = function()
{
    return db
        .newScanBuilder(tables.users)
        .execute()
        .then(_.property('result'))
        .then(H.map(
            function(user){
                return {
                    name: user.first_name + ' ' + user.last_name,
                    email: user.email_address,
                    pings: user.ping_count,
                    credits: user.credits - (user.ping_cost + user.sms_cost)
                };
            })
            .value()
        )
        .then(mach.json);
};