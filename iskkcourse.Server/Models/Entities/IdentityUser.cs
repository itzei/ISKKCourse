using System.ComponentModel.DataAnnotations;

namespace ISKKCourse.Server.Models.Entities
{
    public class IdentityUser(string userName, string email, string phoneNumber) : Entity<string>
    {
        [MaxLength(9)] public string UserName { get; private set; } = userName;
        [MaxLength(10)] public string Email { get; private set; } = email;
        [MaxLength(12)] public string PhoneNumber { get; private set; } = phoneNumber;
        public List<User> Users { get; } = [];

        public void SetValues(string userName, string email, string phoneNumber) => (UserName, Email, PhoneNumber) = (userName, email, phoneNumber);
    }
}
