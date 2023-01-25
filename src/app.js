const express = require('express');
const app = express();

const config = require('./config/config.env.js');
const { logErrors, ormErrorHandler, boomErrorHandler, errorHandler } = require('./middlewares/error.handler.js');
const { routerApi } = require('./router/router.js');

app.use(express.json());
require('./passport/passport.index.js');

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(config.app.port);
