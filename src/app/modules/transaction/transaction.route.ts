import express from 'express';
import {
  getAllTransactions,
  getMyTransactions,
  sendMoney
} from './transaction.controller';
import { checkAuth } from '../../middlewares/checkAuth';

const router = express.Router();


router.get('/', checkAuth('admin', 'super_admin'), getAllTransactions);
// router.get('/:userId', checkAuth('user', 'agent'), getMyTransactions);
router.get('/my-transactions', checkAuth('user', 'agent', 'admin', 'super_admin'), getMyTransactions);
router.post('/send', checkAuth('admin', 'user'), sendMoney);

export const TransactionRoutes = router;