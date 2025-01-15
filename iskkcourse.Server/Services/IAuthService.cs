using ISKKCourse.Server.Models.DTOs;

namespace ISKKCourse.Server.Services
{
    public interface IAuthService
    {
        Task<(int, string)> Registration(RegistrationDto model);
        Task<(int, AuthDto)> Login(LoginDto model, HttpContext httpContext);
        AuthDto CheckSession(HttpContext httpContext);
        Task<AuthDto> Logout(HttpContext httpContext);
    }
}
