const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Hardware', 'Software', 'Network', 'Other'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
    default: 'Open',
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium',
  },
  images: [{
    type: String, // storing image URLs or local paths
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true }); // adds createdAt and updatedAt

module.exports = mongoose.model('Incident', incidentSchema);




