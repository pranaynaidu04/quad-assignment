const express = require('express');
const Crypto = require('../model/hodlinfoModel');
const router = express.Router();

router.get('/cryptos', async (req, res) => {
  try {
    const cryptos = await Crypto.find().limit(10);
    res.json(cryptos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch cryptos' });
  }
});

module.exports = router;
