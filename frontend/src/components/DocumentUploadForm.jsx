import React, { useState } from "react";
import axios from "axios";

export default function DocumentUploadForm() {
  const [formData, setFormData] = useState({
    employee: "",
    kind: "",
    title: "",
    uploadedBy: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a file!");
      return;
    }

    const data = new FormData();
    data.append("employee", formData.employee);
    data.append("kind", formData.kind);
    data.append("title", formData.title);
    data.append("uploadedBy", formData.uploadedBy);
    data.append("file", file);

    try {
      await axios.post("http://localhost:3000/api/documents/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Document uploaded successfully!");
      setFormData({ employee: "", kind: "", title: "", uploadedBy: "" });
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Error uploading document.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Upload Document</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="employee"
          value={formData.employee}
          onChange={handleChange}
          placeholder="Employee ID"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="kind"
          value={formData.kind}
          onChange={handleChange}
          placeholder="Document Type"
          className="w-full border p-2 rounded"
          
        />

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Document Title"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="uploadedBy"
          value={formData.uploadedBy}
          onChange={handleChange}
          placeholder="Uploaded By"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="file"
          onChange={handleFileChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Upload Document
        </button>
      </form>
    </div>
  );
}
