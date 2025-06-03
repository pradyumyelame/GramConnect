import express from 'express';
import {
  addMeetingMinutes,
  getMeetingMinutes,
  addProjectUpdate,
  getProjectUpdates,
  registerForEvent,
  getEventRegistrations,
  addVolunteerProgram,
  getVolunteerPrograms,
  addAnnouncement,
  getAnnouncements
} from '../controllers/communityController.js';

const router = express.Router();

// Meeting Minutes
router.post('/meeting-minutes', addMeetingMinutes);
router.get('/meeting-minutes', getMeetingMinutes);

// Project Updates
router.post('/project-updates', addProjectUpdate);
router.get('/project-updates', getProjectUpdates);

// Event Registrations
router.post('/event-registrations', registerForEvent);
router.get('/event-registrations/:eventId', getEventRegistrations);

// Volunteer Programs
router.post('/volunteer-programs', addVolunteerProgram);
router.get('/volunteer-programs', getVolunteerPrograms);

// Announcements
router.post('/announcements', addAnnouncement);
router.get('/announcements', getAnnouncements);

export default router;
