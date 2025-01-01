using ISKKCourse.Server.Models.DTOs;
using ISKKCourse.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace ISKKCourse.Server.Controllers;

[ApiController]
[Route("api/[controller]")]

public class LecturerController(IGetLecturerService getLecturerService, ISaveLecturerService saveLecturerService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var results = await getLecturerService.GetAll();
        return Ok(results);
    }
    [HttpPut("{id:int}")]

    public async Task<IActionResult> Put(int id, LecturerDto dto)
    {
        await saveLecturerService.Update(id, dto);
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> Create(LecturerDto dto)
    {
        await saveLecturerService.Store(dto);
        return Ok();
    }
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Remove(int id)
    {
        await saveLecturerService.Delete(id);
        return Ok();
    }
}