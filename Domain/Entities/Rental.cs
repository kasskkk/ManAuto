using Domain.Enums;

namespace Domain.Entities;

public class Rental
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string UserId { get; set; }
    public User? User { get; set; }
    public required string VehicleId { get; set; }
    public Vehicle? Vehicle { get; set; }
    public required DateTime StartDate { get; set; }
    public required DateTime EndDate { get; set; }
    public decimal TotalPrice { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public RentalStatus RentalStatus { get; set; }
}
