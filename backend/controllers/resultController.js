const Result = require('../models/Result');

// Create result (admin only)
exports.createResult = async (req, res) => {
  try {
    const { student, course, semester, subjects } = req.body;
    
    // Calculate total marks and percentage
    let totalMarks = 0;
    let maxTotalMarks = 0;
    
    subjects.forEach(subject => {
      totalMarks += subject.marks;
      maxTotalMarks += subject.maxMarks;
    });
    
    const percentage = (totalMarks / maxTotalMarks) * 100;
    const grade = calculateGrade(percentage);
    const status = percentage >= 40 ? 'Pass' : 'Fail';
    
    const result = new Result({
      student,
      course,
      semester,
      subjects,
      totalMarks,
      maxTotalMarks,
      percentage,
      grade,
      status,
      publishedBy: req.user.id
    });

    await result.save();
    await result.populate(['student', 'course', 'publishedBy']);
    
    res.status(201).json({ 
      message: 'Result created successfully', 
      result 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get results by student ID
exports.getResultsByStudent = async (req, res) => {
  try {
    const results = await Result.find({ student: req.params.studentId })
      .populate('course', 'title')
      .sort({ publishedAt: -1 });
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all results (admin only)
exports.getAllResults = async (req, res) => {
  try {
    const results = await Result.find()
      .populate('student', 'name email')
      .populate('course', 'title')
      .populate('publishedBy', 'name')
      .sort({ publishedAt: -1 });
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get result by ID
exports.getResultById = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id)
      .populate('student', 'name email')
      .populate('course', 'title')
      .populate('publishedBy', 'name');
    
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update result (admin only)
exports.updateResult = async (req, res) => {
  try {
    const { subjects } = req.body;
    
    // Recalculate totals if subjects are updated
    let totalMarks = 0;
    let maxTotalMarks = 0;
    
    subjects.forEach(subject => {
      totalMarks += subject.marks;
      maxTotalMarks += subject.maxMarks;
    });
    
    const percentage = (totalMarks / maxTotalMarks) * 100;
    const grade = calculateGrade(percentage);
    const status = percentage >= 40 ? 'Pass' : 'Fail';
    
    const result = await Result.findByIdAndUpdate(
      req.params.id,
      { 
        ...req.body,
        totalMarks,
        maxTotalMarks,
        percentage,
        grade,
        status
      },
      { new: true }
    ).populate(['student', 'course', 'publishedBy']);
    
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }
    
    res.json({ message: 'Result updated successfully', result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete result (admin only)
exports.deleteResult = async (req, res) => {
  try {
    const result = await Result.findByIdAndDelete(req.params.id);
    
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }
    
    res.json({ message: 'Result deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to calculate grade
function calculateGrade(percentage) {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C+';
  if (percentage >= 40) return 'C';
  return 'F';
}