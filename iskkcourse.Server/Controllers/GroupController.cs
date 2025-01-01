using ISKKCourse.Server.Models.DTOs;
using ISKKCourse.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace ISKKCourse.Server.Controllers;

[ApiController]
[Route("api/[controller]")]

public class GroupController(IGetGroupService getGroupService, ISaveGroupService saveGroupService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var results = await getGroupService.GetAll();
        return Ok(results);
    }
    [HttpPut("{id:int}")]

    public async Task<IActionResult> Put(int id, GroupDto dto)
    {
        await saveGroupService.Update(id, dto);
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> Create(GroupDto dto)
    {
        await saveGroupService.Store(dto);
        return Ok();
    }
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Remove(int id)
    {
        await saveGroupService.Delete(id);
        return Ok();
    }
}