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
    public class Query : IRequest<Result<VehicleDetailsDto>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<VehicleDetailsDto>>
    {
        public async Task<Result<VehicleDetailsDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var vehicle = await context.Vehicles
            .ProjectTo<VehicleDetailsDto>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (vehicle == null) return Result<VehicleDetailsDto>.Failure("Vehicle not found", 404);

            return Result<VehicleDetailsDto>.Success(vehicle);
        }
    }

}
