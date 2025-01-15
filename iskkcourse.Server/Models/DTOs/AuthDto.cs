namespace ISKKCourse.Server.Models.DTOs
{
    public record AuthDto(bool IsAuthenticated, string? Message, string? Id="", string? UserName = "", string? Email = "", string? Role = "");
}
