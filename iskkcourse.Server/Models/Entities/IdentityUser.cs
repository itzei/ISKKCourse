using System.ComponentModel.DataAnnotations;

namespace ISKKCourse.Server.Models.Entities
{
    public class IdentityUser(string userName, string email) : Entity<int>
    {
        [MaxLength(9)] public string UserName { get; private set; } = userName;
        [MaxLength(10)] public string Email { get; private set; } = email;

        public void SetValues(string userName, string email) => (UserName, Email) = (userName, email);
    }
}
