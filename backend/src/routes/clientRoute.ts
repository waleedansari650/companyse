import express from 'express';
import { postProjectConflictsController } from '../controllers/clientController';
import { clientQueryValidator } from '../validators/client';
const router = express.Router();

router.post('/postProjectConflicts', clientQueryValidator, postProjectConflictsController);



export default router;
