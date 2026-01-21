using System;
using Application.Accounts.DTOs;
using Application.Customers.DTOs;
using Application.Dashboard.DTOs;
using Application.Rentals.DTOs;
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
        CreateMap<Vehicle, VehicleDetailsDto>();
        CreateMap<User, CustomerDto>();
        CreateMap<Rental, RentalDto>()
            .ForMember(dest => dest.Customer, opt => opt.MapFrom(src => src.User));
        CreateMap<Rental, DashboardRecentRentsDto>()
            .ForMember(dest => dest.Customer, opt => opt.MapFrom(src => src.User))
            .ForMember(d => d.Brand, opt => opt.MapFrom(s => s.Vehicle!.Brand))
            .ForMember(d => d.Model, opt => opt.MapFrom(s => s.Vehicle!.Model));
    }
}
