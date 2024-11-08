const specialities = require('../data/specialities');

exports.getSpecialities = (req, res) => {
  console.log(specialities,"sjdfldasj");
  
  try {
    res.status(200).json({ specialities });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching specialties', error: error.message });
  }
};