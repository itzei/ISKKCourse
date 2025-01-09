using ISKKCourse.Server.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Hosting;

namespace ISKKCourse.Server.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : IdentityDbContext(options)
    {
        public DbSet<Programs> Programs { get; set; }
        public DbSet<StudyFieldGroup> StudyFieldGroups { get; set; }
        public DbSet<StudyField> StudyFields { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Institution> Institutions { get; set; }
        public DbSet<User> User {  get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            builder.ConfigureWarnings(warnings => warnings.Ignore(CoreEventId.NavigationBaseIncludeIgnored, CoreEventId.NavigationBaseIncluded));
        }
    }
}