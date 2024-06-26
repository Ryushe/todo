const express = require('express');
const messages = require('./messages');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.send(messages.home);
});
app.get('/about', (req, res) => {
  res.send(messages.about);
});
app.use((req, res) => {
  res.status(404).send(messages.notFound);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});