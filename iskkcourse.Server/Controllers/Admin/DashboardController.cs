using ISKKCourse.Server.Data.Consts;
using ISKKCourse.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ISKKCourse.Server.Controllers.Admin
{

    [ApiController]
    [Route("api/admin/[controller]")]
    [Authorize(Roles = UserRoles.Admin)]

    public class DashboardController(IGetIdentityUserService getIdentityUserService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var results = await getIdentityUserService.GetAll();
            return Ok(results);
        }
    }
}
