import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { createComment, getPostComments, editComment, deleteComment, likeComment } from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/create', verifyUser, createComment);
router.get('/getComments/:postId', verifyUser, getPostComments);
router.put('/edit/:commentId', verifyUser, editComment);
router.delete('/delete/:commentId', verifyUser, deleteComment);
router.put('/likeComment/:commentId', verifyUser, likeComment);

export default router;