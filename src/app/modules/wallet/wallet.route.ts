import express from 'express';
import { createWallet, getAllWallets, getSingleWallet, deposit, withdraw, sendMoney, getMyTransactions } from './wallet.controller';
import { checkAuth } from '../../middlewares/checkAuth';

const router = express.Router();

router.post('/', checkAuth("user", "admin"), createWallet); // allow both user and admin
router.get('/', checkAuth("admin"), getAllWallets);          // only admin
router.get('/:id', checkAuth("user", "admin"), getSingleWallet);
router.post('/deposit', checkAuth("user", "admin"), deposit);
router.post('/withdraw', checkAuth("user", "admin"), withdraw);
router.post('/transfer', checkAuth("user", "admin"), sendMoney);
router.get('/my-transactions', checkAuth("user", "admin"), getMyTransactions);
export const WalletRoutes = router;
