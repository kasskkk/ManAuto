using System;
using Application.Core;
using Application.Vehicles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Vehicles.Queries;

public class GetVehicleList
{
    public class Query : IRequest<Result<List<VehicleDto>>> { }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<List<VehicleDto>>>
    {
        public async Task<Result<List<VehicleDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var vehicles = await context.Vehicles
            .ProjectTo<VehicleDto>(mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

            return Result<List<VehicleDto>>.Success(vehicles);
        }
    }
}
