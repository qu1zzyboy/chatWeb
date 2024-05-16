// Import necessary modules
import { Router } from 'express';
import { register, login } from '../controllers/userController.js';

// Create a new router instance
const router = Router();

// Define the route
router.post('/register', register);
router.post('/login', login)

// Export the router as the default export
export default router;

