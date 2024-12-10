namespace SchoolioBackend.Models
{
    public class ParentForum
    {
        public Guid Id { get; set; }
        public string Topic { get; set; }
        public string Description { get; set; }
        public List<ForumPost> Posts { get; set; }
    }
}
