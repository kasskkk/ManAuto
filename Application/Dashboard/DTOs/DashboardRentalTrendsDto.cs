using System;

namespace Application.Dashboard.DTOs;

public class DashboardRentalTrendsDto
{
    public required string Date { get; set; }
    public decimal RentalCount { get; set; }
}
