const express = require('express');
const messages = require('./js/messages');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

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
app.use(bodyParser.urlencoded({ extended: false })); // parses incoming req bodies under req.body


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});