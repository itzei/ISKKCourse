using ISKKCourse.Server.Data;
using ISKKCourse.Server.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using ISKKCourse.Server.Models.Entities;

namespace ISKKCourse.Server.Services
{
    public class SaveCityService(AppDbContext context) : ISaveCityService
    {
        public async Task Store(CityDto dto)
        {
            var program = new City(dto.Title);
            context.Cities.Add(program);
            await context.SaveChangesAsync();
        }

        public async Task Update(int id, CityDto dto)
        {
            var program = await context.Cities.FirstOrDefaultAsync(i => i.Id == id);
            if (program != null)
            {
                program.SetValues(dto.Title);
                context.Cities.Update(program);
                await context.SaveChangesAsync();
            }
        }
        public async Task Delete(int id)
        {
            var program = await context.Cities.FindAsync(id);
            if (program != null)
            {
                context.Cities.Remove(program);
                await context.SaveChangesAsync();
            }
        }
    }
}
