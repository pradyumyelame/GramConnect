// backend/routes/noticeRoutes.js
import express from 'express';
import Notice from '../models/Notice.js';
import { authMiddleware, isAdmin } from '../middlewares/auth.js'; // ✅ fixed here

const router = express.Router();

// Get all notices (public)
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single notice by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ message: 'Notice not found' });
    res.json(notice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new notice (admin only)
router.post('/', authMiddleware, isAdmin, async (req, res) => {
  try {
    const { title, date, department, location, priority, description } = req.body;

    const newNotice = new Notice({
      title,
      date,
      department,
      location,
      priority,
      description,
      createdBy: req.user._id,
    });

    await newNotice.save();
    res.status(201).json(newNotice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update notice (admin only)
router.put('/:id', authMiddleware, isAdmin, async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ message: 'Notice not found' });

    const { title, date, department, location, priority, description } = req.body;

    notice.title = title || notice.title;
    notice.date = date || notice.date;
    notice.department = department || notice.department;
    notice.location = location || notice.location;
    notice.priority = priority || notice.priority;
    notice.description = description || notice.description;

    await notice.save();
    res.json(notice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete notice (admin only)
router.delete('/:id', authMiddleware, isAdmin, async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ message: 'Notice not found' });

    await notice.deleteOne();
    res.json({ message: 'Notice deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
