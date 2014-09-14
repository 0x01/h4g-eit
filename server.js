var path = require('path');
var mach = require('mach');
var app = mach.stack();

app.use(mach.gzip);
app.use(mach.logger);
app.use(mach.contentType, 'text/html');
app.use(mach.params);

// serve our 1-page app
app.use(mach.file, {root: path.join(__dirname, 'public'), index: ['index.html']})
app.use(mach.file, {root: path.join(__dirname, 'bower_components')})


// /config API
var config = require('./config');
app.get('/config/environment', function() {
    return mach.json(config.environment);
});

// /user(s) API
var R = require('./server/resource');
app.post('/api/cards', R.Cards.list);
app.post('/api/cards/children', R.Cards.children);
app.post('/api/cards/count', R.Cards.count);
app.post('/api/cards/upvote', R.Cards.upvote);
app.post('/api/cards/star', R.Cards.star);
app.post('/api/cards/unstar', R.Cards.unstar);
app.post('/api/card/addlabel', R.Cards.addlabel);
app.post('/api/cards/removelabel', R.Cards.removelabel);
app.post('/api/cards/clearlabels', R.Cards.clearlabels);
app.post('/api/cards/act', R.Cards.act);
app.post('/api/cards/create', R.Cards.create);
app.post('/api/cards/update', R.Cards.update);
app.post('/api/cards/remove', R.Cards.remove);

app.get('/api/cards', R.Cards.list);
app.get('/api/cards/children', R.Cards.children);
app.get('/api/cards/count', R.Cards.count);
app.get('/api/cards/upvote', R.Cards.upvote);
app.get('/api/cards/star', R.Cards.star);
app.get('/api/cards/unstar', R.Cards.unstar);
app.get('/api/cards/addlabel', R.Cards.addlabel);
app.get('/api/cards/removelabel', R.Cards.removelabel);
app.get('/api/cards/clearlabels', R.Cards.clearlabels);
app.get('/api/cards/act', R.Cards.act);
app.get('/api/cards/create', R.Cards.create);
app.get('/api/cards/update', R.Cards.update);
app.get('/api/cards/remove', R.Cards.remove);

//app.post(/\/user\/(.+?)\/checks/, R.Checks.list);
//app.post(/\/user\/(.+?)\/check_count/, R.Users.check_count);
//app.post('/payments/:amount', R.Payments.create_transaction);

mach.serve(app, 9200);
