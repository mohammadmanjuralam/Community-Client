import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../AuthCOntext/AuthContext";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";
import "./MyIssues.css";
import Marquee from "react-fast-marquee";
import { Link, Navigate } from "react-router";

const MyIssues = () => {
  const { user } = useContext(AuthContext);
  const [myIssues, setMyIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user-specific issues
  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    fetch(`http://localhost:3000/my-issues?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMyIssues(data);
        else setMyIssues([]);
      })
      .catch((err) => {
        console.error("Error fetching issues:", err);
        setMyIssues([]);
      })
      .finally(() => setLoading(false));
  }, [user?.email]);

  // Update issue handler
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedIssue = {
      title: form.title.value.trim(),
      category: form.category.value,
      description: form.description.value.trim(),
      amount: parseFloat(form.amount.value),
      status: form.status.value,
    };

    // Check if any field changed
    const isChanged =
      updatedIssue.title !== selectedIssue.title ||
      updatedIssue.category !== selectedIssue.category ||
      updatedIssue.description !== selectedIssue.description ||
      updatedIssue.amount !== selectedIssue.amount ||
      updatedIssue.status !== selectedIssue.status;

    if (!isChanged) {
      Swal.fire({
        icon: "warning",
        title: "No changes detected",
        text: "Please modify at least one field before saving.",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    fetch(`http://localhost:3000/issues/${selectedIssue._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedIssue),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Issue updated successfully.",
            timer: 2000,
            showConfirmButton: false,
          });
          setMyIssues((prev) =>
            prev.map((issue) =>
              issue._id === selectedIssue._id
                ? { ...issue, ...updatedIssue }
                : issue
            )
          );
          form.reset();
          document.getElementById("update_modal").close();
        }
      })
      .catch(() =>
        Swal.fire("Error", "Failed to update issue. Try again!", "error")
      );
  };

  // Delete issue handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your issue!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/issues/${id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Issue removed successfully.", "success");
              setMyIssues(myIssues.filter((issue) => issue._id !== id));
            }
          })
          .catch(() => Swal.fire("Error", "Could not delete issue.", "error"));
      }
    });
  };

  return (
    <div className="w-full mx-auto mt-10 bg-[#15181f] p-6  shadow-xl rounded-2xl ">
      <Marquee gradient={false} speed={50}>
        <h2 className="text-3xl  py-2 px-52 font-bold text-center mb-6 bg-green-100  text-red-600">
          Your Reported Issues is here You can check,update and delete every
          Issues
        </h2>
      </Marquee>

      {loading ? (
        <Loading />
      ) : myIssues.length === 0 ? (
        <p className="text-center  text-white">No issues added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full text-white">
            <thead>
              <tr className=" text-white font-bold text-[10px] lg:text-2xl ">
                <th>Title</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="font-bold text-[10px] lg:text-[16px]">
              {myIssues.map((issue) => (
                <tr key={issue._id} className="hover">
                  <td className="">{issue.title}</td>
                  <td className="">{issue.category}</td>
                  <td className="">${issue.amount}</td>
                  <td className="">
                    <span
                      className={`badge ${
                        issue.status === "ended"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {issue.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2 flex-col">
                      {/* 🔵 Details Button */}
                      <Link
                        to="/issues/:id"
                        onClick={() => Navigate(`/issues/${issue._id}`)}
                        className="btn btn-sm btn-outline btn-info"
                      >
                        Details
                      </Link>

                      {/* 🟢 Update Button */}
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => {
                          setSelectedIssue(issue);
                          document.getElementById("update_modal").showModal();
                        }}
                      >
                        Update
                      </button>

                      {/* 🔴 Delete Button */}
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleDelete(issue._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <dialog id="update_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-blue-600">Update Issue</h3>
          {selectedIssue && (
            <form onSubmit={handleUpdate} className="space-y-3 mt-4">
              <input
                type="text"
                name="title"
                defaultValue={selectedIssue.title}
                className="input input-bordered w-full"
              />

              <select
                name="category"
                defaultValue={selectedIssue.category}
                className="select select-bordered w-full"
                required
              >
                <option value="">Select Category</option>
                <option value="Garbage">Garbage</option>
                <option value="Illegal Construction">
                  Illegal Construction
                </option>
                <option value="Broken Public Property">
                  Broken Public Property
                </option>
                <option value="Road Damage">Road Damage</option>
              </select>

              <textarea
                name="description"
                defaultValue={selectedIssue.description}
                className="textarea textarea-bordered w-full"
              />

              <input
                type="number"
                name="amount"
                defaultValue={selectedIssue.amount}
                className="input input-bordered w-full"
              />

              <select
                name="status"
                defaultValue={selectedIssue.status}
                className="select select-bordered w-full"
              >
                <option value="ongoing">Ongoing</option>
                <option value="ended">Ended</option>
              </select>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() =>
                    document.getElementById("update_modal").close()
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default MyIssues;
