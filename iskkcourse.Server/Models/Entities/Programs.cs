using System.ComponentModel.DataAnnotations;

namespace ISKKCourse.Server.Models.Entities
{
    public class Programs(string institution, string studyField, string city, string programTitle, int credits, string description) : Entity<int>
    {
        [MaxLength(50)] public string Institution { get; private set; } = institution;
        [MaxLength(50)] public string StudyField { get; private set; } = studyField;
        [MaxLength (50)] public string City { get; private set; } = city;
        [MaxLength(50)] public string ProgramTitle { get; private set; } = programTitle;
        [MaxLength(3)] public int Credits { get; private set; } = credits;
        [MaxLength(1000)] public string Description { get; private set; } = description;

        public void SetValues(string institution, string studyField, string city, string programTitle, int credits, string description) => (Institution, StudyField, City, ProgramTitle, Credits, Description) = (institution, studyField, city, programTitle, credits, description);
    }
}
