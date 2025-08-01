import { Router } from "express"
import { UserRoutes } from "../modules/user/user.route"
import { AuthRoutes } from "../modules/auth/auth.route"
// import { PaymentRoutes } from "../modules/payment/payment.route"
import { WalletRoutes } from "../modules/wallet/wallet.route"
import { TransactionRoutes } from "../modules/transaction/transaction.route"
import { CommissionRoutes } from "../modules/commission/commission.route"

export const router = Router()

const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/wallet",
        route: WalletRoutes
    },
    {
        path: "/transaction",
        route: TransactionRoutes
    },
    {
        path: "/commission",
        route: CommissionRoutes
    },
    // {
        // path: "/payment",
        // route: Routes
    // },
]

moduleRoutes.forEach((route)=>{
    router.use(route.path, route.route)
})

// router.use("/user", UserRoutes)
// router.use("/wallet", WalletRoutes);
// router.use("/transaction", TransactionRoutes);
// router.use("/commission", CommissionRoutes);