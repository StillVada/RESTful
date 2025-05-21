using MagicVilla_VillaAPI.Data;
using MagicVilla_VillaAPI.Logging;
using MagicVilla_VillaAPI.Models;
using MagicVilla_VillaAPI.Models.DTO;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using MagicVilla_VillaAPI.Repository.IRepository;
using System.Net;
namespace MagicVilla_VillaAPI.Controllers
{
    [Route("api/VillaNumbersAPI")]
    [ApiController]
    public class VillaNumbersAPIController : ControllerBase
    {

        protected APIResponse _response;
        public readonly IMapper _mapper;
        private readonly IVillaRepository _Villasdb;
        public readonly IVillaNumbersRepository _dbVilla;
        public VillaNumbersAPIController(IVillaNumbersRepository dbVilla, IMapper mapper, IVillaRepository Villasdb)
        {
            _Villasdb = Villasdb; 
            _dbVilla = dbVilla;
            _mapper = mapper;
            this._response = new(); 
        }


        [HttpGet(Name = "GetVillaNumbers")] 
        public async Task<ActionResult<APIResponse>> GetVillaNumbers()
        {
            try
            {
                IEnumerable<VillaNumber> villaNumbersList = await _dbVilla.GetAllAsync();
                _response.Result = _mapper.Map<IEnumerable<VillaNumberDTO>>(villaNumbersList);
                _response.StatusCode = HttpStatusCode.OK;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpGet("{VillaNo:int}", Name = "GetVillaNumber")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<APIResponse>> GetVillaNumber(int VillaNo)
        {
            try
            {
                if (VillaNo == 0)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    return BadRequest(_response);
                }
                var villaNumber = await _dbVilla.GetAsync(u => u.VillaNo == VillaNo);
                if (villaNumber == null)
                {
                    _response.StatusCode = HttpStatusCode.NotFound;
                    return NotFound(_response);
                }
                _response.Result = _mapper.Map<VillaNumberDTO>(villaNumber);
                _response.StatusCode = HttpStatusCode.OK;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpPost]
        public async  Task<ActionResult<APIResponse>> CreateVillaNumber([FromBody] VillaNumberCreateDTO createDTO)
        {
            try
            {
                if (await _dbVilla.GetAsync(u => u.VillaNo == createDTO.VillaNo) != null)
                {
                    ModelState.AddModelError("CustomError", "Number is already Exists");
                    return BadRequest(ModelState);
                }
                if (await _Villasdb.GetAsync(u=>u.Id == createDTO.VillaID) == null)
                {
                    ModelState.AddModelError("CustomError", "Villa ID is Invalid!");
                    return BadRequest(ModelState);
                }
                if (createDTO == null)
                {
                    return BadRequest(createDTO);
                }
                VillaNumber villaNumber = _mapper.Map<VillaNumber>(createDTO);

                await _dbVilla.CreateAsync(villaNumber);
                _response.Result = _mapper.Map<VillaNumberDTO>(villaNumber);
                _response.StatusCode = HttpStatusCode.Created;
                return CreatedAtRoute("GetVillaNumber", new { villaNumber.VillaNo }, _response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)] 
        [HttpDelete("{VillaNo:int}", Name = "DeleteVillaNumber")]
        public async Task<ActionResult<APIResponse>> DeleteVillaNumber(int VillaNo)
        {
            try
            {
                if (VillaNo == 0)
                {
                    return BadRequest();
                }
                var villaNumber = await _dbVilla.GetAsync(v => v.VillaNo == VillaNo);

                if (villaNumber == null)
                {
                    return NotFound();
                }

                await _dbVilla.RemoveAsync(villaNumber);
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }


        [HttpPut("{VillaNo:int}", Name = "UpdateVillaNumber")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<ActionResult<APIResponse>> UpdateVillaNumber(int VillaNo, [FromBody]VillaNumberUpdateDTO updateDTO)
        {
            try
            {
                if (updateDTO == null || VillaNo != updateDTO.VillaNo)
                {
                    return BadRequest();
                }
                if (await _Villasdb.GetAsync(u => u.Id == updateDTO.VillaID) == null)
                {
                    ModelState.AddModelError("CustomError", "Villa ID is Invalid!");
                    return BadRequest(ModelState);
                }
                VillaNumber model = _mapper.Map<VillaNumber>(updateDTO);

                await _dbVilla.UpdateAsync(model);
                _response.StatusCode = HttpStatusCode.NoContent;
                _response.IsSuccess = true;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;


        }

        [HttpPatch("{VillaNo:int}", Name = "UpdatePartialVillaNumber")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<IActionResult> UpdatePartialVilla(int VillaNo, JsonPatchDocument<VillaNumberUpdateDTO> patchDTO)
        {
            if ( VillaNo == 0 || patchDTO == null)
            {
                return BadRequest();
            }
            var villaNumber = await _dbVilla.GetAsync(u => u.VillaNo == VillaNo, tracked:false);

            VillaNumberUpdateDTO villaNumberDTO = _mapper.Map<VillaNumberUpdateDTO>(villaNumber);

            if (villaNumber == null)
            {
                return BadRequest();
            }
            patchDTO.ApplyTo(villaNumberDTO, ModelState);
            VillaNumber model = _mapper.Map<VillaNumber>(villaNumberDTO);

            await _dbVilla.UpdateAsync(model);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return NoContent();
        }
    }   
}
