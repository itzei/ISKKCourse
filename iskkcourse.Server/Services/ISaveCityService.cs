using ISKKCourse.Server.Models.DTOs;

namespace ISKKCourse.Server.Services
{
    public interface ISaveCityService
    {
        Task Store(CityDto dto);
        Task Update(int id, CityDto dto);
        Task Delete(int id);
    }
}
