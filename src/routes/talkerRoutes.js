const express = require('express');

const router = express.Router();
const path = require('path');
const writeFile = require('../utils/writeFile');
const readFile = require('../utils/readFile');

const tokenValidation = require('../middlewares/tokenValidation');
const { 
    nameValidation, 
    ageValidation, 
    talkValidation, 
    watchedValidation, 
    rateValidation } = require('../middlewares/bodyValidation');

const talkerPath = path.resolve(__dirname, '../talker.json');

router.get('/talker/search', tokenValidation, async (req, res) => {
    const { q } = req.query;
    const data = await readFile(talkerPath);
    const filterTalkers = data.filter((talker) => talker.name.includes(q));
  
    if (!filterTalkers) {
      return res.status(200).json([]);
    }
    return res.status(200).json(filterTalkers);
  });
  
router.get('/talker', async (req, res) => {
      const data = await readFile(talkerPath);
      if (!data) {
        return res.status(200).json();
      }
      return res.status(200).json(data);
});
  
router.get('/talker/:id', async (req, res) => {
      const { id } = req.params;
      const data = await readFile(talkerPath);
      const findID = data.find((e) => e.id === +id); 
      if (!findID) {
        return res.status(404).json({
          message: 'Pessoa palestrante não encontrada',
        });
      }
      return res.status(200).json(findID);
  });
  
router.post('/talker', 
  tokenValidation, 
  nameValidation, 
  ageValidation, 
  talkValidation, 
  watchedValidation, 
  rateValidation, 
  async (req, res) => {
      const data = await readFile(talkerPath);
      const newTalker = { id: data.length + 1, ...req.body };
      data.push(newTalker);
      await writeFile(talkerPath, data);
      return res.status(201).json(newTalker);
});
  
router.put('/talker/:id', 
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedValidation,
  rateValidation,
  async (req, res) => {
    const data = await readFile(talkerPath);
    const { id } = req.params;
    const talkerEdited = data.map((e) => {
     if (e.id === +id) {
      return { ...e, ...req.body };
     } 
     return e;
    });
    await writeFile(talkerPath, talkerEdited);
    const talker = talkerEdited.find((t) => t.id === +id);
    return res.status(200).json(talker);
});
  
router.delete('/talker/:id', tokenValidation, async (req, res) => {
    const { id } = req.params;
    const data = await readFile(talkerPath);
    const filterTalker = data.filter((e) => e.id !== +id);
    await writeFile(talkerPath, filterTalker);
    return res.status(204).json();
});

module.exports = router;