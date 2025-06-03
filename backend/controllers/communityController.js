import {
  CommunityMeetingMinutes,
  CommunityProjectUpdate,
  CommunityEventRegistration,
  CommunityVolunteerProgram,
  CommunityAnnouncement
} from '../models/CommunityService.js';

// Meeting Minutes
export const addMeetingMinutes = async (req, res) => {
  try {
    const { date, summary } = req.body;
    const meeting = new CommunityMeetingMinutes({ date, summary });
    await meeting.save();
    res.status(201).json({ message: 'Meeting minutes added', meeting });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMeetingMinutes = async (req, res) => {
  try {
    const meetings = await CommunityMeetingMinutes.find().sort({ date: -1 });
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Project Updates
export const addProjectUpdate = async (req, res) => {
  try {
    const { title, description } = req.body;
    const update = new CommunityProjectUpdate({ title, description });
    await update.save();
    res.status(201).json({ message: 'Project update added', update });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProjectUpdates = async (req, res) => {
  try {
    const updates = await CommunityProjectUpdate.find().sort({ updatedAt: -1 });
    res.json(updates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Community Event Registration
export const registerForEvent = async (req, res) => {
  try {
    const { eventId, userId } = req.body;
    const existingRegistration = await CommunityEventRegistration.findOne({ eventId, userId });
    if (existingRegistration) return res.status(400).json({ message: 'Already registered for this event' });

    const registration = new CommunityEventRegistration({ eventId, userId });
    await registration.save();
    res.status(201).json({ message: 'Registered for event successfully', registration });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEventRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params;
    const registrations = await CommunityEventRegistration.find({ eventId }).populate('userId', 'name email');
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Volunteer Programs
export const addVolunteerProgram = async (req, res) => {
  try {
    const { title, description, startDate, endDate } = req.body;
    const program = new CommunityVolunteerProgram({ title, description, startDate, endDate });
    await program.save();
    res.status(201).json({ message: 'Volunteer program added', program });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getVolunteerPrograms = async (req, res) => {
  try {
    const programs = await CommunityVolunteerProgram.find().sort({ startDate: 1 });
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Local Announcements
export const addAnnouncement = async (req, res) => {
  try {
    const { title, message } = req.body;
    const announcement = new CommunityAnnouncement({ title, message });
    await announcement.save();
    res.status(201).json({ message: 'Announcement added', announcement });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await CommunityAnnouncement.find().sort({ postedAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

