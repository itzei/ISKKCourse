using ISKKCourse.Server.Models.DTOs;

namespace ISKKCourse.Server.Services
{
    public interface IGetStudentService
    {
        Task<List<StudentDto>> GetAll();
        Task<StudentDto> Get(int id);
    }
}
