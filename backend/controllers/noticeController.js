const Notice = require('../models/Notice');

// Create notice (admin only)
exports.createNotice = async (req, res) => {
  try {
    const { title, content, priority } = req.body;
    
    const notice = new Notice({
      title,
      content,
      priority,
      author: req.user.id
    });

    await notice.save();
    await notice.populate('author', 'name');
    
    res.status(201).json({ 
      message: 'Notice created successfully', 
      notice 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all active notices
exports.getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find({ isActive: true })
      .populate('author', 'name')
      .sort({ postedAt: -1 });
    
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get notice by ID
exports.getNoticeById = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id)
      .populate('author', 'name');
    
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    
    res.json(notice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update notice (admin only)
exports.updateNotice = async (req, res) => {
  try {
    const { title, content, priority, isActive } = req.body;
    
    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      { 
        title, 
        content, 
        priority, 
        isActive,
        updatedAt: new Date()
      },
      { new: true }
    ).populate('author', 'name');
    
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    
    res.json({ message: 'Notice updated successfully', notice });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete notice (admin only)
exports.deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    
    res.json({ message: 'Notice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};