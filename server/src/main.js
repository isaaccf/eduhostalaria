const express = require('express');
const app = express();

const middleware = require('./app/tools/middleware');
middleware.useMiddleware(app);
require('./app/lib/index.controller')(app);

app.listen(2000);
console.log('listening on port 2000');