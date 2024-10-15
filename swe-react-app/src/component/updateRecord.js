import React, { useState, useEffect } from "react";
import useDb from "../hooks/useDb";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateRecord() {
  const { recordId } = useParams();
  const { db, ready, alive } = useDb();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: "",
    score: "",
    jobTitle: "",
    location: "",
    date: "",
    salary: "",
    source: "",
    rev: "",
  });

  // Fetch the record to update when component mounts
  useEffect(() => {
    const fetchRecord = async () => {
      if (ready) {
        try {
          const record = await db.get(recordId);
          if (record) {
            setFormData({
              company: record.Company,
              score: record["Company Score"],
              jobTitle: record["Job Title"],
              location: record.Location,
              date: record.Date,
              salary: record.Salary,
              source: record.Source,
              _rev: record._rev,
            });
          }
        } catch (error) {
          console.error("Error fetching record:", error);
        }
      }
    };

    fetchRecord();
  }, [recordId, ready, db]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!ready || !alive) {
      alert("Database is not ready or not connected.");
      return;
    }

    try {
      const updatedRecord = {
        Company: formData.company,
        "Company Score": parseFloat(formData.score),
        "Job Title": formData.jobTitle,
        Location: formData.location,
        Date: formData.date,
        Salary: formData.salary,
        Source: formData.source,
        _rev: formData._rev,
        _id: recordId,
      };
      await db.put({ ...updatedRecord, _id: recordId });
      alert("Record updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating document:", error);
      alert("Failed to update the record.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="salary-form" onSubmit={handleUpdate}>
      <label htmlFor="company" className="form-label">
        Company
      </label>
      <input
        type="text"
        name="company"
        value={formData.company}
        onChange={handleChange}
        className="form-input"
        placeholder="Enter company name"
        required
      />

      <label htmlFor="score" className="form-label">
        Company Score
      </label>
      <input
        type="number"
        name="score"
        value={formData.score}
        onChange={handleChange}
        className="form-input"
        min="0"
        max="5"
        step="0.1"
        placeholder="Rate from 0 to 5"
        required
      />

      <label htmlFor="jobTitle" className="form-label">
        Job Title
      </label>
      <input
        type="text"
        name="jobTitle"
        value={formData.jobTitle}
        onChange={handleChange}
        className="form-input"
        placeholder="Enter job title"
        required
      />

      <label htmlFor="location" className="form-label">
        Location
      </label>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        className="form-input"
        placeholder="Enter location"
        required
      />

      <label htmlFor="date" className="form-label">
        Date
      </label>
      <input
        type="text"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="form-input"
        placeholder="Enter date (e.g., YYYY-MM-DD)"
        required
      />

      <label htmlFor="salary" className="form-label">
        Salary
      </label>
      <input
        type="text"
        name="salary"
        value={formData.salary}
        onChange={handleChange}
        className="form-input"
        placeholder="Enter salary amount"
        required
      />

      <label htmlFor="source" className="form-label">
        Source
      </label>
      <input
        type="text"
        name="source"
        value={formData.source}
        onChange={handleChange}
        className="form-input"
        placeholder="Enter source"
        required
      />

      <button type="submit" className="form-button">
        Update Record
      </button>
    </form>
  );
}
