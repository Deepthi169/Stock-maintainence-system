const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// serve static HTML/JS files from the project root
app.use(express.static(path.join(__dirname)));

// optional default route for “/”
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

let users = [];
let stock = {
  "Apple": 50,
  "Banana": 30,
  "Orange": 20,
  "Broom":15,
  "Milk":25,
  "Bread":20,
  "Jam":10,
  "Cookies":100
};
let sold = {};

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).send("User already exists");
  }
  users.push({ username, password });
  res.send("Signup successful");
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).send("Invalid credentials");
  res.send("Login successful");
});

app.get('/stock', (req, res) => {
  res.json(stock);
});

app.post('/sell', (req, res) => {
  const { product, quantity } = req.body;
  if (!stock[product]) return res.status(404).send("Product not found");

  stock[product] -= quantity;
  sold[product] = (sold[product] || 0) + quantity;

  let alert = stock[product] <= 0 ? `${product} is out of stock!` : '';
  let recommendation = Object.entries(sold)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || '';

  res.json({ alert, recommendation });
});

// start the server using the port constant so you only need to change it in one place
app.listen(port, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
  console.log(`Server running on http://localhost:${port}`);
});