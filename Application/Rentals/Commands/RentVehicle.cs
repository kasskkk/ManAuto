using Application.Core;
using Application.Interfaces;
using Application.Rentals.DTOs;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Rentals.Commands;

public class RentVehicle
{
    public class Command : IRequest<Result<Unit>>
    {
        public required RentVehicleDto VehicleDto { get; set; }
    }

    public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var vehicle = await context.Vehicles.FirstOrDefaultAsync(x => x.Id == request.VehicleDto.VehicleId, cancellationToken);

            if (vehicle == null) return Result<Unit>.Failure("Cannot find vehicle", 404);

            var isOccupied = await context.Rentals.AnyAsync(x =>
                x.VehicleId == request.VehicleDto.VehicleId
                && request.VehicleDto.StartDate < x.EndDate
                && request.VehicleDto.EndDate > x.StartDate,
                cancellationToken);

            if (isOccupied) return Result<Unit>.Failure("Vehicle is unavalible in this period", 400);

            var userId = userAccessor.GetUserId();

            if (userId == null) return Result<Unit>.Failure("User data is required", 401);

            var newRental = new Rental
            {
                VehicleId = vehicle.Id,
                UserId = userId,
                StartDate = request.VehicleDto.StartDate,
                EndDate = request.VehicleDto.EndDate,
            };

            context.Rentals.Add(newRental);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            return result
            ? Result<Unit>.Success(Unit.Value)
            : Result<Unit>.Failure("Problem with renting vehicle", 400);
        }
    }
}
