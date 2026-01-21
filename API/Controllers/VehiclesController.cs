using System;
using Application.Vehicles.Commands;
using Application.Vehicles.DTOs;
using Application.Vehicles.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class VehiclesController : BaseApiController
{
    [HttpPost]
    public async Task<ActionResult<string>> Create(CreateVehicleDto vehicleDto)
    {
        return HandleResult(await Mediator.Send(new CreateVehicle.Command { VehicleDto = vehicleDto }));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Edit(string id, EditVehicleDto vehicleDto)
    {
        vehicleDto.Id = id;
        return HandleResult(await Mediator.Send(new EditVehicle.Command { VehicleDto = vehicleDto }));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(string id)
    {
        return HandleResult(await Mediator.Send(new DeleteVehicle.Command { Id = id }));
    }

    [HttpGet]
    public async Task<ActionResult<List<VehicleDto>>> List()
    {
        return HandleResult(await Mediator.Send(new GetVehicleList.Query { }));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<VehicleDetailsDto>> Details(string id)
    {
        return HandleResult(await Mediator.Send(new GetVehicleDetails.Query { Id = id }));
    }
}
