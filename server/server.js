const express = require('express');
const messages = require('./messages');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path'); 

const app = express();
const port = 4000;

app.use(express.static('public'));
app.use(express.json())

app.get('/', (req, res) => {
  res.send(messages.home);
});
app.get('/about', (req, res) => {
  res.send(messages.about);
});

// CORS configuration (consider specific origins for security)
// app.use(cors({ origin: 'http://localhost:3001' })); // Replace with allowed origin


// reads note file
async function getNote(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') { // Handle file not found
      console.warn(`File not found: ${filePath}`);
      return null; // Indicate missing file
    } else {
      throw error; // Re-throw other errors
    }
  }
}

// get data with post request
app.post('/data', async (req, res) => {
  try {
    const { filename } = req.body; // Destructure data from request body
    if (!filename) {
      return res.status(400).send('Missing required field: filename');
    }
    const filePath = path.join(__dirname, '..','notes', `${filename}.json`); // Construct full path
    const data = await getNote(filePath);
    if (!data) {
      return res.status(404).send('Data file not found.');
    }
    else{
      res.json(data);
    }

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error with data file');
  }
});

app.post('/updateData', async (req, res) => { // figure out why data clears the data and not updates it (can make async but didnt do shit)
  const { data, filename } = req.body;
  const filePath = path.join(__dirname, '..','notes', `${filename}.json`); // Construct full path
  if (data.length != 0) {
    try {
      await fs.writeFile(filePath, JSON.stringify(data, null, 4));
      return res.status(200).send('Json updated bby' + data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return res.status(400).send('Error: File does not exist!');
      } else if (error.code === 'EACCES') {
        return res.status(403).send('Error: Permission denied!');
      } else {
        return res.status(500).send('Error updating JSON data!');
      }
    }
  }
})


app.use((req, res) => {
  res.status(404).send(messages.notFound);
});
app.use(bodyParser.urlencoded({ extended: false })); // parses incoming req bodies under req.body

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});



