using System;
using Application.Customers.DTOs;
using Domain.Enums;

namespace Application.Dashboard.DTOs;

public class DashboardRecentRentsDto
{
    public required string Id { get; set; }
    public required CustomerDto Customer { get; set; }
    public required string Brand { get; set; }
    public required string Model { get; set; }
    public required DateTime StartDate { get; set; }
    public required DateTime EndDate { get; set; }
    public decimal TotalPrice { get; set; }
    public DateTime CreatedAt { get; set; }
    public RentalStatus RentalStatus { get; set; }
}
