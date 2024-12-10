namespace SchoolioBackend.Models
{
    public class Material
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        // Povezano sa User modelom
        public Guid UploaderId { get; set; }
        public User Uploader { get; set; }

        public DateTime UploadDate { get; set; }
        public MaterialType MaterialType { get; set; }
    }

    public enum MaterialType
    {
        Lektira,
        DomaciZadatak,
        Test,
        Takmicenje
    }
}
