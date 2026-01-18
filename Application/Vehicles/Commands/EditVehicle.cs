using System;
using Application.Core;
using Application.Vehicles.DTOs;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Vehicles.Commands;

public class EditVehicle
{
    public class Command : IRequest<Result<Unit>>
    {
        public required EditVehicleDto VehicleDto { get; set; }
    }
    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var vehicle = await context.Vehicles.FindAsync([request.VehicleDto.Id], cancellationToken);

            if (vehicle == null) return Result<Unit>.Failure("Vehicle not found", 404);

            mapper.Map(request.VehicleDto, vehicle);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("No changes were made to the vehicle", 400);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
