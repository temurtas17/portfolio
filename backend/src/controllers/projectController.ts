import { Request, Response } from 'express';
import Project, { IProject } from '../models/Project';

// Get all projects
export const getAllProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Error fetching projects', error });
  }
};

// Get featured projects
export const getFeaturedProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Project.find({ featured: true }).sort({ order: 1 });
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    res.status(500).json({ message: 'Error fetching featured projects', error });
  }
};

// Get project by ID
export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Error fetching project', error });
  }
};

// Create a new project
export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Error creating project', error });
  }
};

// Update a project
export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProject) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Error updating project', error });
  }
};

// Delete a project
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Error deleting project', error });
  }
}; 