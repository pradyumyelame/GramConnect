import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Scheme from '../models/Scheme.js';

dotenv.config();

const schemes = [
  {
    name: 'PM-KISAN Scheme',
    description: 'Income support to farmer families.',
    requiredDocuments: ['Aadhar Card', 'Landholding Proof'],
    applyLink: 'https://pmkisan.gov.in/',
    category: 'Central',
    eligibilityCriteria: { age: 18, income: 100000, occupation: 'Farmer' }
  },
  {
    name: 'MNREGA Job Cards',
    description: 'Employment guarantee scheme for rural households.',
    requiredDocuments: ['Aadhar Card', 'Address Proof'],
    applyLink: 'https://nrega.nic.in/',
    category: 'Central',
    eligibilityCriteria: { age: 18 }
  },
  {
    name: 'Pradhan Mantri Awas Yojana',
    description: 'Affordable housing for all.',
    requiredDocuments: ['Aadhar Card', 'Income Certificate'],
    applyLink: 'https://pmaymis.gov.in/',
    category: 'Central',
    eligibilityCriteria: { income: 250000 }
  },
  {
    name: 'Ayushman Bharat',
    description: 'Health insurance scheme for poor families.',
    requiredDocuments: ['Aadhar Card', 'BPL Card'],
    applyLink: 'https://pmjay.gov.in/',
    category: 'Central',
    eligibilityCriteria: { income: 100000 }
  },
  {
    name: 'Old Age Pension',
    description: 'Monthly pension for senior citizens.',
    requiredDocuments: ['Aadhar Card', 'Age Proof'],
    applyLink: 'https://socialsecurity.gov.in/',
    category: 'State',
    eligibilityCriteria: { age: 60 }
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Scheme.deleteMany({});
    await Scheme.insertMany(schemes);
    console.log('Schemes seeded successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
};

seedDB();
