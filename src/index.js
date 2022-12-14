const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const { loginValidation } = require('./middlewares/loginValidation');

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
};

app.get('/talker', async (req, res) => {
    const data = await readFile();
    if (!data) {
      return res.status(200).json();
    }
    return res.status(200).json(data);
});

app.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const data = await readFile();
    const findID = data.find((e) => e.id === +id); 
    if (!findID) {
      return res.status(404).json({
        message: 'Pessoa palestrante não encontrada',
      });
    }
    return res.status(200).json(findID);
});

app.post('/login', loginValidation, (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  if (token) {
    return res.status(200).json({ token: `${token}` });
  }
}); 