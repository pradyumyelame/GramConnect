import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  certificateType: {
    type: String,
    enum: ['birth-certificate', 'death-certificate', 'income-certificate', 'caste-certificate', 'residence-certificate'],
    required: true,
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  details: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  reviewComments: String,
  reviewDate: Date,
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

export default mongoose.model('Certificate', certificateSchema);