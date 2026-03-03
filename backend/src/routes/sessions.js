const { Router } = require('express');
const { readFile, writeFile, mkdir } = require('fs/promises');
const path = require('path');

const router = Router();

const DATA_DIR = path.join(__dirname, '../../data');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');

async function readSessions() {
  try {
    const raw = await readFile(SESSIONS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return [];
    }
    throw err;
  }
}

async function writeSessions(sessions) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(SESSIONS_FILE, JSON.stringify(sessions, null, 2), 'utf8');
}

// GET /api/sessions — return sessions whose timestamp date matches today (UTC)
router.get('/', async (req, res) => {
  try {
    const sessions = await readSessions();
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD UTC
    const todaySessions = sessions.filter((s) => {
      if (!s.timestamp) return false;
      return s.timestamp.slice(0, 10) === today;
    });
    res.json(todaySessions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read sessions' });
  }
});

// POST /api/sessions — validate, append, and return saved session
router.post('/', async (req, res) => {
  const { type, duration, timestamp } = req.body;

  if (type === undefined || duration === undefined || timestamp === undefined) {
    return res.status(400).json({ error: 'Missing required fields: type, duration, timestamp' });
  }

  if (type !== 'work' && type !== 'break') {
    return res.status(400).json({ error: 'type must be "work" or "break"' });
  }

  if (typeof duration !== 'number' || !Number.isFinite(duration) || duration <= 0) {
    return res.status(400).json({ error: 'duration must be a positive number (seconds)' });
  }

  if (typeof timestamp !== 'string' || isNaN(Date.parse(timestamp))) {
    return res.status(400).json({ error: 'timestamp must be a valid ISO 8601 string' });
  }

  try {
    const sessions = await readSessions();

    const newSession = {
      id: crypto.randomUUID(),
      type,
      duration,
      timestamp,
    };

    sessions.push(newSession);
    await writeSessions(sessions);

    res.status(201).json(newSession);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save session' });
  }
});

module.exports = router;
