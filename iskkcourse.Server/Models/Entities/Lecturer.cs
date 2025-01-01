using System.ComponentModel.DataAnnotations;

namespace ISKKCourse.Server.Models.Entities
{
    public class Lecturer(string firstName, string lastName, string email, double phoneNumber) : Entity<int>
    {
        [MaxLength(30)] public string FirstName { get; private set; } = firstName;
        [MaxLength(30)] public string LastName { get; private set; } = lastName;
        [MaxLength(40)] public string Email { get; private set; } = email;
        [MaxLength(20)] public double PhoneNumber { get; private set; } = phoneNumber;

        public void SetValues(string firstName, string lastName, string email, double phoneNumber) => (FirstName, LastName, Email, PhoneNumber) = (firstName, lastName, email, phoneNumber);
    }
}
