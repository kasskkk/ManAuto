import { createBrowserRouter } from "react-router"
import App from "../App"
import DashboardPage from "@/features/dashboard/DashboardPage"
import CustomersPage from "@/features/customers/CustomersPage"
import RaportsPage from "@/features/raports/RaportsPage"
import RentalsPage from "@/features/rentals/RentalsPage"
import VehiclesPage from "@/features/vehicles/VehiclesPage"
import { VehicleForm } from "@/features/vehicles/form/VehicleForm"
import { LoginForm } from "@/features/users/LoginForm"
import VehicleDetails from "@/features/vehicles/VehicleDetails"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <DashboardPage /> },
            { path: 'dashboard', element: <DashboardPage /> },
            { path: 'customers', element: <CustomersPage /> },
            { path: 'fleet', element: <VehiclesPage /> },
            { path: 'rentals', element: <RentalsPage /> },
            { path: 'raports', element: <RaportsPage /> },
            { path: 'vehicleForm', element: <VehicleForm /> },
            { path: 'loginForm', element: <LoginForm /> },
            { path: 'details', element: <VehicleDetails /> },
        ]
    }
])
