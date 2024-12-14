const express = require('express');
const router = express.Router();

// Sample route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Express API' });
});
module.exports = router;
