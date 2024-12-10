namespace SchoolioBackend.Models
{
    public class LostAndFound
    {
        public Guid Id { get; set; }
        public string ItemName { get; set; }
        public string Description { get; set; }
        public DateTime ReportDate { get; set; }
        public Guid ReporterId { get; set; }
        public bool IsResolved { get; set; }
    }
}
