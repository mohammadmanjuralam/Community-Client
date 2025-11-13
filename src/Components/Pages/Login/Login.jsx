import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import AuthContext from "../../AuthCOntext/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // যদি user protected route থেকে আসে
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    document.title = "Login - Community Cleanliness Portal";
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged in successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true }); // redirect
      })
      .catch((err) => {
        setErrorMsg(err.message);
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged in successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true }); // redirect
      })
      .catch((err) => setErrorMsg(err.message));
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="card">
        <div className="card2">
          <form onSubmit={handleLogin} className="form">
            <p className="heading font-bold">Login</p>

            <div className="field">
              <input
                type="text"
                className="input-field"
                placeholder="email"
                name="email"
              />
            </div>
            {errorMsg && <p className="text-red-500 ml-2">{errorMsg}</p>}

            <div className="field">
              <input
                type="password"
                className="input-field"
                placeholder="Password"
                name="password"
              />
            </div>

            <button className="btn-3 font-bold">Login</button>

            <div className="loginbtn">
              <p>
                Don't have an account?
                <Link to="/register" className="text-red-500 pl-2">
                  Register
                </Link>
              </p>
            </div>

            {/* Google login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn bg-white mb-5 text-black border-[#e5e5e5]"
            >
              Login with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
