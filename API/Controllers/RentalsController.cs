using System;
using Application.Rentals.Commands;
using Application.Rentals.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class RentalsController : BaseApiController
{
    [HttpPost]
    public async Task<ActionResult> Rent(RentVehicleDto vehicleDto)
    {
        return HandleResult(await Mediator.Send(new RentVehicle.Command { VehicleDto = vehicleDto }));
    }
}
