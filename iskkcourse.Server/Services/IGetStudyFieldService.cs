using ISKKCourse.Server.Models.DTOs;

namespace ISKKCourse.Server.Services
{
    public interface IGetStudyFieldService
    {
        Task<List<StudyFieldDto>> GetAll();
        Task<StudyFieldDto> Get(int id);
    }
}
