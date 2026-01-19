using System;
using Application.Accounts.Commands;
using Application.Accounts.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountsController : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDto registerDto)
    {
        return HandleResult(await Mediator.Send(new Register.Command { RegisterDto = registerDto }));
    }
}
