import express from 'express';
import {
  getAllProjects,
  getFeaturedProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController';

const router = express.Router();

// GET all projects
router.get('/', getAllProjects);

// GET featured projects
router.get('/featured', getFeaturedProjects);

// GET project by ID
router.get('/:id', getProjectById);

// POST create new project
router.post('/', createProject);

// PUT update project
router.put('/:id', updateProject);

// DELETE project
router.delete('/:id', deleteProject);

export default router; 