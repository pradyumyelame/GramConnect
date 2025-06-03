// controllers/grievanceController.js
import Grievance from '../models/Grievance.js';

// POST /api/grievances - Submit an anonymous grievance
export const submitGrievance = async (req, res) => {
  try {
    const { category, description, attachments, phone } = req.body;

    if (!category || !description) {
      return res.status(400).json({ message: 'Category and description are required' });
    }

    const grievance = new Grievance({
      category,
      description,
      attachments: attachments || [],
      phone: phone || null,  // save phone if provided
      status: 'Pending',
      submittedAt: new Date()
    });

    await grievance.save();

    res.status(201).json({
      message: 'Grievance submitted successfully',
      grievance
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error submitting grievance',
      error: err.message
    });
  }
};

// GET /api/grievances - Admin fetches all grievances
export const getAllGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find().sort({ submittedAt: -1 });
    res.status(200).json(grievances);
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching all grievances',
      error: err.message
    });
  }
};

// GET /api/grievances/:id - Get single grievance details by ID (optional for tracking)
export const getGrievanceById = async (req, res) => {
  const { id } = req.params;
  try {
    const grievance = await Grievance.findById(id);
    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }
    res.status(200).json(grievance);
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching grievance',
      error: err.message
    });
  }
};

// PUT /api/grievances/:id - Admin updates grievance status and admin comments
export const updateGrievanceStatus = async (req, res) => {
  const { id } = req.params;
  const { status, adminComments } = req.body;

  const allowedStatuses = ['Pending', 'Approved', 'In Progress', 'Resolved', 'Rejected'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status provided' });
  }

  try {
    const grievance = await Grievance.findById(id);

    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }

    grievance.status = status;
    grievance.adminComments = adminComments ?? grievance.adminComments;

    if (status === 'Resolved') {
      grievance.resolvedAt = new Date();
    }

    await grievance.save();

    res.status(200).json({
      message: 'Grievance updated successfully',
      grievance
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error updating grievance',
      error: err.message
    });
  }
};

// GET /api/grievances/user?phone=1234567890
export const getGrievancesByPhone = async (req, res) => {
  const { phone } = req.query;

  if (!phone) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  try {
    const grievances = await Grievance.find({ phone }).sort({ submittedAt: -1 });

    if (!grievances.length) {
      return res.status(404).json({ message: 'No grievances found for this phone number' });
    }

    res.status(200).json(grievances);
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching grievances',
      error: err.message
    });
  }
};

// Get grievance counts for admin dashboard
export const getGrievanceCounts = async (req, res) => {
  try {
    const total = await Grievance.countDocuments();
    const pending = await Grievance.countDocuments({ status: 'Pending' });
    const inProgress = await Grievance.countDocuments({ status: 'In Progress' });
    const resolved = await Grievance.countDocuments({ status: 'Resolved' });
    const rejected = await Grievance.countDocuments({ status: 'Rejected' });

    res.status(200).json({ total, pending, inProgress, resolved, rejected });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching grievance counts', error: err.message });
  }
};
