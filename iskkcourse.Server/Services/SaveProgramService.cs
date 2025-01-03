using ISKKCourse.Server.Data;
using ISKKCourse.Server.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using ISKKCourse.Server.Models.Entities;

namespace ISKKCourse.Server.Services
{
    public class SaveProgramService(AppDbContext context) : ISaveProgramService
    {
        public async Task Store(ProgramDto dto)
        {
            var program = new Programs(dto.StudyFieldGroup, dto.Institution, dto.StudyField, dto.City, dto.ProgramTitle, dto.Credits, dto.Description);
            context.Programs.Add(program);
            await context.SaveChangesAsync();
        }

        public async Task Update(int id, ProgramDto dto)
        {
            var program = await context.Programs.FirstOrDefaultAsync(i => i.Id == id);
            if (program != null)
            {
                program.SetValues(dto.StudyFieldGroup, dto.Institution, dto.StudyField, dto.City, dto.ProgramTitle, dto.Credits, dto.Description);
                context.Programs.Update(program);
                await context.SaveChangesAsync();
            }
        }
        public async Task Delete(int id)
        {
            var program = await context.Programs.FindAsync(id);
            if (program != null)
            {
                context.Programs.Remove(program);
                await context.SaveChangesAsync();
            }
        }
    }
}
