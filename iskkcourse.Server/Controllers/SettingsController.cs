using ISKKCourse.Server.Models.DTOs;
using ISKKCourse.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace ISKKCourse.Server.Controllers;

[ApiController]
[Route("api/[controller]")]

public class SettingsController(IGetIdentityUserService getIdentityUserService, ISaveIdentityUserService saveIdentityUserService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var results = await getIdentityUserService.GetAll();
        return Ok(results);
    }
    [HttpPut("{id}")]

    public async Task<IActionResult> Put(string id, IdentityUserDto dto)
    {
        await saveIdentityUserService.Update(id, dto);
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> Create(IdentityUserDto dto)
    {
        await saveIdentityUserService.Store(dto);
        return Ok();
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> Remove(string id)
    {
        await saveIdentityUserService.Delete(id);
        return Ok();
    }
}