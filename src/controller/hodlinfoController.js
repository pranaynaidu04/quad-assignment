const axios = require('axios');
const Crypto = require('../model/hodlinfoModel');

const fetchCryptos = async () => {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const cryptosData = response.data;

    // Extract the top 10 results
    const top10Cryptos = Object.values(cryptosData).slice(0, 10);

    // Map each result to the desired fields
    const mappedCryptos = top10Cryptos.map((crypto) => ({
      name: crypto.name,
      last: parseFloat(crypto.last),
      buyPrice: parseFloat(crypto.buy),
      sellPrice: parseFloat(crypto.sell),
      volume: parseFloat(crypto.volume),
      baseUnit: crypto.base_unit,
    }));

    // Save the mapped cryptos to the database
    await Crypto.insertMany(mappedCryptos);

    return 'Cryptos fetched and saved successfully!';
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch and save cryptos');
  }
};

module.exports = { fetchCryptos };