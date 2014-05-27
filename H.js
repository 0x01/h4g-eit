var _ = require('lodash');
var Q = require('kew');


var chainable = ['map','filter','property','pick','omit'];
var terminal = ['value','size','reduce'];
var operators = _.union(chainable,terminal);

function H(underscore)
{
    this.underscore = underscore || _;
    this.stack = []
}

H.prototype._reduceStack = function(initial) {
    return this.underscore.reduce(this.stack, function(accum, entry) {
            return accum[entry[0]].apply(accum, entry[1])
        }, this.underscore(initial));
}

H.prototype._pushStack = function(operator, args) {
    this.stack.push([operator, args]);
}

// delegate operators
_.each(operators, function(operator){
    H.prototype[operator] = function() {
        this._pushStack(operator, arguments);

        // terminal functions cannot apply further operators,
        // so return fn that reduces the stack to the final value
        if(_(terminal).contains(operator))
            return (function(init){
                return this._reduceStack(init);
            }).bind(this);

        // otherwise, keep chaining
        return this;
    }
});

// it should always return a callable value
// but you can also keep chaining

// static methods that automatically create new instance
// (so one can write `H.map()` instead of `H().map()`)
_.each(operators, function(operator){
    H[operator] = function() {
        return H.prototype[operator].apply(new H(), arguments);
    }
});

/*
var F = function() {
};
F.prototype.hello = function(){
    console.log(this, arguments);
}
F.hello = function(){
    return new F().hello(arguments);
}
F.hello('world');
*/

// when one types .then
//H.prototype.then = function(init) {
//    if(_(terminal).contains(_(this.stack).last()))
//        return Q(this._reduceStack(init).value());
//    return Q(this._reduceStack(init));
//}

module.exports = H

//console.log(hey(['hello','fucking','world']));

var result = Q
    .fcall(function(){ return ['hello','fucking','fucked up','world']; })
    .then(H
        .map(function(s){
            return s.replace('ing','').replace('ed','').toUpperCase();
        })
        .filter(function(s){
            return !s.match(/^FUCK/); // no swearing
        })
        .value()
    )
    .then(function(data){
        console.log(data);
    });
