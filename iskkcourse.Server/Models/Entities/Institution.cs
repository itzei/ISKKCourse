using System.ComponentModel.DataAnnotations;

namespace ISKKCourse.Server.Models.Entities
{
    public class Institution(string title): Entity<int>
    {
        [MaxLength(50)] public string Title { get; private set; } = title;

        public void SetValues(string title) => (Title) = (title);
    }
}
