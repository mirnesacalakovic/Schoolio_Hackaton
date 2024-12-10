using SchoolioBackend.Models;

namespace SchoolioBackend.Interface
{
    public interface ILostAndFoundService
    {
        Task<IEnumerable<LostAndFound>> GetAllItemsAsync();
        Task<LostAndFound> GetItemByIdAsync(Guid id);
        Task<LostAndFound> ReportLostItemAsync(LostAndFound item);
        Task<bool> MarkItemAsResolvedAsync(Guid id);
        Task<bool> DeleteItemAsync(Guid id);
    }

}
