using System;
using Application.Rentals.DTOs;

namespace Application.Dashboard.DTOs;

public class GetDashboardSummaryDto
{
    public required int TotalVehiclesRented { get; set; }
    public required int ActiveRentals { get; set; }
    public required decimal MonthlyRevenue { get; set; }
    public List<DashboardRentalTrendsDto> RentalTrends { get; set; } = [];
    public ICollection<DashboardRecentRentsDto> Rentals { get; set; } = [];
}
