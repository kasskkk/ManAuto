using System;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Vehicles.Commands;

public class DeleteVehicle
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var vehicle = await context.Vehicles.FindAsync([request.Id], cancellationToken);

            if (vehicle == null) return Result<Unit>.Failure("Vehicle not found", 404);

            context.Vehicles.Remove(vehicle);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Failed to delete the vehicle", 500);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
