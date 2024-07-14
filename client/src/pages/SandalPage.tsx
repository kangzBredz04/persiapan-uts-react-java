import { useEffect, useState } from "react";
import { Sandal } from "../types";
import SandalCard from "../components/SandalCard";
import SandalForm from "../components/SandalForm";

export default function SandalPage() {
  const [sandals, setSandals] = useState<Sandal[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedSandal, setSelectedSandal] = useState<Sandal | undefined>(
    undefined
  );

  useEffect(() => {
    fetchSandals();
  }, []);

  const fetchSandals = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/sandals");
      if (!response.ok) {
        throw new Error("Failed to fetch sandals");
      }
      const data = await response.json();
      setSandals(data);
    } catch (error) {
      console.error("Error fetching sandals:", error);
    }
  };

  const handleSort = () => {
    const sortedSandals = [...sandals].sort((a, b) =>
      a.status === b.status ? 0 : a.status ? -1 : 1
    );
    setSandals(sortedSandals);
  };

  const handleAddClick = () => {
    setSelectedSandal(undefined);
    setShowModal(true);
  };

  function handleEditClick(sandal: Sandal) {
    setSelectedSandal(sandal);
    setShowModal(true);
  }

  const handleSaveSandal = async (newSandal: Sandal) => {
    try {
      let response;
      if (selectedSandal) {
        response = await fetch(
          `http://localhost:8080/api/sandals/${selectedSandal.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newSandal),
          }
        );
      } else {
        response = await fetch("http://localhost:8080/api/sandals", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSandal),
        });
      }
      if (!response.ok) {
        throw new Error(
          selectedSandal ? "Failed to update sandal" : "Failed to add sandal"
        );
      }
      fetchSandals();
    } catch (error) {
      console.error("Error saving sandal:", error);
    }
  };

  async function handleDeleteSandal(id: number) {
    try {
      const response = await fetch(`http://localhost:8080/api/sandals/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete sandal");
      }
      fetchSandals();
    } catch (error) {
      console.error("Error deleting sandal:", error);
    }
  }
  return (
    <div className="container mx-auto">
      <div className="my-2 flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Sandal Store</h1>
        <div className="flex">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by description..."
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
          />
          <button
            // onClick={handleSearch}
            className="bg-indigo-500 text-white px-4 py-2 rounded-r-md"
          >
            Search
          </button>
          <button
            onClick={handleSort}
            className="ml-4 bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
          >
            Sort by Status
          </button>
          <button
            onClick={handleAddClick}
            className="ml-4 bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Add Sandal
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {sandals.map((sandal) => (
          <SandalCard
            key={sandal.id}
            sandal={sandal}
            onEdit={handleEditClick}
            onDelete={handleDeleteSandal}
          />
        ))}
      </div>
      {showModal && (
        <SandalForm
          onSave={handleSaveSandal}
          onClose={() => setShowModal(false)}
          initialSandal={selectedSandal}
        />
      )}
    </div>
  );
}
