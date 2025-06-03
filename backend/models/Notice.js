import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Low' },
  description: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

const Notice = mongoose.model('Notice', noticeSchema);
export default Notice;