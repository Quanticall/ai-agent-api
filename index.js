const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let latestLead = null;

app.post('/api/leads', (req, res) => {
  const { name, email, phone, zip, service, message } = req.body;
  if (!name || !email || !phone || !zip || !service) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  latestLead = { name, email, phone, zip, service, message };
  console.log('✅ Lead stored:', latestLead);
  res.status(200).json({ message: 'Lead stored successfully' });
});

app.get('/api/leads/latest', (req, res) => {
  if (!latestLead) {
    return res.status(404).json({ error: 'No lead found' });
  }
  res.json(latestLead);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
