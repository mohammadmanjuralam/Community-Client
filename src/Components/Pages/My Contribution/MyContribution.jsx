import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../AuthCOntext/AuthContext";
import Loading from "../Loading/Loading";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Swal from "sweetalert2";

const MyContribution = () => {
  const { user } = useContext(AuthContext);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "My Contribution - Community Cleanliness Portal";
  }, []);

  // Fetch contributions for logged-in user
  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    fetch(`https://community-api-server.vercel.app/contributions?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setContributions(data);
        else setContributions([]);
      })
      .catch((err) => {
        console.error("Error fetching contributions:", err);
        Swal.fire("Error", "Failed to load contributions", "error");
        setContributions([]);
      })
      .finally(() => setLoading(false));
  }, [user?.email]);

  // Download PDF report for a single contribution
  const handleDownloadReport = (contribution) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Contribution Report", 14, 22);

    doc.setFontSize(12);
    doc.text(`Contributor: ${contribution.name}`, 14, 32);
    doc.text(`Email: ${contribution.email}`, 14, 40);
    doc.text(`Phone: ${contribution.phone}`, 14, 48);
    doc.text(`Address: ${contribution.address}`, 14, 56);
    doc.text(`Issue Title: ${contribution.issueTitle}`, 14, 64);
    doc.text(`Amount Paid: ৳${contribution.amount}`, 14, 72);
    doc.text(`Date: ${new Date(contribution.date).toLocaleString()}`, 14, 80);

    // Optional: additional info
    if (contribution.additionalInfo) {
      doc.text(`Additional Info: ${contribution.additionalInfo}`, 14, 88);
    }

    doc.save(`Contribution_${contribution.issueTitle}.pdf`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        My Contributions
      </h2>

      {contributions.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You have not made any contributions yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto text-black w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-orange-700">
                <th className="border p-2 text-left">Issue Title</th>
                <th className="border p-2 text-left">Category</th>
                <th className="border p-2 text-left">Amount Paid</th>
                <th className="border p-2 text-left">Date</th>
                <th className="border p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {contributions.map((contribution) => (
                <tr key={contribution._id} className=" bg-gray-100">
                  <td className="border p-2">{contribution.issueTitle}</td>
                  <td className="border p-2">{contribution.category}</td>
                  <td className="border p-2">${contribution.amount}</td>
                  <td className="border p-2">
                    {new Date(contribution.date).toLocaleString()}
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDownloadReport(contribution)}
                      className="bg-green-600 text-white px-4 py-1 rounded  transition"
                    >
                      Download Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyContribution;
