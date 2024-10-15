import React, { useState } from "react";
import useDb from "../hooks/useDb";
import useSalaries from "../hooks/useSalaries";
import { useNavigate } from "react-router-dom";

export default function ListRecords() {
  const { db, ready, alive } = useDb();
  const { loading, docs } = useSalaries(db, ready);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleUpdateClick = (id) => {
    navigate(`/update/${id}`);
  };

  const filteredDocs = docs.filter((doc) =>
    doc.Company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {!alive && <div>Database is not alive</div>}
      {loading && <div>Loading...</div>}
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search by company name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      {filteredDocs.length > 0 ? (
        <table className="card">
          <thead>
            <tr>
              <th>#</th>
              <th>Company</th>
              <th>Company Score</th>
              <th>Job Title</th>
              <th>Location</th>
              <th>Date</th>
              <th>Salary Range</th>
              <th>Source</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocs.map((doc, index) => (
              <tr key={doc._id}>
                <td data-label="#"> {index + 1} </td>
                <td data-label="Company"> {doc.Company} </td>
                <td data-label="Company Score"> {doc["Company Score"]} </td>
                <td data-label="Job Title"> {doc["Job Title"]} </td>
                <td data-label="Location"> {doc.Location} </td>
                <td data-label="Date"> {doc.Date} </td>
                <td data-label="Salary Range"> {doc.Salary} </td>
                <td data-label="Source"> {doc.Source} </td>
                <td data-label="Actions">
                  <button
                    className="iconBtn"
                    onClick={() => handleUpdateClick(doc._id)}
                  >
                    <img
                      src="updateIcon.svg"
                      alt="Update"
                      className="crudIcon"
                    />
                  </button>
                  <button className="iconBtn">
                    <img
                      src="deleteIcon.svg"
                      alt="Delete"
                      className="crudIcon"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>No records found</p>
      )}
    </div>
  );
}
