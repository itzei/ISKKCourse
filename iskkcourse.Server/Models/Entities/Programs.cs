using System.ComponentModel.DataAnnotations;

namespace ISKKCourse.Server.Models.Entities
{
    public class Programs(string studyTitle, int credits, string description) : Entity<int>
    {
        [MaxLength(50)] public string StudyTitle { get; private set; } = studyTitle;
        [MaxLength(3)] public int Credits { get; private set; } = credits;
        [MaxLength(1000)] public string Description { get; private set; } = description;
        public List<Subject> Subjects { get; } = [];

        public void SetValues(string studyTitle, int credits, string description) => (StudyTitle, Credits, Description) = (studyTitle, credits, description);
    }
}
