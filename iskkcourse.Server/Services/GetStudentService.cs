﻿using ISKKCourse.Server.Data;
using ISKKCourse.Server.Models.DTOs;
using ISKKCourse.Server.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace ISKKCourse.Server.Services
{
    public class GetStudentService(AppDbContext context) : IGetStudentService
    {
        public async Task<List<StudentDto>> GetAll()
        {
            var students = await context.Students.ToListAsync();
            List<StudentDto> results = [];

            foreach (var student in students)
            {
                results.Add(MapDto(student));
            }
            return results;
        }

        public async Task<StudentDto> Get(int id)
        {
            var student = await context.Students.FirstOrDefaultAsync(i => i.Id == id);
            return MapDto(student);
        }

        private StudentDto MapDto(Student student) => new StudentDto(student.Id, student.FirstName, student.LastName, student.Email);
    }
}
