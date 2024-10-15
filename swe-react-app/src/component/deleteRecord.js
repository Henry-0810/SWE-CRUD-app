import React from "react";
import useDb from "../hooks/useDb";

export default function DeleteRecord({ recordId, onClose, onDelete }) {
  const { db, ready, alive } = useDb();

  const handleDelete = async () => {
    if (!ready || !alive) {
      alert("Database is not ready or not connected.");
      return;
    }

    try {
      const record = await db.get(recordId);
      if (record) {
        await db.remove(record);
        alert("Record deleted successfully!");
        onDelete();
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Failed to delete the record.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Are you sure?</h2>
        <p>This action cannot be undone.</p>
        <button className="modal-button" onClick={handleDelete}>
          Yes
        </button>
        <button className="modal-button" onClick={onClose}>
          No
        </button>
      </div>
    </div>
  );
}
