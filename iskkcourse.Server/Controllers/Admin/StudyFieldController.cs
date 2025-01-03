using ISKKCourse.Server.Models.DTOs;
using ISKKCourse.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace ISKKCourse.Server.Controllers;

[ApiController]
[Route("api/[controller]")]

public class StudyFieldController(IGetStudyFieldService getStudyFieldService, ISaveStudyFieldService saveStudyFieldService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var results = await getStudyFieldService.GetAll();
        return Ok(results);
    }
    [HttpPut("{id:int}")]

    public async Task<IActionResult> Put(int id, StudyFieldDto dto)
    {
        await saveStudyFieldService.Update(id, dto);
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> Create(StudyFieldDto dto)
    {
        await saveStudyFieldService.Store(dto);
        return Ok();
    }
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Remove(int id)
    {
        await saveStudyFieldService.Delete(id);
        return Ok();
    }
}