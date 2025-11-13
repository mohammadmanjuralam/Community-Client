import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Banner from "../../Banner/Banner";

// Home Page
const Home = () => {
  const [recentIssues, setRecentIssues] = useState([]);
  const [stats, setStats] = useState({ users: 0, resolved: 0, pending: 0 });
  const navigate = useNavigate();

  //Fetch 6 recent issues
  useEffect(() => {
    fetch("http://localhost:3000/issues-limit")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched issues:", data);
        setRecentIssues(data);
      })
      .catch((err) => console.error(err));
  }, []);

  //Fetch stats
  useEffect(() => {
    fetch("http://localhost:3000/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => setStats({ users: 120, resolved: 35, pending: 15 })); // fallback
  }, []);

  return (
    <div className="text-black">
      <Banner></Banner>

      {/* 🗂 Category Section */}
      <div className="mt-10 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Issue Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              name: "Garbage",
              img: "https://i.ibb.co.com/0RD05vWw/download-6.jpg",
            },
            {
              name: "Illegal Construction",
              img: "https://i.ibb.co.com/R44y6RgT/65-buildings-between-Jinsi-Lakshmibai-Pratima-to-be-trimmed-for-road-widening.jpg",
            },
            {
              name: "Broken Public Property",
              img: "https://i.ibb.co.com/cKnZ1Nxx/Old-bright-red-brick-wall-background-Premium-Photo.jpg",
            },
            {
              name: "Road Damage",
              img: "https://i.ibb.co.com/20GTKKKr/download-5.jpg",
            },
          ].map((cat, idx) => (
            <div
              key={idx}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition"
            >
              <figure>
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="h-40 w-full object-cover"
                />
              </figure>
              <div className="card-body text-center">
                <h3 className="font-bold text-lg">{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Complaints Section */}
      <section className="my-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Recent Complaints
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentIssues.map((issue) => (
            <div
              key={issue._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {issue.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {issue.description?.slice(0, 100) ||
                    "No description provided."}
                </p>

                <div className="mt-auto space-y-1 text-sm text-gray-500">
                  <p>
                    <span className="font-semibold text-gray-700">
                      Category:
                    </span>{" "}
                    {issue.category}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">
                      Location:
                    </span>{" "}
                    {issue.location}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Status:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded-md text-white text-xs ${
                        issue.status === "ended"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {issue.status}
                    </span>
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/issues/${issue._id}`)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  See Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 📊 Community Stats */}
      <div className="mt-20 bg-blue-50 py-10">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Community Stats
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="stat bg-white shadow rounded-xl p-6 text-center">
            <div className="stat-value text-blue-600">{stats.users}</div>
            <div className="stat-title">Registered Users</div>
          </div>
          <div className="stat bg-white shadow rounded-xl p-6 text-center">
            <div className="stat-value text-green-600">{stats.resolved}</div>
            <div className="stat-title">Issues Resolved</div>
          </div>
          <div className="stat bg-white shadow rounded-xl p-6 text-center">
            <div className="stat-value text-yellow-600">{stats.pending}</div>
            <div className="stat-title">Pending Issues</div>
          </div>
        </div>
      </div>

      {/* 💪 Volunteer Call-to-Action */}
      <div className="mt-16 bg-green-100 py-12 text-center rounded-2xl mx-4">
        <h2 className="text-3xl font-bold mb-3">
          Join Our Clean Community Drive!
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-6">
          Be a part of the movement to keep your city clean and green. Volunteer
          to participate in upcoming drives and events near you.
        </p>
        <button className="btn btn-success text-white">Join Now</button>
      </div>
    </div>
  );
};

export default Home;
