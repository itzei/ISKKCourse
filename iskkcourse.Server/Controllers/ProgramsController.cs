using ISKKCourse.Server.Models.DTOs;
using ISKKCourse.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace ISKKCourse.Server.Controllers;

[ApiController]
[Route("api/[controller]")]

public class ProgramsController(IGetProgramService getProgramService, ISaveProgramService saveProgramService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var results = await getProgramService.GetAll();
        return Ok(results);
    }
    [HttpPut("{id:int}")]

    public async Task<IActionResult> Put(int id, ProgramDto dto)
    {
        await saveProgramService.Update(id, dto);
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> Create(ProgramDto dto)
    {
        await saveProgramService.Store(dto);
        return Ok();
    }
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Remove(int id)
    {
        await saveProgramService.Delete(id);
        return Ok();
    }
}