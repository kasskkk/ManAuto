using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        private IMediator? _mediator;
        protected IMediator Mediator => _mediator
            ??= HttpContext.RequestServices.GetService<IMediator>()
            ?? throw new InvalidOperationException("MediatR service is unavalible");

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result == null) return NotFound();

            if (result.IsSuccess)
            {
                if (result.Value is Unit || result.Value == null)
                    return NoContent();

                return Ok(result.Value);
            }

            return result.Code switch
            {
                404 => NotFound(result.Error),
                _ => BadRequest(result.Error)
            };

        }
    }
}
