using System;
using Application.Vehicles.Commands;
using Application.Vehicles.DTOs;

namespace Application.Vehicles.Validators;

public class CreateVehicleValidator : BaseVehicleValidator<CreateVehicle.Command, CreateVehicleDto>
{
    public CreateVehicleValidator() : base(x => x.VehicleDto)
    {
    }
}
