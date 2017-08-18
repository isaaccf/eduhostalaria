const express = require('express');
const app = express();

const middleware = require('./app/tools/middleware');
middleware.useMiddleware(app);

const { PORT = 2000 } = process.env;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`)); 