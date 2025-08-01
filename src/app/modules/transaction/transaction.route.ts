import express from 'express';
import {
  getAllTransactions,
  getMyTransactions,
  createTransactionController
} from './transaction.controller';
import { authMiddleware, roleMiddleware } from '../../middlewares/auth';

const router = express.Router();

router.get('/', authMiddleware(['admin']), getAllTransactions);
router.get('/me', authMiddleware(['user', 'agent']), getMyTransactions);
router.post('/', authMiddleware(['admin']), createTransactionController);

export const TransactionRoutes = router;
