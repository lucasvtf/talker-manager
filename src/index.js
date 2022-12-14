const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// Endpoints

const talkerPath = path.resolve(__dirname, './talker.json');
const readFile = async () => {
  try {
    const data = await fs.readFile(talkerPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(`Arquivo não pode ser lido: ${error}`);
  }
}


app.get('/talker', async (req, res) => {
  try {
    const data = await readFile();
    return res.status(200).json( data )
} catch (error) {
    return res.status(200).json()
}
})