using Microsoft.AspNetCore.Mvc;
using SchoolioBackend.Interface;

namespace SchoolioBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        public NotificationController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        // Endpoint za kreiranje obaveštenja
        [HttpPost("create")]
        public async Task<IActionResult> CreateNotification([FromBody] CreateNotificationDto notificationDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var notification = await _notificationService.CreateNotificationAsync(
                notificationDto.UserId,
                notificationDto.Message,
                notificationDto.RelatedEntityId,
                notificationDto.RelatedEntityType
            );

            return CreatedAtAction(nameof(GetNotifications), new { id = notification.Id }, notification);
        }

        // Endpoint za dobijanje svih obaveštenja za korisnika
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetNotifications(Guid userId)
        {
            var notifications = await _notificationService.GetNotificationsForUserAsync(userId);
            return Ok(notifications);
        }

        // Endpoint za obeležavanje obaveštenja kao pročitanog
        [HttpPut("mark-as-read/{notificationId}")]
        public async Task<IActionResult> MarkAsRead(Guid notificationId)
        {
            await _notificationService.MarkAsReadAsync(notificationId);
            return NoContent();
        }
    }

    // DTO za kreiranje obaveštenja
    public class CreateNotificationDto
    {
        public Guid UserId { get; set; }
        public string Message { get; set; }
        public Guid? RelatedEntityId { get; set; }
        public string RelatedEntityType { get; set; } // Npr. "LostAndFound"
    }
}
