const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

//  Create Incident (User only)
router.post('/', protect, upload.array('images', 5), incidentController.createIncident);

//  Search & Filter Incidents (Both User/Admin)
router.get('/search', protect, incidentController.searchIncidents);

//  Get All Incidents (Admin only)
router.get('/admin/all', protect, isAdmin, incidentController.getAllIncidents);

//  Get My Incidents
router.get('/my', protect, incidentController.getUserIncidents);

//  Update Incident
router.put('/:id', protect, upload.array('images', 5), incidentController.updateIncident);

//  Delete Incident
router.delete('/:id', protect, incidentController.deleteIncident);

module.exports = router;
