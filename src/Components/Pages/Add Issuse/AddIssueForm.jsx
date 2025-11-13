import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import AuthContext from "../../AuthCOntext/AuthContext";

const AddIssueForm = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.title = "Add Issues - Community Cleanliness Portal";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const issueData = {
      title: e.target.title.value,
      category: e.target.category.value,
      location: e.target.location.value,
      description: e.target.description.value,
      image: e.target.image.value,
      amount: parseFloat(e.target.amount.value),
      status: "ongoing",
      date: new Date().toISOString(),
      email: user.email,
    };

    fetch("http://localhost:3000/issues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(issueData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Issue Submitted",
          text: "Your issue has been added successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
        e.target.reset();
      })
      .catch(() =>
        Swal.fire("Error", "Failed to submit issue. Try again!", "error")
      )
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">
        Report New Issue
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Issue Title"
          className="input input-bordered w-full"
          required
        />
        <select
          name="category"
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Category</option>
          <option value="Garbage">Garbage</option>
          <option value="Illegal Construction">Illegal Construction</option>
          <option value="Broken Public Property">Broken Public Property</option>
          <option value="Road Damage">Road Damage</option>
        </select>
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="amount"
          placeholder="Suggested Fix Budget"
          className="input input-bordered w-full"
          required
        />
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Issue"}
        </button>
      </form>
    </div>
  );
};

export default AddIssueForm;
