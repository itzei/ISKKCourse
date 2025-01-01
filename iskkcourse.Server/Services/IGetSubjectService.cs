using ISKKCourse.Server.Models.DTOs;

namespace ISKKCourse.Server.Services
{
    public interface IGetSubjectService
    {
        Task<List<SubjectDto>> GetAll();
        Task<SubjectDto> Get(int id);
    }
}
