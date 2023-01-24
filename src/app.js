const express = require('express');
const app = express();

const config = require('./config/config.env.js');



app.listen(config.app.port, () =>
  console.log(`BlogMuta corriendo en el puerto ${config.app.port}`)
);
