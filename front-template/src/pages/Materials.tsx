import React, { useEffect, useState } from "react";
import {
  Plus,
  File,
  BookOpen,
  ClipboardList,
  Trophy,
  Search,
  Filter,
  X,
} from "lucide-react";
import Navbar from "./Navbar";
import TextToSpeech from "@/components/TextToSpeach";

// Enum to match backend MaterialType
enum MaterialType {
  Lektira = "School Reading",
  DomaciZadatak = "Homework",
  Test = "Test",
  Takmicenje = "Competition",
}

// Interface to match backend Material model
interface Material {
  id: string;
  description: string;
  title: string;
  grade: number;
  uploaderId: string;
  uploadDate: string;
  materialType: MaterialType;
  filePath?: string;
}

const Materials: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showAddMaterialModal, setShowAddMaterialModal] = useState(false);
  const [newMaterial, setNewMaterial] = useState<Partial<Material> & { file?: File }>({
    title: "",
    description: "",
    grade: 1,
    materialType: MaterialType.Lektira,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<MaterialType | "All">("All");
  const [isSearching, setIsSearching] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  // Material Type Icons
  const MaterialTypeIcons = {
    [MaterialType.Lektira]: <BookOpen size={24} strokeWidth={2.5} />,
    [MaterialType.DomaciZadatak]: <ClipboardList size={24} strokeWidth={2.5} />,
    [MaterialType.Test]: <File size={24} strokeWidth={2.5} />,
    [MaterialType.Takmicenje]: <Trophy size={24} strokeWidth={2.5} />,
  };

  // Fetch current user from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, []);

  // Fetch all materials from the backend
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch("https://localhost:7102/api/Material");
        if (!response.ok) throw new Error("Failed to fetch materials");
        const data: Material[] = await response.json();
        setMaterials(data);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };
    fetchMaterials();
  }, []);

  // Fetch materials based on search term
  const fetchSearchedMaterials = async (term: string) => {
    if (!term.trim()) {
      // If search is cleared, refetch all materials
      const response = await fetch("https://localhost:7102/api/Material");
      if (!response.ok) throw new Error("Failed to fetch materials");
      const data: Material[] = await response.json();
      setMaterials(data);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch("https://localhost:7102/api/Material/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: term }),
      });

      if (!response.ok) throw new Error("Failed to search materials");
      const searchResults: { material: Material; similarity: number }[] = await response.json();
      setMaterials(searchResults.map((result) => result.material)); // Map to Material objects
    } catch (error) {
      console.error("Error searching materials:", error);
      alert("Failed to search materials. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  // Handle input change for search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (searchTimeout) {
      clearTimeout(searchTimeout); // Clear the previous timeout
    }

    const timeout = setTimeout(() => {
      fetchSearchedMaterials(term);
    }, 2000); // Wait 2 seconds before fetching

    setSearchTimeout(timeout);
  };

  // Handle material submission
  const handleAddMaterial = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !newMaterial.title ||
      !newMaterial.description ||
      !newMaterial.file ||
      !newMaterial.materialType ||
      !newMaterial.grade
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("Title", newMaterial.title);
      formData.append("Description", newMaterial.description);
      formData.append("Grade", newMaterial.grade.toString());
      formData.append("UploaderId", currentUser?.id || "");
      formData.append("FilePath", "temp/path"); // Temporary file path
      formData.append("MaterialType", newMaterial.materialType);
      formData.append("file", newMaterial.file);

      const response = await fetch("https://localhost:7102/api/Material", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from API:", errorText);
        alert("Failed to upload material. Please check your input and try again.");
        return;
      }

      const uploadedMaterial: Material = await response.json();
      setMaterials([...materials, uploadedMaterial]);
      setShowAddMaterialModal(false);

      // Reset form
      setNewMaterial({
        title: "",
        description: "",
        materialType: MaterialType.Lektira,
        grade: 1,
      });
    } catch (error) {
      console.error("Error uploading material:", error);
      alert("An error occurred while uploading the material. Please try again.");
    }
  };

  // Filter materials based on type
  const filteredMaterials = materials.filter(
    (material) =>
      typeFilter === "All" || material.materialType === typeFilter
  );

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-white text-black font-raleway p-6">
        <header className="flex justify-between items-center border-b-4 border-black pb-6 mb-8">
          <h1 className="text-5xl font-black uppercase border-4 border-black px-4 py-2 inline-block hover:bg-yellow-200 transition-colors">
            School Materials
          </h1>
          {currentUser && currentUser.role === "TEACHER" && (
            <button
              onClick={() => setShowAddMaterialModal(true)}
              className="bg-blue-200 border-4 border-black px-6 py-3 flex items-center gap-2 transform transition-transform hover:-translate-x-2 hover:-translate-y-2 shadow-[6px_6px_0px_rgba(0,0,0,1)]"
            >
              <Plus size={24} strokeWidth={2.5} /> Add Material
            </button>
          )}
        </header>

        <div className="App">
            <TextToSpeech />
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-grow relative">
            <input
              type="text"
              placeholder="Search materials"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full border-4 border-black p-4 text-xl focus:outline-none shadow-[4px_4px_0_rgba(0,0,0,1)] uppercase"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2" strokeWidth={2.5} />
          </div>

          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as MaterialType | "All")}
              className="w-full border-4 border-black p-4 text-xl appearance-none bg-white shadow-[4px_4px_0_rgba(0,0,0,1)] uppercase"
            >
              <option value="All">ALL TYPES</option>
              {Object.values(MaterialType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" strokeWidth={2.5} />
          </div>
        </div>

        {/* Materials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredMaterials.length === 0 ? (
            <div className="col-span-full bg-gray-100 border-4 border-black p-8 text-center shadow-[6px_6px_0_rgba(0,0,0,1)]">
              <p className="text-xl uppercase">
                {isSearching ? "Searching..." : "No materials found"}
              </p>
            </div>
          ) : (
            filteredMaterials.map((material) => (
              <div
                key={material.id}
                className="bg-yellow-100 border-4 border-black p-6 transform transition-transform hover:-translate-x-2 hover:-translate-y-2 shadow-[6px_6px_0_rgba(0,0,0,1)]"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-black uppercase">{material.title}</h3>
                </div>
                <p className="mb-4">{material.description}</p>
                <p className="mb-4">{material.materialType}</p>
                <p className="mb-4">Level: {material.grade}</p>
                <a
                  href={`https://localhost:7102/api/Material/download/${material.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-200 border-4 border-black px-3 py-1 transform transition-transform hover:-translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0_rgba(0,0,0,1)] uppercase"
                >
                  Download
                </a>
              </div>
            ))
          )}
        </div>

        {/* Add Material Modal */}
        {showAddMaterialModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white border-4 border-black w-full max-w-md max-h-[90%] overflow-y-auto shadow-[12px_12px_0_rgba(0,0,0,1)]">
              <div className="bg-blue-200 border-b-4 border-black p-4 flex justify-between items-center">
                <h2 className="text-2xl font-black uppercase">Add New Material</h2>
                <button
                  onClick={() => setShowAddMaterialModal(false)}
                  className="hover:bg-red-200 p-2 border-2 border-black"
                >
                  <X size={24} strokeWidth={2.5} />
                </button>
              </div>
              <form onSubmit={handleAddMaterial} className="p-4 space-y-4">
                <div>
                  <label className="block text-lg font-black uppercase mb-2">Subject</label>
                  <input
                    type="text"
                    value={newMaterial.title}
                    onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                    className="w-full border-4 border-black p-2 text-lg uppercase"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-black uppercase mb-2">Description</label>
                  <textarea
                    value={newMaterial.description}
                    onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                    className="w-full border-4 border-black p-2 text-lg"
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-black uppercase mb-2">Level</label>
                  <input
                    type="number"
                    value={newMaterial.grade || ""} // Empty field if undefined
                    onChange={(e) =>
                      setNewMaterial({
                        ...newMaterial,
                        grade: parseInt(e.target.value) || 0, // Convert to number
                      })
                    }
                    className="w-full border-4 border-black p-2 text-lg uppercase"
                    required
                    min={1} // Minimum allowed value
                    max={8} // Maximum allowed value
                  />
                </div>
                <div>
                  <label className="block text-lg font-black uppercase mb-2">Material Type</label>
                  <select
                    value={newMaterial.materialType}
                    onChange={(e) => setNewMaterial({ ...newMaterial, materialType: e.target.value as MaterialType })}
                    className="w-full border-4 border-black p-2 text-lg uppercase"
                    required
                  >
                    {Object.values(MaterialType).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-lg font-black uppercase mb-2">File Upload</label>
                  <input
                    type="file"
                    onChange={(e) => setNewMaterial({ ...newMaterial, file: e.target.files?.[0] })}
                    className="w-full border-4 border-black p-2 text-lg"
                    required
                  />
                </div>
                <div className="flex justify-between space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowAddMaterialModal(false)}
                    className="flex-1 bg-gray-200 border-4 border-black p-3 uppercase font-black transform transition-transform hover:-translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0_rgba(0,0,0,1)]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-300 border-4 border-black p-3 uppercase font-black transform transition-transform hover:-translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0_rgba(0,0,0,1)]"
                  >
                    Add Material
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Materials;
