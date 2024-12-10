using Microsoft.AspNetCore.Mvc;
using SchoolioBackend.Interface;
using SchoolioBackend.Models;

namespace SchoolioBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivityMapController : ControllerBase
    {
        private readonly IActivityMapService _activityService;

        public ActivityMapController(IActivityMapService activityService)
        {
            _activityService = activityService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllActivities()
        {
            var activities = await _activityService.GetAllActivitiesAsync();
            return Ok(activities);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivityById(Guid id)
        {
            var activity = await _activityService.GetActivityByIdAsync(id);
            if (activity == null) return NotFound();
            return Ok(activity);
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity([FromBody] ActivityMap activity)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var createdActivity = await _activityService.CreateActivityAsync(activity);
            return CreatedAtAction(nameof(GetActivityById), new { id = createdActivity.Id }, createdActivity);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            var deleted = await _activityService.DeleteActivityAsync(id);
            if (!deleted) return NotFound();

            return NoContent();
        }
    }
}
