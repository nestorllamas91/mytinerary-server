if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config();
}
require = require('esm')(module);
require('module-alias/register');
module.exports = require('./app/server');
