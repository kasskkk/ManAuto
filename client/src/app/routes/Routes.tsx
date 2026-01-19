import { createBrowserRouter } from "react-router"
import App from "../App"
import DashboardPage from "@/features/dashboard/DashboardPage"
import CustomersPage from "@/features/customers/CustomersPage"
import FleetPage from "@/features/fleet/FleetPage"
import BookingsPage from "@/features/bookings/BookingsPage"
import RaportsPage from "@/features/raports/RaportsPage"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <DashboardPage /> },
            { path: 'dashboard', element: <DashboardPage /> },
            { path: 'customers', element: <CustomersPage /> },
            { path: 'fleet', element: <FleetPage /> },
            { path: 'bookings', element: <BookingsPage /> },
            { path: 'raports', element: <RaportsPage /> },
        ]
    }
])
