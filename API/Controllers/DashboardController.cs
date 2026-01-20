using System;
using Application.Dashboard.DTOs;
using Application.Dashboard.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class DashboardController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<GetDashboardSummaryDto>> Summary()
    {
        return HandleResult(await Mediator.Send(new GetDashboardSummary.Query()));
    }
}
