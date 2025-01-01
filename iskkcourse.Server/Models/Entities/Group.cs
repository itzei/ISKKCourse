using System.ComponentModel.DataAnnotations;

namespace ISKKCourse.Server.Models.Entities
{
    public class Group(string studyProgram, string groupTitle) : Entity<int>
    {
        [MaxLength(50)] public string StudyProgram { get; private set; } = studyProgram;
        [MaxLength(50)] public string GroupTitle { get; private set; } = groupTitle;

        public void SetValues(string studyProgram, string groupTitle) => (StudyProgram, GroupTitle) = (studyProgram, groupTitle);
    }
}
