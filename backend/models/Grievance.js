import mongoose from 'mongoose';

const grievanceSchema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String },
  email: { type: String },
  address: { type: String },
  category: {
    type: String,
    enum: ['Water Supply',
      'Road Maintenance',
      'Electricity',
      'Sanitation',
      'Healthcare',
      'Education',
      'Public Transport',
      'Land Records',
      'Government Services',
      'Other'],
    required: true
  },
  description: { type: String, required: true },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'In Progress', 'Resolved', 'Rejected'],
    default: 'Pending'
  },
  attachments: { type: [String], default: [] },
  adminComments: { type: String },
  submittedAt: { type: Date, default: Date.now },
  resolvedAt: { type: Date }
});



export default mongoose.model('Grievance', grievanceSchema);
