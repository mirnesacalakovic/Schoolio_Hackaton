using SchoolioBackend.Data;
using Microsoft.EntityFrameworkCore;
using SchoolioBackend.Interface;
using SchoolioBackend.Models;

namespace SchoolioBackend.Service
{
    public class ActivityMapService : IActivityMapService
    {
        private readonly SchoolioDbContext _context;

        public ActivityMapService(SchoolioDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ActivityMap>> GetAllActivitiesAsync()
        {
            return await _context.ActivityMaps.ToListAsync();
        }

        public async Task<ActivityMap> GetActivityByIdAsync(Guid id)
        {
            return await _context.ActivityMaps.FindAsync(id);
        }

        public async Task<ActivityMap> CreateActivityAsync(ActivityMap activity)
        {
            _context.ActivityMaps.Add(activity);
            await _context.SaveChangesAsync();
            return activity;
        }

        public async Task<bool> DeleteActivityAsync(Guid id)
        {
            var activity = await _context.ActivityMaps.FindAsync(id);
            if (activity == null) return false;

            _context.ActivityMaps.Remove(activity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

