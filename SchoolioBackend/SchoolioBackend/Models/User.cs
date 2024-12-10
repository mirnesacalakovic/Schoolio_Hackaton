namespace SchoolioBackend.Models
{
    public enum UserRole
    {
        Administrator,
        Teacher,
        Parent,
        Student
    }

    public class User
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public UserRole Role { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string? ChildName { get; set; }
    }
}
