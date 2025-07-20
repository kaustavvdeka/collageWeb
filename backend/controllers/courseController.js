const Course = require('../models/Course');
const Admission = require('../models/Admission');
const Notice = require('../models/Notice');

exports.getCourses = async (req, res) => {
  const courses = await Course.find();
  res.send(courses);
};

exports.getCourseDetails = async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.send(course);
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
