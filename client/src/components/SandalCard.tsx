import { Sandal } from "../types";

export default function SandalCard({
  sandal,
  onEdit,
  onDelete,
}: {
  sandal: Sandal;
  onEdit: (sandal: Sandal) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md mx-auto mb-4">
      <img
        src={sandal.img}
        alt={sandal.name}
        className="w-full h-64 object-cover object-center"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{sandal.name}</h2>
        <p className="text-gray-700 mb-4">{sandal.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">${sandal.price}</span>
          {sandal.status ? (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm">
              Available
            </span>
          ) : (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm">
              Out of Stock
            </span>
          )}
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => onEdit(sandal)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Edit
          </button>
          <button
            onClick={() => {
              if (confirm(`Apakah yakin akan menghapus data ${sandal.name}`)) {
                onDelete(sandal.id);
              }
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
