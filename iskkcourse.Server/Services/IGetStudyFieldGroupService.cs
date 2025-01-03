using ISKKCourse.Server.Models.DTOs;

namespace ISKKCourse.Server.Services
{
    public interface IGetStudyFieldGroupService
    {
        Task<List<StudyFieldGroupDto>> GetAll();
        Task<StudyFieldGroupDto> Get(int id);
    }
}
