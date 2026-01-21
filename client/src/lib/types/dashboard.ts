export interface DashboardSummary {
    totalVehiclesRented: number,
    activeRentals: number,
    monthlyRevenue: number,
    rentalTrends: DashboardRentalPerformence[]
}

export interface DashboardRentalPerformence {
    date: string,
    rentalCount: number
}
