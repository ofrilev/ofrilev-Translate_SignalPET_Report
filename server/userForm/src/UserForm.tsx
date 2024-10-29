import "./UserForm.css";
import React from "react";
import { useState } from "react";

export const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    language: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    return await fetch("http://localhost:8081/form/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ targetLan: formData.language }), // Send the content and language
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>User Information</h2>

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="language">Preferred Language:</label>
        <select
          id="language"
          name="language"
          value={formData.language}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>
            Select language
          </option>
          <option value="EN">English</option>
          <option value="FR">French</option>
          <option value="DE">German</option>
          <option value="ES">Spanish</option>
          <option value="PT">Portuguese</option>
        </select>

        <button disabled={formData.language == ""} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
