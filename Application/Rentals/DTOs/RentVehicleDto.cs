using System;

namespace Application.Rentals.DTOs;

public class RentVehicleDto
{
    public required string VehicleId { get; set; }
    public required DateTime StartDate { get; set; }
    public required DateTime EndDate { get; set; }
}
