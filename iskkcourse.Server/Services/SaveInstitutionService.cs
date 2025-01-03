using ISKKCourse.Server.Data;
using ISKKCourse.Server.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using ISKKCourse.Server.Models.Entities;

namespace ISKKCourse.Server.Services
{
    public class SaveInstitutionService(AppDbContext context) : ISaveInstitutionService
    {
        public async Task Store(InstitutionDto dto)
        {
            var program = new Institution(dto.Title);
            context.Institutions.Add(program);
            await context.SaveChangesAsync();
        }

        public async Task Update(int id, InstitutionDto dto)
        {
            var program = await context.Institutions.FirstOrDefaultAsync(i => i.Id == id);
            if (program != null)
            {
                program.SetValues(dto.Title);
                context.Institutions.Update(program);
                await context.SaveChangesAsync();
            }
        }
        public async Task Delete(int id)
        {
            var program = await context.Institutions.FindAsync(id);
            if (program != null)
            {
                context.Institutions.Remove(program);
                await context.SaveChangesAsync();
            }
        }
    }
}
