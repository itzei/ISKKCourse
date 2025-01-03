using ISKKCourse.Server.Data;
using ISKKCourse.Server.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using ISKKCourse.Server.Models.Entities;

namespace ISKKCourse.Server.Services
{
    public class SaveStudyFieldGroupService(AppDbContext context) : ISaveStudyFieldGroupService
    {
        public async Task Store(StudyFieldGroupDto dto)
        {
            var program = new StudyFieldGroup(dto.Title);
            context.StudyFieldGroups.Add(program);
            await context.SaveChangesAsync();
        }

        public async Task Update(int id, StudyFieldGroupDto dto)
        {
            var program = await context.StudyFieldGroups.FirstOrDefaultAsync(i => i.Id == id);
            if (program != null)
            {
                program.SetValues(dto.Title);
                context.StudyFieldGroups.Update(program);
                await context.SaveChangesAsync();
            }
        }
        public async Task Delete(int id)
        {
            var program = await context.StudyFieldGroups.FindAsync(id);
            if (program != null)
            {
                context.StudyFieldGroups.Remove(program);
                await context.SaveChangesAsync();
            }
        }
    }
}
