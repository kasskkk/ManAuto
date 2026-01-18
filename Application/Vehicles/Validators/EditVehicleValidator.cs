using System;
using Application.Vehicles.Commands;
using Application.Vehicles.DTOs;
using FluentValidation;

namespace Application.Vehicles.Validators;

public class EditVehicleValidator : AbstractValidator<EditVehicle.Command>
{
    public EditVehicleValidator() 
    {
        RuleFor(x => x.VehicleDto).SetValidator(new VehicleValidator());
        RuleFor(x => x.VehicleDto.Id).NotEmpty().WithMessage("Id is required for editing");
    }
}
