import express from 'express'
import { getUser, updateUser, deleteUser, followUser, unFollowUser, getAllUsers } from '../Controllers/UserController.js'
import authMiddleWare from '../Middleware/AuthMiddleWare.js'
const router = express.Router()


router.get('/', getAllUsers)
router.get('/:id', getUser)
router.put('/:id', authMiddleWare, updateUser)
router.delete('/:id', authMiddleWare, deleteUser)
router.put('/:id/follow', authMiddleWare, followUser)
router.put('/:id/unfollow', authMiddleWare, unFollowUser)

export default router