const Course = require('../models/Course');
const Admission = require('../models/Admission');
const Notice = require('../models/Notice');

// Create course (admin only)
exports.createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update course (admin only)
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json({ message: 'Course updated successfully', course });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete course (admin only)
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.enroll = async (req, res) => {
  const admission = new Admission({ student: req.user.id, course: req.params.id });
  await admission.save();
  res.send({ message: 'Admission applied!' });
};

exports.getAdmissions = async (req, res) => {
  const admissions = await Admission.find({ student: req.user.id }).populate('course');
  res.send(admissions);
};

exports.getNotices = async (req, res) => {
  const notices = await Notice.find().sort({ postedAt: -1 });
  res.send(notices);
};
