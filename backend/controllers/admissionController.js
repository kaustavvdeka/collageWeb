const Admission = require('../models/Admission');
const Course = require('../models/Course');

// Submit admission application
exports.submitApplication = async (req, res) => {
  try {
    const { studentName, email, phone, address, dateOfBirth, course } = req.body;
    
    const admission = new Admission({
      studentName,
      email,
      phone,
      address,
      dateOfBirth,
      course,
      documents: req.files ? {
        marksheet: req.files.marksheet?.[0]?.path,
        certificate: req.files.certificate?.[0]?.path,
        photo: req.files.photo?.[0]?.path,
        idProof: req.files.idProof?.[0]?.path
      } : {}
    });

    await admission.save();
    await admission.populate('course');
    
    res.status(201).json({ 
      message: 'Application submitted successfully', 
      application: admission 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all applications (admin only)
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Admission.find()
      .populate('course')
      .populate('reviewedBy', 'name')
      .sort({ appliedAt: -1 });
    
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get application by ID
exports.getApplicationById = async (req, res) => {
  try {
    const application = await Admission.findById(req.params.id)
      .populate('course')
      .populate('reviewedBy', 'name');
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update application status (admin only)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const application = await Admission.findByIdAndUpdate(
      req.params.id,
      { 
        status, 
        reviewedAt: new Date(),
        reviewedBy: req.user.id 
      },
      { new: true }
    ).populate('course');
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.json({ message: 'Application status updated', application });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get application by application number
exports.getApplicationByNumber = async (req, res) => {
  try {
    const application = await Admission.findOne({ 
      applicationNumber: req.params.applicationNumber 
    }).populate('course');
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};