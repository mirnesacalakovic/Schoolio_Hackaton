using SchoolioBackend.Data;
using SchoolioBackend.Interface;
using SchoolioBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace SchoolioBackend.Service
{
    public class ParentForumService : IParentForumService
    {
        private readonly SchoolioDbContext _context;

        public ParentForumService(SchoolioDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ParentForum>> GetAllForumsAsync()
        {
            return await _context.ParentForums.Include(pf => pf.Posts).ToListAsync();
        }

        public async Task<ParentForum> GetForumByIdAsync(Guid id)
        {
            return await _context.ParentForums
                .Include(pf => pf.Posts)
                .FirstOrDefaultAsync(pf => pf.Id == id);
        }

        public async Task<ParentForum> CreateForumAsync(ParentForum forum)
        {
            _context.ParentForums.Add(forum);
            await _context.SaveChangesAsync();
            return forum;
        }

        public async Task<bool> DeleteForumAsync(Guid id)
        {
            var forum = await _context.ParentForums.FindAsync(id);
            if (forum == null) return false;

            _context.ParentForums.Remove(forum);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<ForumPost> AddPostToForumAsync(Guid forumId, ForumPost post)
        {
            var forum = await _context.ParentForums.FindAsync(forumId);
            if (forum == null) return null;

            post.Id = Guid.NewGuid();
            forum.Posts.Add(post);

            await _context.SaveChangesAsync();
            return post;
        }

        public async Task<bool> DeletePostAsync(Guid forumId, Guid postId)
        {
            var forum = await _context.ParentForums
                .Include(pf => pf.Posts)
                .FirstOrDefaultAsync(pf => pf.Id == forumId);

            if (forum == null) return false;

            var post = forum.Posts.FirstOrDefault(p => p.Id == postId);
            if (post == null) return false;

            forum.Posts.Remove(post);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}