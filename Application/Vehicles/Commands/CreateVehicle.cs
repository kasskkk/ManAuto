using System;
using Application.Core;
using Application.Vehicles.DTOs;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Persistence;

namespace Application.Vehicles.Commands;

public class CreateVehicle
{
    public class Command : IRequest<Result<string>>
    {
        public required CreateVehicleDto VehicleDto { get; set; }
    }
    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var vehicle = mapper.Map<Vehicle>(request.VehicleDto);

            context.Vehicles.Add(vehicle);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<string>.Failure("Failed to create vehicle", 400);

            return Result<string>.Success(vehicle.Id);
        }
    }
}
