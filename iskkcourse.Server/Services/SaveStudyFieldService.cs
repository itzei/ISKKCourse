using ISKKCourse.Server.Data;
using ISKKCourse.Server.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using ISKKCourse.Server.Models.Entities;

namespace ISKKCourse.Server.Services
{
    public class SaveStudyFieldService(AppDbContext context) : ISaveStudyFieldService
    {
        public async Task Store(StudyFieldDto dto)
        {
            var program = new StudyField(dto.Title);
            context.StudyFields.Add(program);
            await context.SaveChangesAsync();
        }

        public async Task Update(int id, StudyFieldDto dto)
        {
            var program = await context.StudyFields.FirstOrDefaultAsync(i => i.Id == id);
            if (program != null)
            {
                program.SetValues(dto.Title);
                context.StudyFields.Update(program);
                await context.SaveChangesAsync();
            }
        }
        public async Task Delete(int id)
        {
            var program = await context.StudyFields.FindAsync(id);
            if (program != null)
            {
                context.StudyFields.Remove(program);
                await context.SaveChangesAsync();
            }
        }
    }
}
