import React, { useContext, useState } from "react";
import "./Register.css";
import { MdAddPhotoAlternate, MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router";

import Swal from "sweetalert2";
import AuthContext from "../../AuthCOntext/AuthContext";

const Register = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { createUser } = useContext(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    // Password Validation
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
        setErrorMsg("");

        
        const newUser = { name, email, photo, uid: user.uid };
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("User saved to DB:", data);

            Swal.fire({
              icon: "success",
              title: "Registration Successful!",
              text: "Your account has been created successfully.",
              confirmButtonColor: "#16a34a",
            });
          })
          .catch((err) => {
            console.error("Error saving user:", err);

            Swal.fire({
              icon: "error",
              title: "Database Error!",
              text: "Could not save user data to server.",
            });
          });
      })
      .catch((error) => {
        console.error("Firebase error:", error.message);
        setErrorMsg("Invalid email");
        setTimeout(() => setErrorMsg(""), 3000);
        return;
      });
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="card">
        <div className="card2">
          <form onSubmit={handleRegister} className="form">
            <p className="heading font-bold">Register</p>

            {/* UserName */}
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
              <MdOutlineEmail />
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
              <MdAddPhotoAlternate />
              <input
                type="text"
                className="input-field"
                placeholder="PhotoURL"
                name="photo"
              />
            </div>

            {/* Password */}
            <div className="field">
              <RiLockPasswordLine />
              <input
                type="password"
                className="input-field"
                placeholder="Password"
                name="password"
                required
              />
            </div>

            {/* Error Messages */}

            {passwordError && (
              <p className="text-red-500 ml-2">{passwordError}</p>
            )}

            <button type="submit" className="btn-3">
              Register
            </button>

            <p className="text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-red-500">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
