import React, { useState } from "react";
import useDb from "../hooks/useDb";
import { useNavigate } from "react-router-dom";

export default function SalaryForm() {
  const { db, ready, alive } = useDb();
  const [formData, setFormData] = useState({
    company: "",
    score: "",
    jobTitle: "",
    location: "",
    date: "",
    salary: "",
    source: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ready || !alive) {
      alert("Database is not ready or not connected.");
      return;
    }

    const newRecord = {
      Company: formData.company,
      "Company Score": parseFloat(formData.score),
      "Job Title": formData.jobTitle,
      Location: formData.location,
      Date: formData.date,
      Salary: formData.salary,
      Source: formData.source,
    };

    try {
      const result = await db.post(newRecord);
      console.log("Document saved successfully:", result);
      alert("Record submitted successfully!");
      setFormData({
        company: "",
        score: "",
        jobTitle: "",
        location: "",
        date: "",
        salary: "",
        source: "",
      });
      navigate("/");
    } catch (error) {
      console.error("Error saving document:", error);
      alert("Failed to submit the record.");
    }
  };

  return (
    <form className="salary-form" onSubmit={handleSubmit}>
      <label className="form-label" htmlFor="company">
        Company
      </label>
      <input
        className="form-input"
        type="text"
        name="company"
        id="company"
        value={formData.company}
        onChange={handleChange}
        placeholder="Enter company name"
        required
      />

      <label className="form-label" htmlFor="score">
        Company Score
      </label>
      <input
        className="form-input"
        type="number"
        name="score"
        id="score"
        value={formData.score}
        onChange={handleChange}
        placeholder="Enter score (0-5)"
        required
        min="0"
        max="5"
        step="0.1"
      />

      <label className="form-label" htmlFor="jobTitle">
        Job Title
      </label>
      <input
        className="form-input"
        type="text"
        name="jobTitle"
        id="jobTitle"
        value={formData.jobTitle}
        onChange={handleChange}
        placeholder="Enter job title"
        required
      />

      <label className="form-label" htmlFor="location">
        Location
      </label>
      <input
        className="form-input"
        type="text"
        name="location"
        id="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Enter location"
        required
      />

      <label className="form-label" htmlFor="date">
        Date
      </label>
      <input
        className="form-input"
        type="text"
        name="date"
        id="date"
        value={formData.date}
        onChange={handleChange}
        placeholder="Enter time ago (e.g., 7d, 2d)"
        required
      />

      <label className="form-label" htmlFor="salary">
        Salary
      </label>
      <input
        className="form-input"
        type="text"
        name="salary"
        id="salary"
        value={formData.salary}
        onChange={handleChange}
        placeholder="Enter salary range"
        required
      />

      <label className="form-label" htmlFor="source">
        Source
      </label>
      <input
        className="form-input"
        type="text"
        name="source"
        id="source"
        value={formData.source}
        onChange={handleChange}
        placeholder="Enter source (e.g., Glassdoor)"
        required
      />

      <button className="form-button" type="submit">
        Submit
      </button>
    </form>
  );
}
