const Student = require('../models/Student');

module.exports = async (req, res, next) => {
  try {
    const user = await Student.findById(req.user.id);
    
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};