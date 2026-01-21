using Domain.Enums;

namespace Domain.Entities;

public class Vehicle
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Brand { get; set; }
    public required string Model { get; set; }
    public required string LicensePlate { get; set; }
    public required int ProductionYear { get; set; }
    public decimal PricePerDay { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public VehicleType VehicleType { get; set; }
    public ICollection<Rental> Rentals { get; set; } = [];
}
