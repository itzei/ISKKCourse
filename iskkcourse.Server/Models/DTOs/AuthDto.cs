namespace ISKKCourse.Server.Models.DTOs
{
    public record AuthDto(string Id, bool IsAuthenticated, string? Message, string? UserName = "", string? Email = "", string? Role = "");
}
