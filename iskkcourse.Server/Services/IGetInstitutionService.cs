using ISKKCourse.Server.Models.DTOs;

namespace ISKKCourse.Server.Services
{
    public interface IGetInstitutionService
    {
        Task<List<InstitutionDto>> GetAll();
        Task<InstitutionDto> Get(int id);
    }
}
