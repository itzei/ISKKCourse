using ISKKCourse.Server.Models.DTOs;
using ISKKCourse.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace ISKKCourse.Server.Controllers;

[ApiController]
[Route("api/[controller]")]

public class SubjectController(IGetSubjectService getSubjectService, ISaveSubjectService saveSubjectService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var results = await getSubjectService.GetAll();
        return Ok(results);
    }
    [HttpPut("{id:int}")]

    public async Task<IActionResult> Put(int id, SubjectDto dto)
    {
        await saveSubjectService.Update(id, dto);
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> Create(SubjectDto dto)
    {
        await saveSubjectService.Store(dto);
        return Ok();
    }
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Remove(int id)
    {
        await saveSubjectService.Delete(id);
        return Ok();
    }
}