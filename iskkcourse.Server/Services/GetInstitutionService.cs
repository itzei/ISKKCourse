using ISKKCourse.Server.Data;
using ISKKCourse.Server.Models.DTOs;
using ISKKCourse.Server.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace ISKKCourse.Server.Services
{
    public class GetInstitutionService(AppDbContext context) : IGetInstitutionService
    {
        public async Task<List<InstitutionDto>> GetAll()
        {
            var programs = await context.Institutions
                .ToListAsync();
            List<InstitutionDto> results = [];

            foreach (var program in programs)
            {
                results.Add(MapDto(program));
            }
            return results;
        }

        public async Task<InstitutionDto> Get(int id)
        {
            var program = await context.Institutions
                .FirstOrDefaultAsync(i => i.Id == id);
            return MapDto(program);
        }

        private InstitutionDto MapDto(Institution program) => new InstitutionDto(program.Id, program.Title);
    }
}
