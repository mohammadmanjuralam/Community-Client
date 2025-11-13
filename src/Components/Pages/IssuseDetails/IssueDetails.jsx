import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import AuthContext from "../../AuthCOntext/AuthContext";
import Loading from "../Loading/Loading";

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showContributionModal, setShowContributionModal] = useState(false);

  useEffect(() => {
    document.title = "Issues details - Community Cleanliness Portal";
  }, []);

  useEffect(() => {
    fetch(`https://community-api-server.vercel.app/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setIssue(data);
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
        <Loading />
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="text-center text-gray-500 mt-10">Issue not found.</div>
    );
  }

  // Contribution Submit Handler
  const handleContribution = (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }

    const form = e.target;
    const contributionData = {
      issueId: issue._id,
      issueTitle: issue.title,
      category: issue.category,
      amount: parseFloat(form.amount.value),
      name: form.name.value,
      email: user.email,
      phone: form.phone.value,
      address: form.address.value,
      date: new Date().toISOString(),
      additionalInfo: form.additionalInfo.value,
    };

    fetch("https://community-api-server.vercel.app/contributions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contributionData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Contribution Successful",
          text: "Thank you for your contribution!",
        });
        setShowContributionModal(false);
        form.reset();
      })
      .catch(() => {
        Swal.fire("Error", "Failed to submit contribution", "error");
      });
  };

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

        {/* Contribution Button */}
        <div className="mt-6">
          <button
            onClick={() => {
              if (!user) {
                navigate("/login");
              } else {
                setShowContributionModal(true);
              }
            }}
            className="btn btn-primary"
          >
            Pay Clean-Up Contribution
          </button>
        </div>
      </div>

      {/* Contribution Modal */}
      {showContributionModal && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-blue-600 mb-4">
              Contribute to Issue
            </h3>
            <form onSubmit={handleContribution} className="space-y-3">
              <input
                type="text"
                name="issueTitle"
                value={issue.title}
                readOnly
                className="input input-bordered w-full"
              />
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered w-full"
                required
              />
              <input
                type="email"
                name="email"
                value={user.email}
                readOnly
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="input input-bordered w-full"
                required
              />
              <textarea
                name="additionalInfo"
                placeholder="Additional Info (optional)"
                className="textarea textarea-bordered w-full"
              ></textarea>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowContributionModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default IssueDetails;
