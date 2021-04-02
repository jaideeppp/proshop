import express from 'express';
import { login, getUserProfile, createUser, updateUserProfile, getUsers } from '../controllers/userController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').get(protect, isAdmin, getUsers);

router.post('/login', login);
router.post('/signup', createUser);

router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)





export default router;