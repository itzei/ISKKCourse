using ISKKCourse.Server.Models.DTOs;

namespace ISKKCourse.Server.Services
{
    public interface ISaveGroupService
    {
        Task Store(GroupDto dto);
        Task Update(int id, GroupDto dto);
        Task Delete(int id);
    }
}
