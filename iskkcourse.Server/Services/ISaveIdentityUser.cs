using ISKKCourse.Server.Models.DTOs;

namespace ISKKCourse.Server.Services
{
    public interface ISaveIdentityUserService
    {
        Task Store(IdentityUserDto dto);
        Task Update(string id, IdentityUserDto dto);
        Task Delete(string id);
    }
}
