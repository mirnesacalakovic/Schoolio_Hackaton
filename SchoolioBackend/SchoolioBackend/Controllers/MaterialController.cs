using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using SchoolioBackend.Interface;
using SchoolioBackend.Models;
using System;

namespace SchoolioBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MaterialController : ControllerBase
    {
        private readonly IMaterialService _materialService;

        public MaterialController(IMaterialService materialService)
        {
            _materialService = materialService;
        }

        // Preuzimanje svih materijala
        [HttpGet]
        public async Task<IActionResult> GetAllMaterials()
        {
            var materials = await _materialService.GetAllMaterialsAsync();
            return Ok(materials);
        }

        // Preuzimanje materijala po ID-u
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMaterialById(Guid id)
        {
            var material = await _materialService.GetMaterialByIdAsync(id);
            if (material == null) return NotFound();
            return Ok(material);
        }

        // Upload materijala
        [HttpPost]
        public async Task<IActionResult> UploadMaterial([FromForm] Material material, [FromForm] IFormFile file)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var uploadedMaterial = await _materialService.UploadMaterialAsync(material, file);
                return CreatedAtAction(nameof(GetMaterialById), new { id = uploadedMaterial.Id }, uploadedMaterial);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Brisanje materijala
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMaterial(Guid id)
        {
            var deleted = await _materialService.DeleteMaterialAsync(id);
            if (!deleted) return NotFound();

            return NoContent();
        }
    }
}
