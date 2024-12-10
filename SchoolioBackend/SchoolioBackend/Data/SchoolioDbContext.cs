using Microsoft.EntityFrameworkCore;
using SchoolioBackend.Models;

namespace SchoolioBackend.Data
{
    public class SchoolioDbContext : DbContext
    {
        public SchoolioDbContext(DbContextOptions<SchoolioDbContext> options) : base(options)
        {
        }

        public DbSet<ActivityMap> ActivityMaps { get; set; }
        public DbSet<ForumPost> ForumPosts { get; set; }
        public DbSet<LostAndFound> LostAndFoundItems { get; set; }
        public DbSet<Material> Materials { get; set; }
        public DbSet<ParentForum> ParentForums { get; set; }
        public DbSet<PrivateTutor> PrivateTutors { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuring primary keys
            modelBuilder.Entity<User>().HasKey(u => u.Id);
            modelBuilder.Entity<Material>().HasKey(m => m.Id);
            modelBuilder.Entity<ForumPost>().HasKey(fp => fp.Id);
            modelBuilder.Entity<ParentForum>().HasKey(pf => pf.Id);
            modelBuilder.Entity<ActivityMap>().HasKey(am => am.Id);
            modelBuilder.Entity<LostAndFound>().HasKey(lf => lf.Id);
            modelBuilder.Entity<PrivateTutor>().HasKey(pt => pt.Id);

            // Relationships and constraints (optional)
            modelBuilder.Entity<ParentForum>()
                .HasMany(pf => pf.Posts)
                .WithOne()
                .HasForeignKey(fp => fp.AuthorId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Material>()
                .Property(m => m.MaterialType)
                .HasConversion<string>();

            // Configuring ChildName
            modelBuilder.Entity<User>()
                .Property(u => u.ChildName)
                .IsRequired(false);

            // Seed data (optional)
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = Guid.NewGuid(),
                    FullName = "Administrator",
                    Email = "admin@schoolio.com",
                    PasswordHash = "admin",
                    Role = UserRole.Administrator,
                    Address = "Admin Address",
                    PhoneNumber = "000-000-0000",
                    ChildName = null 
                }
            );
        }

    }
}
