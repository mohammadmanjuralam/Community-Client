import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../../AuthCOntext/AuthContext";
import Loading from "../Loading/Loading";

const AllIssues = () => {
  const { user } = useContext(AuthContext);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "All Issues - Community Cleanliness Portal";
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/issues")
      .then((res) => res.json())
      .then((data) => {
        setIssues(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching issues:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loading />
      </div>
    );
  }

  if (issues.length === 0) {
    return <p className="text-center text-gray-700 mt-10">No issues found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 mt-6">
      {issues.map((issue) => (
        <div
          key={issue._id}
          className="border p-4 rounded-lg shadow hover:shadow-lg transition"
        >
          <img
            src={
              issue.image || "https://via.placeholder.com/400x200?text=No+Image"
            }
            alt={issue.title}
            className="w-full h-40 object-cover mb-2 rounded"
          />
          <h3 className="font-bold text-lg">{issue.title}</h3>
          <p className="text-gray-600">{issue.category}</p>
          <p className="text-gray-600">{issue.location}</p>
          <p className="text-gray-700 font-semibold">
            Budget: {issue.amount} ৳
          </p>

          <button
            onClick={() => {
              if (user) {
                navigate(`/issues/${issue._id}`);
              } else {
                navigate("/login");
              }
            }}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            See Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllIssues;
