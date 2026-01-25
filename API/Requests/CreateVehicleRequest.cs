using System;
using Application.Vehicles.DTOs;

namespace API.Requests;

public class CreateVehicleRequest
{
    public CreateVehicleDto VehicleDto { get; set; } = null!;
    public List<IFormFile> Files { get; set; } = [];
}
