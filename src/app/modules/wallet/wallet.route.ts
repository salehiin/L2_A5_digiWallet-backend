import express from 'express';
import {
  getAllWallets,
  getSingleWallet,
  deposit,
  withdraw,
  sendMoney,
  getMyTransactions
} from './wallet.controller';
import { authMiddleware, roleMiddleware } from '../../middlewares/auth';

const router = express.Router();

router.get('/', authMiddleware(['admin']), getAllWallets);
router.get('/me', authMiddleware(['user', 'agent', 'admin']), getSingleWallet);
router.post('/deposit', authMiddleware(['user', 'agent']), deposit);
router.post('/withdraw', authMiddleware(['user', 'agent']), withdraw);
router.post('/send', authMiddleware(['user']), sendMoney);
router.get('/transactions', authMiddleware(['user', 'agent', 'admin']), getMyTransactions);

export const WalletRoutes = router;
