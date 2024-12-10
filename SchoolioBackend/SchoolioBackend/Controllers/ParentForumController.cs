using Microsoft.AspNetCore.Mvc;
using SchoolioBackend.Interface;
using SchoolioBackend.Models;

namespace SchoolioBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ParentForumController : ControllerBase
    {
        private readonly IParentForumService _forumService;

        public ParentForumController(IParentForumService forumService)
        {
            _forumService = forumService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllForums()
        {
            var forums = await _forumService.GetAllForumsAsync();
            return Ok(forums);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetForumById(Guid id)
        {
            var forum = await _forumService.GetForumByIdAsync(id);
            if (forum == null) return NotFound();
            return Ok(forum);
        }

        [HttpPost]
        public async Task<IActionResult> CreateForum([FromBody] ParentForum forum)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var createdForum = await _forumService.CreateForumAsync(forum);
            return CreatedAtAction(nameof(GetForumById), new { id = createdForum.Id }, createdForum);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteForum(Guid id)
        {
            var deleted = await _forumService.DeleteForumAsync(id);
            if (!deleted) return NotFound();

            return NoContent();
        }

        [HttpPost("{forumId}/posts")]
        public async Task<IActionResult> AddPostToForum(Guid forumId, [FromBody] ForumPost post)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var createdPost = await _forumService.AddPostToForumAsync(forumId, post);
            if (createdPost == null) return NotFound();

            return Ok(createdPost);
        }

        [HttpDelete("{forumId}/posts/{postId}")]
        public async Task<IActionResult> DeletePost(Guid forumId, Guid postId)
        {
            var deleted = await _forumService.DeletePostAsync(forumId, postId);
            if (!deleted) return NotFound();

            return NoContent();
        }
    }
}

