using System;
using Application.Vehicles.Commands;
using Application.Vehicles.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class VehicleController : BaseApiController
{
    [HttpPost]
    public async Task<ActionResult<string>> CreateVehicle(CreateVehicleDto vehicleDto)
    {
        return HandleResult(await Mediator.Send(new CreateVehicle.Command { VehicleDto = vehicleDto }));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> EditVehicle(string id, EditVehicleDto vehicleDto)
    {
        vehicleDto.Id = id;
        return HandleResult(await Mediator.Send(new EditVehicle.Command { VehicleDto = vehicleDto }));
    }
}
