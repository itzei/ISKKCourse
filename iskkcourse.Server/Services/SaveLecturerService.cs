using ISKKCourse.Server.Data;
using ISKKCourse.Server.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using ISKKCourse.Server.Models.Entities;

namespace ISKKCourse.Server.Services
{
    public class SaveLecturerService(AppDbContext context) : ISaveLecturerService
    {
        public async Task Store(LecturerDto dto)
        {
            var lecturer = new Lecturer(dto.FirstName, dto.LastName, dto.Email, dto.PhoneNumber);
            context.Lecturers.Add(lecturer);
            await context.SaveChangesAsync();
        }

        public async Task Update(int id, LecturerDto dto)
        {
            var lecturer = await context.Lecturers.FirstOrDefaultAsync(i => i.Id == id);
            if (lecturer != null)
            {
                lecturer.SetValues(dto.FirstName, dto.LastName, dto.Email, dto.PhoneNumber);
                context.Lecturers.Update(lecturer);
                await context.SaveChangesAsync();
            }
        }
        public async Task Delete(int id)
        {
            var lecturer = await context.Lecturers.FindAsync(id);
            if (lecturer != null)
            {
                context.Lecturers.Remove(lecturer);
                await context.SaveChangesAsync();
            }
        }
    }
}
