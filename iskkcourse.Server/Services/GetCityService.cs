using ISKKCourse.Server.Data;
using ISKKCourse.Server.Models.DTOs;
using ISKKCourse.Server.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace ISKKCourse.Server.Services
{
    public class GetCityService(AppDbContext context) : IGetCityService
    {
        public async Task<List<CityDto>> GetAll()
        {
            var programs = await context.Cities
                .ToListAsync();
            List<CityDto> results = [];

            foreach (var program in programs)
            {
                results.Add(MapDto(program));
            }
            return results;
        }

        public async Task<CityDto> Get(int id)
        {
            var program = await context.Cities
                .FirstOrDefaultAsync(i => i.Id == id);
            return MapDto(program);
        }

        private CityDto MapDto(City program) => new CityDto(program.Id, program.Title);
    }
}
