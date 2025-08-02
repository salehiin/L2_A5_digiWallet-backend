import express from 'express';
import {
  getAllTransactions,
  getMyTransactions,
  sendMoney
} from './transaction.controller';
import { checkAuth } from '../../middlewares/checkAuth';

const router = express.Router();

router.get('/', checkAuth('admin'), getAllTransactions);
router.get('/me', checkAuth('user', 'agent'), getMyTransactions);
router.post('/send', checkAuth('admin', 'user'), sendMoney);

export const TransactionRoutes = router;