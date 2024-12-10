using SchoolioBackend.Data;
using SchoolioBackend.Interface;
using SchoolioBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace SchoolioBackend.Service
{
    public class NotificationService : INotificationService
    {
        private readonly SchoolioDbContext _dbContext;

        public NotificationService(SchoolioDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // Kreiranje obaveštenja
        public async Task<Notification> CreateNotificationAsync(Guid userId, string message, Guid? relatedEntityId = null, string relatedEntityType = null)
        {
            var notification = new Notification
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                Message = message,
                IsRead = false,
                CreatedAt = DateTime.UtcNow,
                RelatedEntityId = relatedEntityId,
                RelatedEntityType = relatedEntityType
            };

            _dbContext.Notifications.Add(notification);
            await _dbContext.SaveChangesAsync();

            return notification;
        }

        // Dohvatanje svih obaveštenja za korisnika
        public async Task<IEnumerable<Notification>> GetNotificationsForUserAsync(Guid userId)
        {
            return await _dbContext.Notifications
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();
        }

        // Obeležavanje obaveštenja kao pročitanog
        public async Task MarkAsReadAsync(Guid notificationId)
        {
            var notification = await _dbContext.Notifications.FindAsync(notificationId);
            if (notification != null)
            {
                notification.IsRead = true;
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
