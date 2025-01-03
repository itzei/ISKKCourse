using ISKKCourse.Server.Data;
using ISKKCourse.Server.Models.DTOs;
using ISKKCourse.Server.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace ISKKCourse.Server.Services
{
    public class GetStudyFieldGroupService(AppDbContext context) : IGetStudyFieldGroupService
    {
        public async Task<List<StudyFieldGroupDto>> GetAll()
        {
            var programs = await context.StudyFieldGroups
                .ToListAsync();
            List<StudyFieldGroupDto> results = [];

            foreach (var program in programs)
            {
                results.Add(MapDto(program));
            }
            return results;
        }

        public async Task<StudyFieldGroupDto> Get(int id)
        {
            var program = await context.StudyFieldGroups
                .FirstOrDefaultAsync(i => i.Id == id);
            return MapDto(program);
        }

        private StudyFieldGroupDto MapDto(StudyFieldGroup program) => new StudyFieldGroupDto(program.Id, program.Title);
    }
}
