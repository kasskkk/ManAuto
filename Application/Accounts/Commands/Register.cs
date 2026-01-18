using System;
using Application.Accounts.DTOs;
using Application.Core;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Accounts.Commands;

public class Register
{
    public class Command : IRequest<Result<Unit>>
    {
        public required RegisterDto RegisterDto { get; set; }
    }
    public class Handler(UserManager<User> userManager, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            if (await userManager.FindByEmailAsync(request.RegisterDto.Email) != null)
                return Result<Unit>.Failure("Email is already taken", 400);

            var user = mapper.Map<User>(request.RegisterDto);

            var result = await userManager.CreateAsync(user, request.RegisterDto.Password);

            if (!result.Succeeded)
                return Result<Unit>.Failure("Problem creating user account", 400);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
