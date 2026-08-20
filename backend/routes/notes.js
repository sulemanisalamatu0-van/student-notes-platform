const express = require('express');
const router = express.Router();

// Temporary storage
let notes = [];

// Get all notes
router.get('/', (req, res) => {
  res.json(notes);
});

// Upload / Create a new note
router.post('/', (req, res) => {
  const { title, description, course, subject, file_url } = req.body;

  if (!title || !course) {
    return res.status(400).json({ message: 'Title and Course are required' });
  }

  const newNote = {
    id: notes.length + 1,
    title,
    description: description || '',
    course,
    subject: subject || '',
    file_url: file_url || null,
    downloads: 0,
    created_at: new Date().toISOString().split('T')[0]
  };

  notes.push(newNote);

  res.status(201).json({
    message: 'Note uploaded successfully',
    note: newNote
  });
});

// Get single note
router.get('/:id', (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }
  res.json(note);
});

module.exports = router;