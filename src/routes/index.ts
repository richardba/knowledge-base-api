import { Router } from 'express';
import topicRoutes from './topicRoutes';
import resourceRoutes from './resourceRoutes';
import userRoutes from './userRoutes';

const router = Router();

router.use('/topics', topicRoutes);
router.use('/resources', resourceRoutes);
router.use('/users', userRoutes);

export default router;
