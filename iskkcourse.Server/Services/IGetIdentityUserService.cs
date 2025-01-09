using ISKKCourse.Server.Models.DTOs;

namespace ISKKCourse.Server.Services
{
    public interface IGetIdentityUserService
    {
        Task<List<IdentityUserDto>> GetAll();
        Task<IdentityUserDto> Get(string id);
    }
}
