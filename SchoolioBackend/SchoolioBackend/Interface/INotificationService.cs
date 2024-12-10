using SchoolioBackend.Models;

namespace SchoolioBackend.Interface
{
    public interface INotificationService
    {
        Task<Notification> CreateNotificationAsync(Guid userId, string message, Guid? relatedEntityId = null, string relatedEntityType = null);
        Task<IEnumerable<Notification>> GetNotificationsForUserAsync(Guid userId);
        Task MarkAsReadAsync(Guid notificationId);
    }
}
