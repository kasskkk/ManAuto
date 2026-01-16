using System;
using Application.Vehicles.DTOs;
using FluentValidation;

namespace Application.Vehicles.Validators;

public class BaseVehicleValidator<T, TDto> : AbstractValidator<T> where TDto : BaseVehicleDto
{
    public BaseVehicleValidator(Func<T, TDto> selector)
    {
        RuleFor(x => selector(x).Brand).NotEmpty().WithMessage("Brand is required");
        RuleFor(x => selector(x).LicensePlate).NotEmpty().WithMessage("License Plate is required");
        RuleFor(x => selector(x).Model).NotEmpty().WithMessage("Model is required");
        RuleFor(x => selector(x).ProductionYear).GreaterThan(1900).WithMessage("Production Year must be higher than 1900");
    }
}
