using ISKKCourse.Server.Data;
using ISKKCourse.Server.Models.DTOs;
using ISKKCourse.Server.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace ISKKCourse.Server.Services
{
    public class GetStudyFieldService(AppDbContext context) : IGetStudyFieldService
    {
        public async Task<List<StudyFieldDto>> GetAll()
        {
            var programs = await context.StudyFields
                .ToListAsync();
            List<StudyFieldDto> results = [];

            foreach (var program in programs)
            {
                results.Add(MapDto(program));
            }
            return results;
        }

        public async Task<StudyFieldDto> Get(int id)
        {
            var program = await context.StudyFields
                .FirstOrDefaultAsync(i => i.Id == id);
            return MapDto(program);
        }

        private StudyFieldDto MapDto(StudyField program) => new StudyFieldDto(program.Id, program.Title);
    }
}
