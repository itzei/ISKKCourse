using ISKKCourse.Server.Models.DTOs;

namespace ISKKCourse.Server.Services
{
    public interface ISaveInstitutionService
    {
        Task Store(InstitutionDto dto);
        Task Update(int id, InstitutionDto dto);
        Task Delete(int id);
    }
}
