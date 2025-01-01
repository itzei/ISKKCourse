using ISKKCourse.Server.Models.DTOs;

namespace ISKKCourse.Server.Services
{
    public interface ISaveSubjectService
    {
        Task Store(SubjectDto dto);
        Task Update(int id, SubjectDto dto);
        Task Delete(int id);
    }
}
