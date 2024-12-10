using SchoolioBackend.Models;
using Microsoft.AspNetCore.Http;

namespace SchoolioBackend.Interface
{
    public interface IMaterialService
    {
        // Preuzimanje svih materijala
        Task<IEnumerable<Material>> GetAllMaterialsAsync();

        // Preuzimanje materijala po ID-u
        Task<Material> GetMaterialByIdAsync(Guid id);

        // Unos novog materijala (sa fajlom)
        Task<Material> UploadMaterialAsync(Material material, IFormFile file);

        // Brisanje materijala
        Task<bool> DeleteMaterialAsync(Guid id);
    }
}
