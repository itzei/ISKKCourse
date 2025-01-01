using ISKKCourse.Server.Models.DTOs;

namespace ISKKCourse.Server.Services
{
    public interface ISaveLecturerService
    {
        Task Store(LecturerDto dto);
        Task Update(int id, LecturerDto dto);
        Task Delete(int id);
    }
}
