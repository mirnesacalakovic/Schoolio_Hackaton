namespace SchoolioBackend.Models
{
    public class ActivityMap
    {
        public Guid Id { get; set; }
        public string ActivityName { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public List<string> Reviews { get; set; }
        public string ContactInfo { get; set; }
    }
}
