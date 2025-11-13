import React, { useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AuthContext from "../../AuthCOntext/AuthContext";

const AddIssueForm = () => {
  const { user } = useContext(AuthContext); 
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
    image: "",
    email: "",
    amount: "",
  });

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation: user must be logged in
    if (!user?.email) {
      Swal.fire({
        icon: "warning",
        title: "Please Login First",
        text: "You must be logged in to submit an issue.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    // make new issue object
    const issueData = {
      ...formData,
      email: user.email,
      status: "ongoing",
    };

    console.log("Sending issue data:", issueData);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/issues", issueData);

      if (res.data.insertedId || res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Issue Added Successfully!",
          text: "Your issue has been submitted.",
          timer: 2000,
          showConfirmButton: false,
        });

        // reset form
        setFormData({
          title: "",
          category: "",
          location: "",
          description: "",
          image: "",
          email: "",
          amount: "",
        });
      } else {
        throw new Error("Issue could not be added");
      }
    } catch (error) {
      console.error("Error adding issue:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while submitting your issue!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-10 border">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Report a New Issue
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
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

        {/* Category */}
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

        {/* Location */}
        <div>
          <label className="block mb-1 font-semibold">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location (e.g. Mirpur 10, Dhaka)"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the issue clearly..."
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-semibold">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Paste image URL"
            className="input input-bordered w-full"
          />
        </div>
        {/* email */}
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            readOnly
            value={user.email}
            onChange={handleChange}
            placeholder="Your email"
            className="input input-bordered w-full"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block mb-1 font-semibold">
            Suggested Fix Budget
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter estimated budget (e.g. 500)"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Issue"}
        </button>
      </form>
    </div>
  );
};

export default AddIssueForm;
