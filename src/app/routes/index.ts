import { Router } from "express"
import { UserRoutes } from "../modules/user/user.route"
import { AuthRoutes } from "../modules/auth/auth.route"
import { DivisionRoutes } from "../modules/division/division.route"
import { TourRoutes } from "../modules/tour/tour.route"
import { BookingRoutes } from "../modules/booking/booking.route"
import { PaymentRoutes } from "../modules/payment/payment.route"

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
    // {
        // path: "/division",
        // route: DivisionRoutes  // division=commission
    // },
    // {
    //     path: "/tour",
        // route: TourRoutes // tour=wallet
    // },
    // {
    //     path: "/booking",
        // route: BookingRoutes // booking=transaction
    // },
    // {
        // path: "/payment",
        // route: Routes
    // },
]

moduleRoutes.forEach((route)=>{
    router.use(route.path, route.route)
})

router.use("/user", UserRoutes)