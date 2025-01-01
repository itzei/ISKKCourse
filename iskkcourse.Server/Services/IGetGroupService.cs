using ISKKCourse.Server.Models.DTOs;

namespace ISKKCourse.Server.Services
{
    public interface IGetGroupService
    {
        Task<List<GroupDto>> GetAll();
        Task<GroupDto> Get(int id);
    }
}
