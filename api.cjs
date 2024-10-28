const express = require('express')
const sqlite3 = require('sqlite3')

const app = express()
const port = 4001
const db = new sqlite3.Database('memories.db')
const apiRouter = express.Router();

app.use(express.json())
app.use('/api', apiRouter);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS memories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      timestamp DATE
    )
  `)
})

apiRouter.get('/memories', (req, res) => {
  db.all('SELECT * FROM memories ORDER BY timestamp DESC, id Desc', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({
      memories: rows
    })
  })
})

apiRouter.post('/memories', (req, res) => {
  const { name, description, timestamp } = req.body

  if (!name || !description || !timestamp) {
    res.status(400).json({
      error: 'Please provide all fields: name, description, timestamp',
    })
    return
  }

  const stmt = db.prepare(
    'INSERT INTO memories (name, description, timestamp) VALUES (?, ?, ?)'
  )
  stmt.run(name, description, timestamp, (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.status(201).json({ message: 'Memory created successfully' })
  })
})

apiRouter.get('/memories/:id', (req, res) => {
  const { id } = req.params
  db.get('SELECT * FROM memories WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    if (!row) {
      res.status(404).json({ error: 'Memory not found' })
      return
    }
    res.json({ memory: row })
  })
})

apiRouter.put('/memories/:id', (req, res) => {
  const { id } = req.params
  const { name, description, timestamp } = req.body

  if (!name || !description || !timestamp) {
    res.status(400).json({
      error: 'Please provide all fields: name, description, timestamp',
    })
    return
  }

  const stmt = db.prepare(
    'UPDATE memories SET name = ?, description = ?, timestamp = ? WHERE id = ?'
  )
  stmt.run(name, description, timestamp, id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Memory updated successfully' })
  })
})

apiRouter.delete('/memories/:id', (req, res) => {
  const { id } = req.params
  db.run('DELETE FROM memories WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Memory deleted successfully' })
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
