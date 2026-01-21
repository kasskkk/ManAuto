using System;
using Domain.Enums;

namespace Application.Vehicles.DTOs;

public class VehicleDto
{
    public required string Id { get; set; }
    public required string Brand { get; set; }
    public required string Model { get; set; }
    public required string LicensePlate { get; set; }
    public required int ProductionYear { get; set; }
    public required DateTime CreatedAt { get; set; }
    public required VehicleType VehicleType { get; set; }
}
