using SchoolioBackend.Models;

namespace SchoolioBackend.Interface
{
    public interface IUserService
    {
        Task<User> RegisterUserAsync(User user, string password);
        Task<User> AuthenticateUserAsync(string email, string password);
        Task<string> GenerateJwtTokenAsync(User user);
    }

}
