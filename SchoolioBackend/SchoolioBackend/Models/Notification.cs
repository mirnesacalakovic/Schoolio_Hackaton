namespace SchoolioBackend.Models
{
    public class Notification
    {
        public Guid Id { get; set; }

        // Povezano sa korisnikom koji prima notifikaciju
        public Guid UserId { get; set; }
        public User User { get; set; }

        public string Message { get; set; }
        public bool IsRead { get; set; }
        public DateTime CreatedAt { get; set; }

        // Opcionalno: poveži notifikaciju sa entitetom (npr. LostAndFound)
        public Guid? RelatedEntityId { get; set; }
        public string RelatedEntityType { get; set; } // Npr. "LostAndFound", "Material", itd.

    }
}

