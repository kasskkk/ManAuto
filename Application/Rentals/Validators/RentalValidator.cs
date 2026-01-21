using System;
using Application.Rentals.Commands;
using FluentValidation;

namespace Application.Rentals.Validators;

public class RentalValidator : AbstractValidator<RentVehicle.Command>
{
    public RentalValidator()
    {
        RuleFor(x => x.VehicleDto.VehicleId).NotEmpty();
        RuleFor(x => x.VehicleDto.StartDate).GreaterThanOrEqualTo(DateTime.UtcNow).WithMessage("Start date cannot be in the past");
        RuleFor(x => x.VehicleDto.EndDate).GreaterThanOrEqualTo(x => x.VehicleDto.StartDate.AddDays(1)).WithMessage("End date must be after one day");
    }
}
