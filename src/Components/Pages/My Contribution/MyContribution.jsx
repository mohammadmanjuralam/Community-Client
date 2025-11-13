import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../AuthCOntext/AuthContext";
import Loading from "../Loading/Loading";
import jsPDF from "jspdf";
import "jspdf-autotable";

const MyContribution = () => {
  const { user } = useContext(AuthContext);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:3000/my-contributions?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setContributions(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [user?.email]);

  const handleDownload = (record) => {
    const doc = new jsPDF();
    doc.text("Contribution Report", 14, 20);
    doc.autoTable({
      startY: 30,
      head: [["Issue Title", "Amount", "Date"]],
      body: [
        [
          record.issueTitle,
          `$${record.amount}`,
          new Date(record.date).toLocaleDateString(),
        ],
      ],
    });
    doc.save(`Contribution_${record.issueTitle}.pdf`);
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">
        My Contributions
      </h2>
      {contributions.length === 0 ? (
        <p className="text-center">You haven't made any contributions yet.</p>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th>Issue Title</th>
              <th>Category</th>
              <th>Paid Amount</th>
              <th>Date</th>
              <th>Download Report</th>
            </tr>
          </thead>
          <tbody>
            {contributions.map((c) => (
              <tr key={c._id}>
                <td>{c.issueTitle}</td>
                <td>{c.category}</td>
                <td>${c.amount}</td>
                <td>{new Date(c.date).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleDownload(c)}
                    className="btn btn-sm btn-info"
                  >
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyContribution;
