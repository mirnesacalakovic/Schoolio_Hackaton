using Microsoft.AspNetCore.Mvc;
using SchoolioBackend.Interface;
using SchoolioBackend.Models;

namespace SchoolioBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        // Registracija korisnika
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationDto registrationDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (registrationDto.Role == UserRole.Parent && string.IsNullOrEmpty(registrationDto.ChildName))
            {
                return BadRequest("Child name is required for parents.");
            }

            var user = new User
            {
                FullName = registrationDto.FullName,
                Email = registrationDto.Email,
                Role = registrationDto.Role,
                Address = registrationDto.Address,
                PhoneNumber = registrationDto.PhoneNumber,
                ChildName = registrationDto.Role == UserRole.Parent ? registrationDto.ChildName : null
            };

            var createdUser = await _userService.RegisterUserAsync(user, registrationDto.Password);
            return CreatedAtAction(nameof(Register), new { id = createdUser.Id }, createdUser);
        }


        // Prijava korisnika
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto loginDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = await _userService.AuthenticateUserAsync(loginDto.Email, loginDto.Password);
            if (user == null) return Unauthorized();

            var token = await _userService.GenerateJwtTokenAsync(user);
            return Ok(new { Token = token });
        }
    }

    // DTO za registraciju
    public class UserRegistrationDto
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public UserRole Role { get; set; }
        public string? ChildName { get; set; }

        public string Address { get; set; }  
        public string PhoneNumber { get; set; }  
    }

    // DTO za prijavu
    public class UserLoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
