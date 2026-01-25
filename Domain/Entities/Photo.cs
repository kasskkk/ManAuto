using System;
using System.Text.Json.Serialization;

namespace Domain.Entities;

public class Photo
{
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public required string Url { get; set; }
    public required string PublicId { get; set; }
    public required string UserId { get; set; }
    [JsonIgnore]
    public User User { get; set; } = null!;
    public string? VehicleId { get; set; }
    [JsonIgnore]
    public Vehicle? Vehicle { get; set; }
}
