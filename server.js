const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json())

app.get('/api', function(req,res) {
  res.json({
    text: 'my api!'
  })
})

app.post('/api/login', (req, res) => {
  const user = { id: 3 }
  const token = jwt.sign({ user }, 'my_secret_key');
  res.json({
    token
  })
})

app.get('/api/protected', ensureToken, (req,res) => {
  jwt.verify(req.token, 'my_secret_key', function(err, data) {
    if (err) {
      res.sendStatus(403)
    } else {
      res.json({
    text: 'this is protected',
    data: data
  })
    }
  })
});

function ensureToken (req,res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403)
  }
}

const PORT = 6322 || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})