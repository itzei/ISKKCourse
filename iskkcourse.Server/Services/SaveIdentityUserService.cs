using ISKKCourse.Server.Data;
using ISKKCourse.Server.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using ISKKCourse.Server.Models.Entities;

namespace ISKKCourse.Server.Services
{
    public class SaveIdentityUserService(AppDbContext context) : ISaveIdentityUserService
    {
        public async Task Store(IdentityUserDto dto)
        {
            var identityUser = new Microsoft.AspNetCore.Identity.IdentityUser
            {
                UserName = dto.UserName,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber
            };
            context.Users.Add(identityUser);
            await context.SaveChangesAsync();
        }

        public async Task Update(string id, IdentityUserDto dto)
        {
            var IdentityUsers = await context.Users.FirstOrDefaultAsync(i => i.Id == id);
            if (IdentityUsers != null)
            {
                IdentityUsers.UserName = dto.UserName;
                IdentityUsers.Email = dto.Email;
                IdentityUsers.PhoneNumber = dto.PhoneNumber;
                context.Users.Update(IdentityUsers);
                await context.SaveChangesAsync();
            }
        }
        public async Task Delete(string id)
        {
            var IdentityUser = await context.Users.FindAsync(id);
            if (IdentityUser != null)
            {
                context.Users.Remove(IdentityUser);
                await context.SaveChangesAsync();
            }
        }
    }
}
