const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('public')); // serve HTML/JS/CSS from "public" folder
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Data
const items = ['Apple', 'Banana', 'Orange'];

// Routes

// GET all items
app.get('/items', (req, res) => {
  res.json(items);
});

// POST a new item
app.post('/items', (req, res) => {
  const newItem = req.body.item;

  if (!newItem) {
    return res.status(400).json({ error: "Item is required" });
  }

  items.push(newItem);
  res.json(items); // return updated list
});

// Optional test routes
app.get('/', (req, res) => res.send('Hello, World!'));
app.get('/about', (req, res) => res.send('About Page'));

// Error handler (last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});