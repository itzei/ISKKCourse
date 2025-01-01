using System.ComponentModel.DataAnnotations;

namespace ISKKCourse.Server.Models.Entities
{
    public class Subject(string studyProgram, string subjectTitle) : Entity<int>
    {
        [MaxLength(50)] public string StudyProgram { get; private set; } = studyProgram;
        [MaxLength(5000)] public string SubjectTitle { get; private set; } = subjectTitle;
        public List<Programs> Programs { get; } = [];

        public void SetValues(string studyProgram, string subjectTitle) => (StudyProgram, SubjectTitle) = (studyProgram, subjectTitle);
    }
}
