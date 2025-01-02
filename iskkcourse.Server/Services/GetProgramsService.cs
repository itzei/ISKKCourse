using ISKKCourse.Server.Data;
using ISKKCourse.Server.Models.DTOs;
using ISKKCourse.Server.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace ISKKCourse.Server.Services
{
    public class GetProgramService(AppDbContext context) : IGetProgramService
    {
        public async Task<List<ProgramDto>> GetAll()
        {
            var programs = await context.Programs
                .ToListAsync();
            List<ProgramDto> results = [];

            foreach (var program in programs)
            {
                results.Add(MapDto(program));
            }
            return results;
        }

        public async Task<ProgramDto> Get(int id)
        {
            var program = await context.Programs
                .FirstOrDefaultAsync(i => i.Id == id);
            return MapDto(program);
        }

        private ProgramDto MapDto(Programs program) => new ProgramDto(program.Id, program.Institution, program.StudyField, program.City, program.ProgramTitle, program.Credits, program.Description);
    }
}
