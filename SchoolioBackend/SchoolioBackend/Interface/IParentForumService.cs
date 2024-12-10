using SchoolioBackend.Models;

namespace SchoolioBackend.Interface
{
    public interface IParentForumService
    {
        Task<IEnumerable<ParentForum>> GetAllForumsAsync();
        Task<ParentForum> GetForumByIdAsync(Guid id);
        Task<ParentForum> CreateForumAsync(ParentForum forum);
        Task<bool> DeleteForumAsync(Guid id);
        Task<ForumPost> AddPostToForumAsync(Guid forumId, ForumPost post);
        Task<bool> DeletePostAsync(Guid forumId, Guid postId);
    }

}
