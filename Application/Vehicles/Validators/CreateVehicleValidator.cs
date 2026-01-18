using System;
using Application.Vehicles.Commands;
using FluentValidation;

namespace Application.Vehicles.Validators;

public class CreateVehicleValidator : AbstractValidator<CreateVehicle.Command>
{
    public CreateVehicleValidator()
    {
        RuleFor(x => x.VehicleDto).SetValidator(new VehicleValidator());
    }
}
