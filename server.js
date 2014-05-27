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
app.get('/users', require('./server/resource.js').list);

mach.serve(app, 3000);
