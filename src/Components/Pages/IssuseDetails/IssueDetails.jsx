import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Loading from "../Loading/Loading";

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/issues/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setIssue(data);
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching issue:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loading></Loading>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="text-center text-gray-500 mt-10">Issue not found.</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-xl overflow-hidden">
      <img
        src={issue.image || "https://via.placeholder.com/800x400?text=No+Image"}
        alt={issue.title}
        className="w-full h-64 object-cover"
      />

      <div className="p-6 text-gray-800">
        <h2 className="text-3xl font-bold text-blue-700 mb-3">{issue.title}</h2>
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="badge badge-outline">{issue.category}</span>
          <span
            className={`badge ${
              issue.status === "ended" ? "badge-success" : "badge-warning"
            }`}
          >
            {issue.status}
          </span>
          <span className="badge badge-neutral">{issue.location}</span>
        </div>

        <p className="text-gray-700 mb-4 leading-relaxed">
          {issue.description}
        </p>

        <p className="text-lg font-semibold">
          Estimated Fix Budget:{" "}
          <span className="text-green-600">${issue.amount}</span>
        </p>

        <div className="mt-6 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Reported by: <b>{issue.email}</b>
          </p>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline btn-primary"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
