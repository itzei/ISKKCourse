using ISKKCourse.Server.Models.DTOs;

namespace ISKKCourse.Server.Services
{
    public interface IGetCityService
    {
        Task<List<CityDto>> GetAll();
        Task<CityDto> Get(int id);
    }
}
