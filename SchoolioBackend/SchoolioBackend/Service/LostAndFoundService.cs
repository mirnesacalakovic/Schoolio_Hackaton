using SchoolioBackend.Data;
using Microsoft.EntityFrameworkCore;
using SchoolioBackend.Models;
using SchoolioBackend.Interface;

namespace SchoolioBackend.Service
{
    public class LostAndFoundService : ILostAndFoundService
    {
        private readonly SchoolioDbContext _context;
        private readonly INotificationService _notificationService;

        public LostAndFoundService(SchoolioDbContext context, INotificationService notificationService)
        {
            _context = context;
            _notificationService = notificationService;
        }

        public async Task<IEnumerable<LostAndFound>> GetAllItemsAsync()
        {
            return await _context.LostAndFoundItems.ToListAsync();
        }

        public async Task<LostAndFound> GetItemByIdAsync(Guid id)
        {
            return await _context.LostAndFoundItems.FindAsync(id);
        }

        public async Task<LostAndFound> ReportLostItemAsync(LostAndFound item)
        {
            _context.LostAndFoundItems.Add(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<bool> MarkItemAsResolvedAsync(Guid id)
        {
            var item = await _context.LostAndFoundItems.FindAsync(id);
            if (item == null) return false;

            item.IsResolved = true;
            await _context.SaveChangesAsync();

            // Obavesti korisnika koji je prijavio predmet
            await _notificationService.CreateNotificationAsync(
                item.ReporterId,
                $"Your lost item '{item.ItemName}' has been found.",
                item.Id, // RelatedEntityId
                "LostAndFound" // RelatedEntityType
            );

            return true;
        }

        public async Task<bool> DeleteItemAsync(Guid id)
        {
            var item = await _context.LostAndFoundItems.FindAsync(id);
            if (item == null) return false;

            _context.LostAndFoundItems.Remove(item);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
