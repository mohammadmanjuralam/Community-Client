import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../AuthCOntext/AuthContext";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";

const MyContribution = () => {
  const { user } = useContext(AuthContext);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user-specific contributions
  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);

    fetch(`http://localhost:3000/contributions?email=${user.email}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch contributions");
        }
        return res.json();
      })
      .then((data) => {
        setContributions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load contributions",
        });
        setLoading(false);
      });
  }, [user?.email]);

  // Download PDF report
  const handleDownloadReport = () => {
    if (contributions.length === 0) {
      Swal.fire("No Data", "No contributions to download.", "info");
      return;
    }

    const doc = new jsPDF();
    doc.text("My Contributions Report", 14, 20);
    const tableColumn = ["Issue Title", "Category", "Amount", "Date"];
    const tableRows = [];

    contributions.forEach((c) => {
      const rowData = [
        c.issueTitle,
        c.category,
        c.amount,
        new Date(c.date).toLocaleDateString(),
      ];
      tableRows.push(rowData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 30 });
    doc.save("my_contributions_report.pdf");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loading />
      </div>
    );
  }

  if (!contributions.length) {
    return (
      <div className="text-center text-gray-700 mt-10">
        You have not made any contributions yet.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        My Contributions
      </h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm lg:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Issue Title</th>
              <th className="border px-4 py-2 text-left">Category</th>
              <th className="border px-4 py-2 text-left">Amount (৳)</th>
              <th className="border px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {contributions.map((c) => (
              <tr
                key={c._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="border px-4 py-2">{c.issueTitle}</td>
                <td className="border px-4 py-2">{c.category}</td>
                <td className="border px-4 py-2">{c.amount}</td>
                <td className="border px-4 py-2">
                  {new Date(c.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleDownloadReport}
          className="btn bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Download Report
        </button>
      </div>
    </div>
  );
};

export default MyContribution;
