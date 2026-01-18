using System;
using Application.Vehicles.DTOs;
using AutoMapper;
using Domain.Entities;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<CreateVehicleDto, Vehicle>();
        CreateMap<EditVehicleDto, Vehicle>();
        CreateMap<Vehicle, VehicleDto>();
    }
}
