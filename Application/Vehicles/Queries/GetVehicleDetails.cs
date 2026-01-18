using System;
using Application.Core;
using Application.Vehicles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Vehicles.Queries;

public class GetVehicleDetails
{
    public class Query : IRequest<Result<VehicleDto>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<VehicleDto>>
    {
        public async Task<Result<VehicleDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var vehicle = await context.Vehicles
            .ProjectTo<VehicleDto>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (vehicle == null) return Result<VehicleDto>.Failure("Vehicle not found", 404);

            return Result<VehicleDto>.Success(vehicle);
        }
    }

}
