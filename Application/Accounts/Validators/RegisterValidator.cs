using System;
using FluentValidation;
using static Application.Accounts.Commands.Register;

namespace Application.Accounts.Validators;

public class RegisterValidator : AbstractValidator<Command>
{
    public RegisterValidator()
    {
        RuleFor(x => x.RegisterDto.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.RegisterDto.Password).NotEmpty()
            .MinimumLength(8).WithMessage("Password must be at least 8 characters")
            .Matches(@"[A-Z]").WithMessage("Password must contain an uppercase letter")
            .Matches(@"[0-9]").WithMessage("Password must contain a number");
    }
}
