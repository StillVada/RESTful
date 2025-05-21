using AutoMapper;
using MagicVilla_VillaAPI.Models.DTO;
using MagicVilla_VillaAPI.Models;
using MagicVilla_VillaAPI.Repository.IRepository;
using MagicVilla_VillaAPI.Services.IServices;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace MagicVilla_VillaAPI.Controllers
{
    [Route("api/UserAPI")]
    [ApiController]
    public class UserAPIController : ControllerBase
    {
        protected APIResponse _response;
        private readonly ILogger<UserAPIController> _logger;
        private readonly IUserRepository _dbUser;
        private readonly IMapper _mapper;
        private readonly IHashing _hashing;
        public UserAPIController(ILogger<UserAPIController> logger, IUserRepository dbUser, IMapper mapper, IHashing hashing)
        {
            _logger = logger;
            _dbUser = dbUser;
            _mapper = mapper;
            _hashing = hashing;
            this._response = new();
        }

        [HttpGet]
        public async Task<ActionResult<APIResponse>> GetUsers()
        {
            try
            {
                _logger.LogInformation("Getting all users");
                IEnumerable<User> usersList = await _dbUser.GetAllAsync();
                _response.Result = _mapper.Map<List<UserDTO>>(usersList);
                _response.StatusCode = HttpStatusCode.OK;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { ex.ToString() };
                _response.StatusCode = HttpStatusCode.InternalServerError;
                _logger.LogError(ex.Message);
            }
            return _response;
        }


        [HttpGet("{email}", Name = "GetUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<ActionResult<APIResponse>> GetUser(string email)
        {
            try
            {

                var user = await _dbUser.GetAsync(v => v.Email == email);

                if (user == null)
                {
                    _logger.LogError("Get User Error (Not found) with email = " + email);
                    _response.StatusCode = HttpStatusCode.NotFound;
                    _response.IsSuccess = false;
                    return NotFound(_response);
                }

                _logger.LogInformation("Getting User with email = " + email);
                _response.Result = _mapper.Map<UserDTO>(user);
                _response.StatusCode = HttpStatusCode.OK;
                return Ok(_response);
            }

            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { ex.ToString() };
                _response.StatusCode = HttpStatusCode.InternalServerError;
                _logger.LogError(ex.Message);
            }
            return _response;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

        public async Task<ActionResult<APIResponse>> CreateUser([FromBody] UserCreateDTO createDTO)
        {
            try
            {
                if (await _dbUser.GetAsync(u => u.Email == createDTO.Email) != null)
                {
                    _logger.LogError("Create User Error (User has already using email)");
                    _response.ErrorMessages = new List<string> { "This email already in Use!" };
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    return BadRequest(_response);
                }

                if (createDTO == null)
                {
                    _logger.LogError("Create User Error (Empty user)");
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    return BadRequest(_response);
                }

                createDTO.Password = _hashing.ComputeHashSha128(createDTO.Password);

                User user = _mapper.Map<User>(createDTO);

                await _dbUser.CreateAsync(user);

                _logger.LogInformation("Successfully creating user with email " + user.Email);

                _response.Result = _mapper.Map<UserDTO>(user);
                _response.StatusCode = HttpStatusCode.Created;

                return CreatedAtRoute("GetUser", new { email = user.Email }, _response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { ex.ToString() };
                _response.StatusCode = HttpStatusCode.InternalServerError;
                _logger.LogError(ex.Message);
            }
            return _response;
        }


        [HttpDelete("{email}", Name = "DeleteUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

        public async Task<ActionResult<APIResponse>> DeleteUser(string email)
        {
            try
            {
                var user = await _dbUser.GetAsync(v => v.Email == email);

                if (user == null)
                {
                    _logger.LogError("Delete User Error (User not found) with email = " + email);
                    _response.StatusCode = HttpStatusCode.NotFound;
                    _response.IsSuccess = false;
                    _response.ErrorMessages = new List<string> { "User not found" };
                    return NotFound(_response);
                }

                await _dbUser.RemoveAsync(user);

                _logger.LogInformation("Successfully deleting user with email = " + email);

                _response.StatusCode = HttpStatusCode.NoContent;

                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { ex.ToString() };
                _response.StatusCode = HttpStatusCode.OK;
                _logger.LogError(ex.Message);
            }
            return _response;
        }


        [HttpPut("{email}", Name = "UpdateUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<ActionResult<APIResponse>> UpdateUser(string email, [FromBody] UserUpdateDTO updateDTO)
        {
            try
            {
                if (updateDTO == null || email != updateDTO.Email)
                {
                    _logger.LogError("Update User Error (New user is empty or email != new email) with email = " + email);
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.ErrorMessages = new List<string> { "New user is empty or email != new email" };
                    return BadRequest(_response);
                }

                User model = _mapper.Map<User>(updateDTO);

                await _dbUser.UpdateAsync(model);
                _response.StatusCode = HttpStatusCode.NoContent;
                _response.Result = model;

                _logger.LogInformation("Successfully updating user with email = " + email);
                return Ok(_response);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                _logger.LogError("Update user Error (User not found) with email = " + email);
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { "User not found" };
                _response.StatusCode = HttpStatusCode.NotFound;
                return NotFound(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { ex.ToString() };
                _response.StatusCode = HttpStatusCode.OK;
                _logger.LogError(ex.Message);
            }
            return _response;
        }


        [HttpPatch("{email}", Name = "UpdatePartialUSer")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<ActionResult<APIResponse>> UpdatePartialUser(string email, JsonPatchDocument<UserUpdateDTO> patchDTO)
        {
            try
            {
                if (patchDTO == null)
                {
                    _logger.LogError("Update Partial user Error (New user is empty) with email = " + email);
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.ErrorMessages = new List<string> { "New user is empty" };
                    return BadRequest(_response);
                }

                var user = await _dbUser.GetAsync(v => v.Email == email, false);

                if (user == null)
                {
                    _logger.LogError("Update Partial user Error (user not found) with email = " + email);
                    _response.StatusCode = HttpStatusCode.NotFound;
                    _response.IsSuccess = false;
                    _response.ErrorMessages = new List<string> { "User not found" };
                    return NotFound(_response);
                }

                UserUpdateDTO updateDTO = _mapper.Map<UserUpdateDTO>(user);

                patchDTO.ApplyTo(updateDTO, ModelState);

                User model = _mapper.Map<User>(updateDTO);

                if (!ModelState.IsValid)
                {
                    _logger.LogError("Update Partial User Error (New user is not vaild) with email = " + email);
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.ErrorMessages = new List<string> { "New suer is not vaild" };
                    return BadRequest(ModelState);
                }

                await _dbUser.UpdateAsync(model);
                _response.StatusCode = HttpStatusCode.OK;
                _response.Result = model;

                _logger.LogInformation("Successfully partially updating user with email = " + email);
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { ex.ToString() };
                _response.StatusCode = HttpStatusCode.InternalServerError;
                _logger.LogError(ex.Message);
            }
            return _response;
        }
    }
}
