
const Incident = require('../models/incident');
const fs = require('fs');
const path = require('path');

//  Create Incident
exports.createIncident = async (req, res) => {
  try {
    const { title, description, category, status, priority } = req.body;
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const images = req.files?.map(file => `${baseUrl}/uploads/${file.filename}`) || [];

    const incident = new Incident({
      title,
      description,
      category,
      status,
      priority,
      images,
      createdBy: req.user.id,
    });

    await incident.save();
    res.status(201).json({ message: 'Incident created successfully', incident });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create incident' });
  }
};

//  Get All Incidents (Admin only)
exports.getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().populate('createdBy', 'name email');
    res.status(200).json(incidents);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch incidents' });
  }
};

//  Get Incidents by Logged-in User Id
exports.getUserIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find({ createdBy: req.user.id });
    res.status(200).json(incidents);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch your incidents' });
  }
};

//  Update Incident
exports.updateIncident = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) return res.status(404).json({ error: 'Incident not found' });

    // Only creator or admin can update
    if (incident.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { title, description, category, status, priority } = req.body;
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const images = req.files?.map(file => `${baseUrl}/uploads/${file.filename}`) || [];

    incident.title = title || incident.title;
    incident.description = description || incident.description;
    incident.category = category || incident.category;
    incident.status = status || incident.status;
    incident.priority = priority || incident.priority;
    if (images.length > 0) incident.images = images;

    await incident.save();
    res.json({ message: 'Incident updated', incident });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update incident' });
  }
};

//  Delete Incident
exports.deleteIncident = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) return res.status(404).json({ error: 'Incident not found' });

    if (incident.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Delete associated images from disk
    incident.images.forEach((imgUrl) => {
      const filename = imgUrl.split('/uploads/')[1];
      const fullPath = path.join(__dirname, '..', 'uploads', filename);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    });

    await incident.deleteOne();
    res.json({ message: 'Incident deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete incident' });
  }
};

//  Search & Filter with Pagination
exports.searchIncidents = async (req, res) => {
  try {
    const { title, category, status, priority, startDate, endDate, page = 1, limit = 10 } = req.query;

    const query = {};

    if (title) query.title = { $regex: title, $options: 'i' };
    if (category) query.category = category;
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const incidents = await Incident.find(query)
      .sort({ priority: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(incidents);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
};























/*const Incident = require('../models/incident');
const fs = require('fs');
const path = require('path');

// 🆕 Create Incident
exports.createIncident = async (req, res) => {
  try {
    const { title, description, category, status, priority } = req.body;
    const images = req.files?.map(file => `/uploads/${file.filename}`) || [];

    const incident = new Incident({
      title,
      description,
      category,
      status,
      priority,
      images,
      createdBy: req.user.id,
    });

    await incident.save();
    res.status(201).json({ message: 'Incident created successfully', incident });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create incident' });
  }
};

// 📄 Get All Incidents (Admin only)
exports.getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().populate('createdBy', 'username');
    res.status(200).json(incidents);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch incidents' });
  }
};

// 🧍 Get Incidents by Logged-in User
exports.getUserIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find({ createdBy: req.user.id });
    res.status(200).json(incidents);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch your incidents' });
  }
};

// ✏️ Update Incident
exports.updateIncident = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) return res.status(404).json({ error: 'Incident not found' });

    // Only creator or admin can update
    if (incident.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { title, description, category, status, priority } = req.body;
    const images = req.files?.map(file => `/uploads/${file.filename}`) || [];

    incident.title = title || incident.title;
    incident.description = description || incident.description;
    incident.category = category || incident.category;
    incident.status = status || incident.status;
    incident.priority = priority || incident.priority;
    if (images.length > 0) incident.images = images;

    await incident.save();
    res.json({ message: 'Incident updated', incident });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update incident' });
  }
};

// ❌ Delete Incident
exports.deleteIncident = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) return res.status(404).json({ error: 'Incident not found' });

    if (incident.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Delete associated images from disk
    incident.images.forEach((imgPath) => {
      const fullPath = path.join(__dirname, '..', imgPath);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    });

    await incident.deleteOne();
    res.json({ message: 'Incident deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete incident' });
  }
};

// 🔍 Search & Filter with Pagination
exports.searchIncidents = async (req, res) => {
  try {
    const { title, category, status, priority, startDate, endDate, page = 1, limit = 10 } = req.query;

    const query = {};

    if (title) query.title = { $regex: title, $options: 'i' };
    if (category) query.category = category;
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const incidents = await Incident.find(query)
      .sort({ priority: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(incidents);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
};


*/