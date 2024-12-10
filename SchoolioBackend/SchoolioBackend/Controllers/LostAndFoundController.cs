using Microsoft.AspNetCore.Mvc;
using SchoolioBackend.Interface;
using SchoolioBackend.Models;

namespace SchoolioBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LostAndFoundController : ControllerBase
    {
        private readonly ILostAndFoundService _lostAndFoundService;

        public LostAndFoundController(ILostAndFoundService lostAndFoundService)
        {
            _lostAndFoundService = lostAndFoundService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllItems()
        {
            var items = await _lostAndFoundService.GetAllItemsAsync();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetItemById(Guid id)
        {
            var item = await _lostAndFoundService.GetItemByIdAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> ReportLostItem([FromBody] LostAndFound item)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var reportedItem = await _lostAndFoundService.ReportLostItemAsync(item);
            return CreatedAtAction(nameof(GetItemById), new { id = reportedItem.Id }, reportedItem);
        }

        [HttpPatch("{id}/resolve")]
        public async Task<IActionResult> MarkItemAsResolved(Guid id)
        {
            var resolved = await _lostAndFoundService.MarkItemAsResolvedAsync(id);
            if (!resolved) return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(Guid id)
        {
            var deleted = await _lostAndFoundService.DeleteItemAsync(id);
            if (!deleted) return NotFound();

            return NoContent();
        }
    }
}
