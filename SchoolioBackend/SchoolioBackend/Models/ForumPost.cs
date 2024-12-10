namespace SchoolioBackend.Models
{
    public class ForumPost
    {
        public Guid Id { get; set; }

        // Povezano sa User modelom
        public Guid AuthorId { get; set; }
        public User Author { get; set; }

        public string Content { get; set; }
        public DateTime PostDate { get; set; }
    }
}
