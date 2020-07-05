const express = require('express');
const cors = require('cors');

const app = express();
const port = 5050;

app.use(cors());

app.post('/api/getGasStations', (req, res) => {
  console.log(req.body)
  res.send({
    data: 'HI'
  })
});

app.listen(port, () => {
  console.log('Listening on port ', port);
});