using System;
using Application.Accounts.DTOs;
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
        CreateMap<RegisterDto, User>()
            .ForMember(d => d.UserName, opt => opt.MapFrom(x => x.Email));
    }
}
