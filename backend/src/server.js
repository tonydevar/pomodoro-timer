const express = require('express');
const cors = require('cors');
const sessionsRouter = require('./routes/sessions');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all origins on all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Mount session routes
app.use('/api/sessions', sessionsRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  process.stdout.write(`Pomodoro backend listening on port ${PORT}\n`);
});

module.exports = app;
