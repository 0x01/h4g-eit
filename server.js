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


// API
var R = require('./server/resource');

app.get('/users', R.Users.list);
app.get(/\/user\/(.+?)\/checks/, R.Checks.list);
app.get(/\/user\/(.+?)\/check_count/, R.Users.check_count);

mach.serve(app, 3000);