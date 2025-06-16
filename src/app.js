const express = require('express');
const app = express();
require('dotenv').config();
const API_KEY = process.env.API_KEY;

app.use(express.json());

app.get('/', (req, res) => {
  console.log('Solicitud recibida');
  res.send('API Insegura funcionando');
});


app.get('/secure-data', (req, res) => {
  const key = req.headers['x-api-key'];
  if (key !== API_KEY) {
    return res.status(403).json({ error: 'Acceso denegado' });
  }
  res.json({ secret: '12345' });
});

app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
    res.status(403).json({ error: 'Token CSRF inválido' });
});

module.exports = app;

