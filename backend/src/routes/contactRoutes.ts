import express from 'express';
import { createContact, getAllContacts } from '../controllers/contactController';

const router = express.Router();

// POST submit contact form
router.post('/', createContact);

// GET all contact messages (admin only)
router.get('/', getAllContacts);

export default router; 