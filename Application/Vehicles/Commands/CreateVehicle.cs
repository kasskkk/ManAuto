using System;
using Application.Core;
using Application.Interfaces;
using Application.Vehicles.DTOs;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Vehicles.Commands;

public class CreateVehicle
{
    public class Command : IRequest<Result<string>>
    {
        public required CreateVehicleDto VehicleDto { get; set; }
        public required List<IFormFile> Files { get; set; } = [];
    }
    public class Handler(AppDbContext context, IMapper mapper, IPhotoService photoService, IUserAccessor userAccessor) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var userId = userAccessor.GetUserId();

            if (userId == null) return Result<string>.Failure("Cannot find user", 401);

            var vehicle = mapper.Map<Vehicle>(request.VehicleDto);

            if (request.Files.Count != 0)
            {
                foreach (var file in request.Files)
                {
                    var uploadResult = await photoService.UploadPhoto(file);

                    if (uploadResult != null)
                    {
                        var photo = new Photo
                        {
                            Url = uploadResult.Url,
                            PublicId = uploadResult.PublicId,
                            UserId = userId,
                            Vehicle = vehicle
                        };

                        vehicle.Photos.Add(photo);
                    }
                }

                var firstPhoto = vehicle.Photos.FirstOrDefault();
                if (firstPhoto != null)
                {
                    vehicle.MainPhotoUrl = firstPhoto.Url;
                }
            }

            context.Vehicles.Add(vehicle);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<string>.Failure("Failed to create vehicle", 500);

            return Result<string>.Success(vehicle.Id);
        }
    }
}
