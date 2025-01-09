using System.ComponentModel.DataAnnotations;

namespace ISKKCourse.Server.Models.Entities
{
    public class User(string firstName, string lastName, double phoneNumber) : Entity<int>
    {
        [MaxLength(15)] public string FirstName { get; private set; } = firstName;
        [MaxLength(20)] public string LastName { get; private set; } = lastName;
        [MaxLength(12)] public double PhoneNumber { get; private set; } = phoneNumber;
        public List<Microsoft.AspNetCore.Identity.IdentityUser> Users { get; } = [];

        public void SetValues(string firstName, string lastName, double phoneNumber) => (FirstName, LastName, PhoneNumber) = (firstName, lastName, phoneNumber);
    }
}
