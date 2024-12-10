namespace SchoolioBackend.Models
{
    public class PrivateTutor
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string Subject { get; set; }
        public string ProfileDescription { get; set; }
        public List<string> Reviews { get; set; }
        public List<string> ContactInfo { get; set; }
    }
}
