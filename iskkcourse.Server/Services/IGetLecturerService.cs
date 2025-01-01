using ISKKCourse.Server.Models.DTOs;

namespace ISKKCourse.Server.Services
{
    public interface IGetLecturerService
    {
        Task<List<LecturerDto>> GetAll();
        Task<LecturerDto> Get(int id);
    }
}
