const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const student = new Student({ name, email, password: hashed });
  await student.save();
  res.status(201).send();
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const s = await Student.findOne({ email });
  if (!s || !await bcrypt.compare(password, s.password))
    return res.status(401).send({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: s._id }, process.env.JWT_SECRET);
  res.send({ token });
};

exports.dashboard = async (req, res) => {
  const s = await Student.findById(req.user.id).populate('enrolledCourses');
  res.send({ name: s.name, courses: s.enrolledCourses });
};
