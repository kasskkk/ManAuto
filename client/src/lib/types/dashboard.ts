export interface DashboardSummary {
    totalVehiclesRented: number;
    activeRentals: number;
    monthlyRevenue: number;
    rentalTrends: DashboardRentalPerformence[];
    rentals: DashboardRecentRent[];
}

export interface DashboardRentalPerformence {
    date: string,
    rentalCount: number
}

export interface DashboardRecentRent {
    id: string;
    customer: {
        email: string;
        phoneNumber: string;
    };
    brand: string;
    model: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    createdAt: string;
    rentalStatus: string;
}
