using SchoolioBackend.Models;

namespace SchoolioBackend.Interface
{
    public interface IActivityMapService
    {
        Task<IEnumerable<ActivityMap>> GetAllActivitiesAsync();
        Task<ActivityMap> GetActivityByIdAsync(Guid id);
        Task<ActivityMap> CreateActivityAsync(ActivityMap activity);
        Task<bool> DeleteActivityAsync(Guid id);
    }
}
