using ISKKCourse.Server.Data;
using ISKKCourse.Server.Models.DTOs;
using ISKKCourse.Server.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace ISKKCourse.Server.Services
{
    public class GetLecturerService(AppDbContext context) : IGetLecturerService
    {
        public async Task<List<LecturerDto>> GetAll()
        {
            var lecturers = await context.Lecturers.ToListAsync();
            List<LecturerDto> results = [];

            foreach (var lecturer in lecturers)
            {
                results.Add(MapDto(lecturer));
            }
            return results;
        }

        public async Task<LecturerDto> Get(int id)
        {
            var lecturer = await context.Lecturers.FirstOrDefaultAsync(i => i.Id == id);
            return MapDto(lecturer);
        }

        private LecturerDto MapDto(Lecturer lecturer) => new LecturerDto(lecturer.Id, lecturer.FirstName, lecturer.LastName, lecturer.Email, lecturer.PhoneNumber);
    }
}
