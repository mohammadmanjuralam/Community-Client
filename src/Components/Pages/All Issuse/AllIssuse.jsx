import React, { useEffect, useState } from "react";

const AllIssuse = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {issues.length === 0 ? (
        <p>No issues found</p>
      ) : (
        issues.map((issue) => (
          <div key={issue._id} className="border p-4 rounded shadow">
            <img
              src={issue.image}
              alt={issue.title}
              className="w-full h-40 object-cover mb-2"
            />
            <h3 className="font-bold text-lg">{issue.title}</h3>
            <p className="text-sm text-gray-600">{issue.category}</p>
            <p className="text-sm">{issue.location}</p>
            <p className="text-sm">Budget: {issue.amount} ৳</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AllIssuse;
