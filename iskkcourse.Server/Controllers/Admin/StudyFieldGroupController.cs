using ISKKCourse.Server.Models.DTOs;
using ISKKCourse.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace ISKKCourse.Server.Controllers;

[ApiController]
[Route("api/[controller]")]

public class StudyFieldGroupController(IGetStudyFieldGroupService getStudyFieldGroupService, ISaveStudyFieldGroupService saveStudyFieldGroupService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var results = await getStudyFieldGroupService.GetAll();
        return Ok(results);
    }
    [HttpPut("{id:int}")]

    public async Task<IActionResult> Put(int id, StudyFieldGroupDto dto)
    {
        await saveStudyFieldGroupService.Update(id, dto);
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> Create(StudyFieldGroupDto dto)
    {
        await saveStudyFieldGroupService.Store(dto);
        return Ok();
    }
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Remove(int id)
    {
        await saveStudyFieldGroupService.Delete(id);
        return Ok();
    }
}