import Certificate from '../models/Certificate.js';

// User applies for a certificate
export const applyCertificate = async (req, res) => {
  try {
    const { certificateType, details } = req.body;
    if (!certificateType || !details) {
      return res.status(400).json({ message: 'Certificate type and details are required' });
    }

    const newCert = new Certificate({
      certificateType,
      applicant: req.user._id,
      details,
      status: 'Pending'
    });

    await newCert.save();
    res.status(201).json({ message: 'Application submitted successfully', certificate: newCert });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit application', error: error.message });
  }
};

export const getMyCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({ applicant: req.user._id }).sort({ createdAt: -1 });
    res.json({ certificates });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch certificates', error: error.message });
  }
};

export const getAllApplications = async (req, res) => {
  try {
    // Populate applicant info for admin view
    const certificates = await Certificate.find()
      .populate('applicant', 'fullName email village')
      .sort({ createdAt: -1 });
    res.json({ certificates });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch all applications', error: error.message });
  }
};

export const approveCertificate = async (req, res) => {
  try {
    const cert = await Certificate.findById(req.params.id);
    if (!cert) return res.status(404).json({ message: 'Application not found' });

    cert.status = 'Approved';
    cert.reviewDate = new Date();
    cert.reviewedBy = req.user._id;
    cert.reviewComments = req.body.reviewComments || 'Approved';
    await cert.save();

    res.status(200).json({ message: 'Certificate approved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to approve certificate', error: err.message });
  }
};

export const rejectCertificate = async (req, res) => {
  try {
    const cert = await Certificate.findById(req.params.id);
    if (!cert) return res.status(404).json({ message: 'Application not found' });

    cert.status = 'Rejected';
    cert.reviewDate = new Date();
    cert.reviewedBy = req.user._id;
    cert.reviewComments = req.body.reviewComments || 'Rejected';
    await cert.save();

    res.status(200).json({ message: 'Certificate rejected successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to reject certificate', error: err.message });
  }
};
