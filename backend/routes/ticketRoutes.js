const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const { protect, admin } = require('../middleware/authMiddleware');

// Create a ticket (user only)
router.post('/', protect, async (req, res) => {
  const { description, priority, category } = req.body;
  if(!description || !priority || !category) {
    return res.status(400).json({ message: 'Please provide description, priority, and category' });
  }
  try {
    const ticket = await Ticket.create({
      user: req.user._id,
      description,
      priority,
      category,
    });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all tickets created by user
router.get('/mytickets', protect, async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get ticket details (user or assigned admin)
router.get('/:id', protect, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('user', 'name email')
      .populate('assignedTo', 'name email')
      .populate('updates.user', 'name email');

    if(!ticket) return res.status(404).json({ message: 'Ticket not found' });

    // Authorization: user who created or admin assigned or admin role
    if(
      ticket.user._id.toString() === req.user._id.toString() ||
      (ticket.assignedTo && ticket.assignedTo._id.toString() === req.user._id.toString()) ||
      req.user.role === 'admin'
    ) {
      return res.json(ticket);
    }

    res.status(403).json({ message: 'Not authorized to view this ticket' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add update to ticket (user or assigned admin)
router.post('/:id/updates', protect, async (req, res) => {
  const { text } = req.body;
  if(!text) return res.status(400).json({ message: 'Update text required' });
  try {
    const ticket = await Ticket.findById(req.params.id);
    if(!ticket) return res.status(404).json({ message: 'Ticket not found' });

    if(
      ticket.user.toString() === req.user._id.toString() ||
      (ticket.assignedTo && ticket.assignedTo.toString() === req.user._id.toString()) ||
      req.user.role === 'admin'
    ) {
      ticket.updates.push({ text, user: req.user._id });
      await ticket.save();
      return res.json(ticket);
    }
    res.status(403).json({ message: 'Not authorized to update this ticket' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Get all tickets
router.get('/', protect, admin, async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate('user', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });
    res.json(tickets);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Assign ticket to admin
router.put('/:id/assign', protect, admin, async (req, res) => {
  const { adminId } = req.body;
  try {
    const ticket = await Ticket.findById(req.params.id);
    if(!ticket) return res.status(404).json({ message: 'Ticket not found' });

    const adminUser = await User.findById(adminId);
    if(!adminUser || adminUser.role !== 'admin') return res.status(400).json({ message: 'Invalid admin user' });

    ticket.assignedTo = adminUser._id;
    ticket.status = 'In Progress';
    await ticket.save();
    res.json(ticket);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Update ticket status (Resolve/Close/Open)
router.put('/:id/status', protect, admin, async (req, res) => {
  const { status } = req.body;
  if(!['Open', 'In Progress', 'Resolved', 'Closed'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  try {
    const ticket = await Ticket.findById(req.params.id);
    if(!ticket) return res.status(404).json({ message: 'Ticket not found' });

    ticket.status = status;
    await ticket.save();
    res.json(ticket);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;