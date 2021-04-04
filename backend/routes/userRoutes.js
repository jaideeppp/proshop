import express from 'express';
import { login, getUserProfile, createUser, updateUserProfile, getUsers, deleteUser, getuserById, updateUser } from '../controllers/userController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').get(protect, isAdmin, getUsers);

router.post('/login', login);
router.post('/signup', createUser);

router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)




router.route('/:id')
    .delete(protect, isAdmin, deleteUser)
    .get(protect, isAdmin, getuserById)
    .put(protect, isAdmin, updateUser)



export default router;