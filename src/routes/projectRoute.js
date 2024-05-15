const express = require('express')
const router = express.Router()

const projectController = require('../controllers/projectController');

router.get('/project', projectController.getProject);
router.post('/project', projectController.create);
router.get('/project/:id', projectController.details);
router.delete('/project/:id', projectController.delete);
router.put('/project/:id', projectController.update);

module.exports = router;