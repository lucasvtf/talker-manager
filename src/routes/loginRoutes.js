const express = require('express');

const router = express.Router();

const loginValidation = require('../middlewares/loginValidation');
const { generateToken } = require('../utils/generateToken');

router.post('/login', loginValidation, (req, res) => {
    const token = generateToken();
    if (token) {
      return res.status(200).json({ token });
    }
  }); 

  module.exports = router;