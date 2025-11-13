import React, { useState, useContext } from "react";
import "./Register.css";
import { Link } from "react-router";
import Swal from "sweetalert2";
import AuthContext from "../../AuthCOntext/AuthContext";

const Register = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { createUser, signInWithGoogle } = useContext(AuthContext);

  // Google Login handler
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        console.log("Google user:", result.user);

        // Optionally, save user to DB
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
          uid: result.user.uid,
        };

        fetch("https://community-api-server.vercel.app/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Logged in with Google!",
              showConfirmButton: false,
              timer: 2000,
            });
          })
          .catch((err) => console.error("DB error:", err));
      })
      .catch((err) => {
        console.error("Google login error:", err);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    // Password validation
    if (password.length < 6) {
      setPasswordError("Password should be at least 6 characters");
      setTimeout(() => setPasswordError(""), 3000);
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
      setTimeout(() => setPasswordError(""), 3000);
      return;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter");
      setTimeout(() => setPasswordError(""), 3000);
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log("User created:", user);

        const newUser = { name, email, photo, uid: user.uid };
        fetch("https://community-api-server.vercel.app/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Registration Successful!",
              text: "Your account has been created.",
              confirmButtonColor: "#16a34a",
            });
          })
          .catch((err) => {
            console.error("Error saving user:", err);
            Swal.fire({
              icon: "error",
              title: "Database Error",
              text: "Could not save user data to server.",
            });
          });
      })
      .catch((error) => {
        console.error("Firebase error:", error.message);
        setErrorMsg("Invalid email or already used.");
        setTimeout(() => setErrorMsg(""), 3000);
      });
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="card">
        <div className="card2">
          <form onSubmit={handleRegister} className="form">
            <p className="heading font-bold">Register</p>

            {/* Name */}
            <div className="field">
              <input
                type="text"
                className="input-field"
                placeholder="Username"
                name="name"
                required
              />
            </div>

            {/* Email */}
            <div className="field">
              <input
                type="email"
                className="input-field"
                placeholder="Email"
                name="email"
                required
              />
            </div>
            {errorMsg && <p className="text-red-500 ml-2">{errorMsg}</p>}

            {/* PhotoURL */}
            <div className="field">
              <input
                type="text"
                className="input-field"
                placeholder="PhotoURL"
                name="photo"
              />
            </div>

            {/* Password */}
            <div className="field">
              <input
                type="password"
                className="input-field"
                placeholder="Password"
                name="password"
                required
              />
            </div>
            {passwordError && (
              <p className="text-red-500 ml-2">{passwordError}</p>
            )}

            <button type="submit" className="btn-3">
              Register
            </button>

            <p className="text-center mt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-red-500">
                Login
              </Link>
            </p>

            {/* Google Login Button */}
            {/* Google */}
            <button
              type="submit"
              onClick={handleGoogleLogin}
              className="btn bg-white text-black border-[#e5e5e5]"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
