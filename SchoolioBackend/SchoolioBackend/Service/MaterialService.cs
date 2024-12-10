using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SchoolioBackend.Data;
using SchoolioBackend.Interface;
using SchoolioBackend.Models;
using System.IO;
using System.Threading.Tasks;

namespace SchoolioBackend.Service
{
    public class MaterialService : IMaterialService
    {
        private readonly SchoolioDbContext _context;

        public MaterialService(SchoolioDbContext context)
        {
            _context = context;
        }

        // Preuzimanje svih materijala
        public async Task<IEnumerable<Material>> GetAllMaterialsAsync()
        {
            return await _context.Materials.Include(m => m.Uploader).ToListAsync();
        }

        // Preuzimanje materijala po ID-u
        public async Task<Material> GetMaterialByIdAsync(Guid id)
        {
            return await _context.Materials.Include(m => m.Uploader).FirstOrDefaultAsync(m => m.Id == id);
        }

        // Unos novog materijala
        public async Task<Material> UploadMaterialAsync(Material material, IFormFile file)
        {
            // Validacija tipa materijala
            if (!Enum.IsDefined(typeof(MaterialType), material.MaterialType))
            {
                throw new Exception("Nepoznat tip materijala");
            }

            var user = await _context.Users.FindAsync(material.UploaderId);
            if (user == null)
            {
                throw new Exception("Korisnik nije pronađen");
            }

            material.UploadDate = DateTime.UtcNow;

            // Upload fajla
            if (file != null)
            {
                var filePath = await SaveFileAsync(file, "materials");
                material.Description = filePath; // Putanja fajla se čuva u opisu
            }

            _context.Materials.Add(material);
            await _context.SaveChangesAsync();
            return material;
        }

        // Brisanje materijala
        public async Task<bool> DeleteMaterialAsync(Guid id)
        {
            var material = await _context.Materials.FindAsync(id);
            if (material == null) return false;

            _context.Materials.Remove(material);
            await _context.SaveChangesAsync();
            return true;
        }

        // Pomocna metoda za upload fajlova
        private async Task<string> SaveFileAsync(IFormFile file, string folderName)
        {
            var directoryPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", folderName);
            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }

            var filePath = Path.Combine(directoryPath, file.FileName);
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return filePath;
        }
    }
}
