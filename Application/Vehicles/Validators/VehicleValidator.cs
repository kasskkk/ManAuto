using System;
using Application.Vehicles.DTOs;
using FluentValidation;

namespace Application.Vehicles.Validators;

public class VehicleValidator : AbstractValidator<BaseVehicleDto>
{
    public VehicleValidator()
    {
        RuleFor(x => x.Brand).NotEmpty().WithMessage("Brand is required");
        RuleFor(x => x.Model).NotEmpty().WithMessage("Model is required");
        RuleFor(x => x.LicensePlate).NotEmpty().WithMessage("License Plate is required");
        RuleFor(x => x.ProductionYear)
            .GreaterThan(1900).WithMessage("Year must be higher than 1900")
            .LessThanOrEqualTo(DateTime.Now.Year).WithMessage("Year cannot be in the future");
    }
}
