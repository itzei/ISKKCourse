using ISKKCourse.Server.Data;
using ISKKCourse.Server.Models.DTOs;
using ISKKCourse.Server.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace ISKKCourse.Server.Services
{
    public class GetSubjectService(AppDbContext context) : IGetSubjectService
    {
        public async Task<List<SubjectDto>> GetAll()
        {
            var subjects = await context.Subjects.ToListAsync();
            List<SubjectDto> results = [];

            foreach (var group in subjects)
            {
                results.Add(MapDto(group));
            }
            return results;
        }

        public async Task<SubjectDto> Get(int id)
        {
            var group = await context.Subjects.FirstOrDefaultAsync(i => i.Id == id);
            return MapDto(group);
        }

        private SubjectDto MapDto(Subject group) => new SubjectDto(group.Id, group.StudyProgram, group.SubjectTitle);
    }
}
