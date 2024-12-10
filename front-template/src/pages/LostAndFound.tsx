import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, MapPin, Clock, MessageCircle, X } from "lucide-react";
import Navbar from "./Navbar";

interface LostItem {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  status: "lost" | "found" | "returned";
  color: string;
}

const LostAndFound: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "lost" | "found" | "returned">(
    "all"
  );
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState<LostItem>({
    id: 0,
    title: "",
    description: "",
    location: "",
    date: "",
    status: "lost",
    color: "", // Boja se ne postavlja ovde
  });

  const lostItems: LostItem[] = [
    {
      id: 1,
      title: "Mathematics Textbook",
      description: "Blue textbook for 8th grade, slightly damaged at the edges",
      location: "School Yard",
      date: "March 15, 2024",
      status: "lost",
      color: "bg-yellow-100",
    },
    {
      id: 2,
      title: "Colored Pencil Set",
      description: "Set of colorful pens in a black case",
      location: "PE Hall",
      date: "March 22, 2024",
      status: "found",
      color: "bg-green-100",
    },
    {
      id: 3,
      title: "Mobile Phone",
      description: "Black smartphone, locked",
      location: "Library",
      date: "March 10, 2024",
      status: "lost",
      color: "bg-red-100",
    },
  ];

  const filteredItems = lostItems.filter(
    (item) =>
      (filter === "all" || item.status === filter) &&
      (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Funkcija za nasumičnu dodelu boje
  const getRandomColor = () => {
    const colors = [
      "bg-yellow-100",
      "bg-green-100",
      "bg-red-100",
      "bg-blue-100",
      "bg-pink-100",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Dodeljujemo nasumičnu boju
    const newItemWithColor = {
      ...newItem,
      color: getRandomColor(), // Dodeljujemo nasumičnu boju
      id: Date.now(), // Generišemo jedinstveni ID (u ovom slučaju koristimo timestamp)
    };

    // Dodajemo novi predmet (ovde bi trebalo da ga dodamo u listu ili pošaljemo na server)
    console.log("New item added:", newItemWithColor);

    // Zatvaramo modal
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-white text-black font-raleway">
      <Navbar />

      {/* Hero Section */}
      <header className="bg-white border-b-4 border-black py-16 text-center text-black">
        <h1 className="text-5xl font-black uppercase mb-4 border-4 border-black px-6 py-3 inline-block hover:bg-red-300 transition-colors text-black">
          Lost and Found
        </h1>
        <p className="text-xl max-w-2xl mx-auto px-4 border-4 border-black p-3 mt-4 text-black">
          Let's help each other find lost items
        </p>
      </header>

      {/* Search and Filter Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="flex-grow relative">
            <input
              type="text"
              placeholder="Search lost and found items"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-4 border-black p-4 text-xl focus:outline-none focus:ring-2 focus:ring-black shadow-[4px_4px_0_rgba(0,0,0,1)]"
              aria-label="Search lost and found items"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2" />
          </div>

          <button
            onClick={() => setShowModal(true)} // Open modal on click
            className="bg-blue-200 border-4 border-black px-6 py-4 text-xl font-bold uppercase transform transition-transform hover:-translate-x-2 hover:-translate-y-2 shadow-[8px_8px_0_rgba(0,0,0,1)] hover:shadow-[12px_12px_0_rgba(0,0,0,1)] flex items-center gap-3 text-black"
          >
            <Plus size={24} />
            Add Item
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          {["all", "lost", "found", "returned"].map((status) => (
            <button
              key={status}
              onClick={() =>
                setFilter(status as "all" | "lost" | "found" | "returned")
              }
              className={`px-6 py-2 border-4 border-black uppercase font-bold transform transition-transform hover:-translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] ${
                filter === status
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {status === "all"
                ? "All"
                : status === "lost"
                ? "Lost"
                : status === "found"
                ? "Found"
                : "Returned"}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredItems.length === 0 ? (
            <div className="col-span-full text-center bg-gray-100 border-4 border-black p-8">
              <p className="text-xl">No results found</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className={`${item.color} border-4 border-black p-6 transform transition-transform hover:-translate-x-2 hover:-translate-y-2 shadow-[6px_6px_0_rgba(0,0,0,1)] hover:shadow-[10px_10px_0_rgba(0,0,0,1)] text-black`}
              >
                <h3 className="text-xl font-bold uppercase mb-4">
                  {item.title}
                </h3>
                <p className="mb-4">{item.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin size={20} />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={20} />
                    <span>{item.date}</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <span
                    className={`px-3 py-1 uppercase text-sm font-bold ${
                      item.status === "lost"
                        ? "bg-red-200"
                        : item.status === "found"
                        ? "bg-green-200"
                        : "bg-blue-200"
                    }`}
                  >
                    {item.status === "lost"
                      ? "Lost"
                      : item.status === "found"
                      ? "Found"
                      : "Returned"}
                  </span>
                  <Link
                    to={`/item/${item.id}`}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <MessageCircle size={20} />
                    Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Popup Form */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white w-full max-w-sm h-auto border-4 border-black shadow-[12px_12px_0_rgba(0,0,0,1)] relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 bg-red-300 border-4 border-black p-2 hover:-translate-x-1 hover:-translate-y-1 transition-transform"
            >
              <X size={24} />
            </button>

            {/* Modal Header */}
            <div className="bg-blue-200 border-b-4 border-black p-4">
              <h2 className="text-2xl font-black uppercase text-black">
                Add Lost Item
              </h2>
            </div>

            {/* Modal Form */}
            <form
              onSubmit={handleFormSubmit}
              className="p-4 space-y-4 max-h-[80vh] overflow-auto"
            >
              {/* Title Field */}
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="block text-lg font-black uppercase mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newItem.title}
                  onChange={handleInputChange}
                  className="w-full border-4 border-black p-3 text-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                  placeholder="Enter item title"
                />
              </div>

              {/* Description Field */}
              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="block text-lg font-black uppercase mb-2"
                >
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={newItem.description}
                  onChange={handleInputChange}
                  className="w-full border-4 border-black p-3 text-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                  placeholder="Describe the item"
                />
              </div>

              {/* Location Field */}
              <div className="space-y-2">
                <label
                  htmlFor="location"
                  className="block text-lg font-black uppercase mb-2"
                >
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={newItem.location}
                  onChange={handleInputChange}
                  className="w-full border-4 border-black p-3 text-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                  placeholder="Where was the item lost/found?"
                />
              </div>

              {/* Date Field */}
              <div className="space-y-2">
                <label
                  htmlFor="date"
                  className="block text-lg font-black uppercase mb-2"
                >
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={newItem.date}
                  onChange={handleInputChange}
                  className="w-full border-4 border-black p-3 text-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>

              {/* Button Container */}
              <div className="flex justify-between gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-grow bg-gray-200 border-4 border-black px-4 py-2 text-lg font-black uppercase transform transition-transform hover:-translate-x-1 hover:-translate-y-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-grow bg-blue-300 border-4 border-black px-4 py-2 text-lg font-black uppercase transform transition-transform hover:-translate-x-1 hover:-translate-y-1"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t-4 border-black py-6 text-center text-black">
        <p className="font-bold">© 2024 Schoolio - Help Each Other</p>
      </footer>
    </div>
  );
};

export default LostAndFound;
