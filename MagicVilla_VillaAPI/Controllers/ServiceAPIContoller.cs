using MagicVilla_VillaAPI.Models;
using MagicVilla_VillaAPI.Services.IServices;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace MagicVilla_VillaAPI.Controllers
{
    [Route("api/ServiceAPI")]
    [ApiController]
    public class ServiceAPIController : ControllerBase
    {
        protected APIResponse _response;
        private readonly IHashing _hashing;
        public ServiceAPIController(IHashing hashing)
        {
            _hashing = hashing;
            this._response = new();
        }

        [HttpGet("{password}", Name = "GetHashPassword")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public ActionResult<APIResponse> GetHashPassword(string password)
        {
            try
            {
                if (string.IsNullOrEmpty(password))
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    return BadRequest(_response);
                }

                password = _hashing.ComputeHashSha128(password);

                _response.Result = password;
                _response.StatusCode = HttpStatusCode.OK;
                return Ok(_response);
            }

            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { ex.ToString() };
                _response.StatusCode = HttpStatusCode.InternalServerError;
            }
            return _response;
        }
    }
}