import mongoose from 'mongoose';

const meetingMinutesSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  summary: { type: String, required: true }
});

const projectUpdateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  updatedAt: { type: Date, default: Date.now }
});

const eventRegistrationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'CommunityEvent', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  registeredAt: { type: Date, default: Date.now }
});

const volunteerProgramSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  startDate: Date,
  endDate: Date
});

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: String,
  postedAt: { type: Date, default: Date.now }
});

const communitySchema = new mongoose.Schema({
  meetingMinutes: [meetingMinutesSchema],
  projectUpdates: [projectUpdateSchema],
  volunteerPrograms: [volunteerProgramSchema],
  announcements: [announcementSchema]
});

export const CommunityMeetingMinutes = mongoose.model('CommunityMeetingMinutes', meetingMinutesSchema);
export const CommunityProjectUpdate = mongoose.model('CommunityProjectUpdate', projectUpdateSchema);
export const CommunityEventRegistration = mongoose.model('CommunityEventRegistration', eventRegistrationSchema);
export const CommunityVolunteerProgram = mongoose.model('CommunityVolunteerProgram', volunteerProgramSchema);
export const CommunityAnnouncement = mongoose.model('CommunityAnnouncement', announcementSchema);
