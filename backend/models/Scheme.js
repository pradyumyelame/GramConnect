import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  requiredDocuments: [String],
  applyLink: String,
  category: { type: String, enum: ['Central', 'State'], default: 'Central' },
  eligibilityCriteria: {
    age: Number,        // minimum age
    income: Number,     // max income allowed
    occupation: String, // specific occupation allowed, optional
    others: String      // any other notes
  }
}, { timestamps: true });

export default mongoose.model('Scheme', schemeSchema);
