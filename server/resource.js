var pp = require('prettyjson');
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
        .fcall(function () {
            return [{
                first_name: 'jelle',
                last_name: 'foo',
                email_address: 'jelle@defekt.nl',
                ping_count: 123,
                credits: 5,
                ping_cost: 1.2,
                sms_cost: 1.4
            }];
        });
}



exports.Users = {
    list: function() {
        return db
            .newScanBuilder(tables.users)
            .execute()
            .then(_.property('result'))
            .then(H.map(
                function(user){
                    return {
                        first_name: user.first_name,
                        last_name: user.last_name,
                        status: user.status,
                        email: user.email_address,
                        pings: user.ping_count,
                        credits: user.credits - (user.ping_cost + user.sms_cost)
                    };
                })
                .value()
            )
            .then(mach.json);
    },

    check_count: function(req, email_address) {
        return db
            .newQueryBuilder(tables.checks)
            .setHashKey('email_address', email_address)
            .selectAttributes(['enabled', 'frequency', 'locations'])
            .execute()
            .then(_.property('result'))
            .then(H
                .reduce(function(accum, value){
                    var on = value.enabled || 0
                    var locs = (value.locations && value.locations.length) || 0
                    var F = (1/value.frequency) * locs * on;
                    accum.checks_enabled += on;
                    accum.checks_disabled += 1 - on;
                    accum.checks_total += 1;
                    accum.frequency += F || 0;
                    return accum;
                },{
                    checks_enabled: 0,
                    checks_disabled: 0,
                    checks_total: 0,
                    frequency: 0.0
                })
            )
            .then(mach.json);
    }
};

exports.Checks = {
    list: function(req, email_address) {
        return db
            .newQueryBuilder(tables.checks)
            .setHashKey('email_address', email_address)
            .execute()
            .then(_.property('result'))
            .then(H
                .map(function(check){
                    return {
                        name: check.name,
                        id: check.check_id,
                        enabled: check.enabled,
                        interval: check.frequency,
                        locations: check.locations,
                        nr_recent_ups: check.nr_recent_ups,
                        nr_recent_downs: check.nr_recent_downs,
                        last_down: check.recently_down_at,
                        state: check.state,
                        url: check.url
                    };
                })
                .value()
            )
            .then(mach.json);
    }
};

function btSale(saleRequest) {
    var deferred = Q.defer();
    config.BrainTree.transaction.sale(saleRequest, function (err, result) {
        if(err)
            deferred.reject(err);
        if(result)
            deferred.resolve(result);
    });
    return deferred.promise;
}

exports.Payments = {
    create_transaction: function(req, amount) {

        var saleRequest = {
            amount: amount + '.00',
            creditCard: {
                number: req.params.number,
                cvv: req.params.cvv,
                expirationMonth: req.params.exp_month,
                expirationYear: req.params.exp_year
            },
            options: {
                submitForSettlement: true
            }
        };

        console.log('saleRequest', pp.render(saleRequest));

        return btSale(saleRequest)
            .then(
                function(result) {
                    console.log('result', pp.render(result));
                    // it went ok!
                    if (result.success) {

                        return mach.json({
                            status: 'success',
                            transaction_id: result.transaction.id,
                            amount: result.transaction.amount,
                            response: result
                        });
                    }

                    // something failed
                    return mach.json({
                        status: 'error',
                        message: result.message
                    });
                })
            .fail(function(err){
                console.error(err);
            });
    }
};