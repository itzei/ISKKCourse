using ISKKCourse.Server.Models.DTOs;

namespace ISKKCourse.Server.Services
{
    public interface IGetProgramService
    {
        Task<List<ProgramDto>> GetAll();
        Task<ProgramDto> Get(int id);
    }
}
