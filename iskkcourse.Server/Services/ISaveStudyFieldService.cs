using ISKKCourse.Server.Models.DTOs;

namespace ISKKCourse.Server.Services
{
    public interface ISaveStudyFieldService
    {
        Task Store(StudyFieldDto dto);
        Task Update(int id, StudyFieldDto dto);
        Task Delete(int id);
    }
}
