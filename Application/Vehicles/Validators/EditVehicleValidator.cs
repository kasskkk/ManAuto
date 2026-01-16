using System;
using Application.Vehicles.Commands;
using Application.Vehicles.DTOs;
using FluentValidation;

namespace Application.Vehicles.Validators;

public class EditVehicleValidator : BaseVehicleValidator<EditVehicle.Command, EditVehicleDto>
{
    public EditVehicleValidator() : base(x => x.VehicleDto)
    {
        RuleFor(x => x.VehicleDto.Id).NotEmpty().WithMessage("Id is required");
    }
}
