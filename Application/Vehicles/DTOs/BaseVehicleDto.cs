using System;
using Domain.Enums;

namespace Application.Vehicles.DTOs;

public class BaseVehicleDto
{
    public string Brand { get; set; } = "";
    public string Model { get; set; } = "";
    public string LicensePlate { get; set; } = "";
    public int ProductionYear { get; set; }
    public VehicleType VehicleType { get; set; }
}
