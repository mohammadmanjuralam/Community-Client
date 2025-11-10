import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // SweetAlert2 import

const AddIssueForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
    image: "",
    amount: "",
    status: "ongoing",
    email: "user@example.com", // replace later with logged-in user email
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/issues", formData);

      // ✅ SweetAlert success
      Swal.fire({
        icon: "success",
        title: "Issue Added!",
        text: "Your issue has been successfully submitted.",
        timer: 2000,
        showConfirmButton: false,
      });

      setFormData({
        title: "",
        category: "",
        location: "",
        description: "",
        image: "",
        amount: "",
        status: "ongoing",
        email: "user@example.com",
      });
    } catch (error) {
      console.error(error);

      // ❌ SweetAlert error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Add New Issue</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter issue title"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select category</option>
            <option value="Garbage">Garbage</option>
            <option value="Illegal Construction">Illegal Construction</option>
            <option value="Broken Public Property">
              Broken Public Property
            </option>
            <option value="Road Damage">Road Damage</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the issue"
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">
            Suggested Fix Budget
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="input input-bordered w-full"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">
          Submit Issue
        </button>
      </form>
    </div>
  );
};

export default AddIssueForm;
