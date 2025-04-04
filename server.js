const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname)));
app.use(express.json()); // parse application/json

app.post('/submit', (req, res) => {
  // const { fromValue, toValue } = req.body;
  // console.log('🟢 Received From:', fromValue);
  // console.log('🟢 Received To  :', toValue);
  console.log('🟢 Received:', req.body)
  res.status(200).send({ message: 'Values received' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
