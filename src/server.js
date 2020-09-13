const path = require('path');

require('app-module-path').addPath(path.resolve(__dirname, '../'));

const express = require('express');
const helmet = require('helmet');

const routes = require('src/routes');
const uploadsFolder = require('src/utils/uploadsFolder.js');

const app = express();

const HTTP_PORT = 3000;
app.listen(HTTP_PORT, () => {
  console.log(`Server running on http://localhost:${HTTP_PORT}`);
});

app.use(helmet());

app.use(express.urlencoded({
  limit: '10mb',
  extended: true,
}));

app.use(express.json({
  limit: '10mb',
  extended: true,
}));

app.use('/images', express.static(uploadsFolder));
// app.use('/uploads', express.static(`${__dirname}../uploads`));

app.use(routes);
