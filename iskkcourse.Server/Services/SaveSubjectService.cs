using ISKKCourse.Server.Data;
using ISKKCourse.Server.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using ISKKCourse.Server.Models.Entities;

namespace ISKKCourse.Server.Services
{
    public class SaveSubjectService(AppDbContext context) : ISaveSubjectService
    {
        public async Task Store(SubjectDto dto)
        {
            var subject = new Subject(dto.StudyProgram, dto.SubjectTitle);
            context.Subjects.Add(subject);
            await context.SaveChangesAsync();
        }

        public async Task Update(int id, SubjectDto dto)
        {
            var subject = await context.Subjects.FirstOrDefaultAsync(i => i.Id == id);
            if (subject != null)
            {
                subject.SetValues(dto.StudyProgram, dto.SubjectTitle);
                context.Subjects.Update(subject);
                await context.SaveChangesAsync();
            }
        }
        public async Task Delete(int id)
        {
            var subject = await context.Subjects.FindAsync(id);
            if (subject != null)
            {
                context.Subjects.Remove(subject);
                await context.SaveChangesAsync();
            }
        }
    }
}
