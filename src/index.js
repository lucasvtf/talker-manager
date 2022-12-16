const express = require('express');
const talker = require('./routes/talkerRoutes');
const login = require('./routes/loginRoutes');

const app = express();
app.use(express.json());
app.use(talker);
app.use(login);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
