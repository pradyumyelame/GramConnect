import Scheme from '../models/Scheme.js';

export const addScheme = async (req, res) => {
  try {
    const {
      name,
      eligibility,    // string from frontend like "Age > 18, Income < 50000"
      benefits,       // string, you can store in `description`
      link,           // from frontend, map to `applyLink`
      category,
      targetState,    // maybe store in eligibilityCriteria.others or as a new field if needed
    } = req.body;

    // Parse eligibility string (simple example)
    // You might want a better parser or frontend to send structured data
    let eligibilityCriteria = {};

    if (eligibility) {
      // Example simple parser for age and income from string like "Age > 18, Income < 50000"
      if (/age\s*>\s*(\d+)/i.test(eligibility)) {
        eligibilityCriteria.age = parseInt(RegExp.$1, 10);
      }
      if (/income\s*<\s*(\d+)/i.test(eligibility)) {
        eligibilityCriteria.income = parseInt(RegExp.$1, 10);
      }
      // Add others if needed or store full string in others
      eligibilityCriteria.others = eligibility;
    }

    const scheme = new Scheme({
      name,
      description: benefits || '',
      applyLink: link || '',
      category: category || 'Central',
      eligibilityCriteria: {
        ...eligibilityCriteria,
        others: eligibilityCriteria.others || targetState || '',
      },
    });

    const savedScheme = await scheme.save();
    res.status(201).json(savedScheme);
  } catch (err) {
    res.status(500).json({ message: 'Error adding scheme', error: err.message });
  }
};

export const updateScheme = async (req, res) => {
  try {
    const {
      name,
      eligibility,
      benefits,
      link,
      category,
      targetState,
    } = req.body;

    let eligibilityCriteria = {};

    if (eligibility) {
      if (/age\s*>\s*(\d+)/i.test(eligibility)) {
        eligibilityCriteria.age = parseInt(RegExp.$1, 10);
      }
      if (/income\s*<\s*(\d+)/i.test(eligibility)) {
        eligibilityCriteria.income = parseInt(RegExp.$1, 10);
      }
      eligibilityCriteria.others = eligibility;
    }

    const updatedScheme = await Scheme.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description: benefits || '',
        applyLink: link || '',
        category: category || 'Central',
        eligibilityCriteria: {
          ...eligibilityCriteria,
          others: eligibilityCriteria.others || targetState || '',
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedScheme) return res.status(404).json({ message: 'Scheme not found' });
    res.status(200).json(updatedScheme);
  } catch (err) {
    res.status(500).json({ message: 'Error updating scheme', error: err.message });
  }
};


export const checkEligibility = async (req, res) => {
  const { schemeId, age, income, occupation } = req.body;
  try {
    const scheme = await Scheme.findById(schemeId);
    if (!scheme) return res.status(404).json({ message: 'Scheme not found' });

    const criteria = scheme.eligibilityCriteria;
    let isEligible = true;
    let reasons = [];

    if (criteria.age && age < criteria.age) {
      isEligible = false;
      reasons.push(`Minimum age required is ${criteria.age}`);
    }
    if (criteria.income && income > criteria.income) {
      isEligible = false;
      reasons.push(`Income should be less than ₹${criteria.income}`);
    }
    if (criteria.occupation && criteria.occupation.toLowerCase() !== occupation.toLowerCase()) {
      isEligible = false;
      reasons.push(`Only for occupation: ${criteria.occupation}`);
    }

    res.status(200).json({ eligible: isEligible, reasons });
  } catch (err) {
    res.status(500).json({ message: 'Error checking eligibility', error: err.message });
  }
};

// Get all schemes
export const getAllSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find();
    res.status(200).json(schemes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching schemes', error: err.message });
  }
};

// Get a specific scheme by ID
export const getSchemeById = async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    if (!scheme) return res.status(404).json({ message: 'Scheme not found' });
    res.status(200).json(scheme);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching scheme', error: err.message });
  }
};

// Delete a scheme
export const deleteScheme = async (req, res) => {
  try {
    const deleted = await Scheme.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Scheme not found' });
    res.status(200).json({ message: 'Scheme deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting scheme', error: err.message });
  }
};
