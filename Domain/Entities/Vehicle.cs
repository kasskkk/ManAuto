using System;
using Domain.Enums;

namespace Domain.Entities;

public class Vehicle
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Brand { get; set; }
    public required string Model { get; set; }
    public required string LicensePlate { get; set; }
    public required int ProductionYear { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public required VehicleType VehicleType { get; set; }
}
