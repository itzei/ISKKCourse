using ISKKCourse.Server.Models.DTOs;

namespace ISKKCourse.Server.Services
{
    public interface ISaveStudyFieldGroupService
    {
        Task Store(StudyFieldGroupDto dto);
        Task Update(int id, StudyFieldGroupDto dto);
        Task Delete(int id);
    }
}
