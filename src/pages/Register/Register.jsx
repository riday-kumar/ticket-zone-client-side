import { FaPlaneDeparture } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Register = () => {
  const { signUpWithEmail, googleLogin } = useAuth();
  // console.log(signUpWithEmail);
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const newUser = { name, email };
    signUpWithEmail(email, password)
      .then((res) => {
        if (res.user) {
          axiosSecure.post("/users", newUser).then((data) => {
            console.log(data);
            if (data.data.acknowledged) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Sign up Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        if (err.message == "Firebase: Error (auth/email-already-in-use).") {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "User Already Exists. Please Log in",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/login");
        }
      });
  };

  const handleGoogleSignIn = () => {
    googleLogin()
      .then((res) => {
        if (res.user) {
          const newUser = {
            name: res.user.displayName,
            email: res.user.email,
          };
          axiosSecure.post("/users", newUser).then((data) => {
            console.log(data);
            if (data.data.acknowledged || data.data === "user already exists") {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Log in Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="bg-white px-5 md:px-20 py-10 my-15 rounded-md md:w-[70%] lg:w-[50%] mx-auto">
      <p className="text-center text-3xl md:text-4xl font-bold text-primary flex justify-center items-center gap-3">
        Create Account <FaPlaneDeparture />
      </p>
      <p className="mb-2 mt-5">
        Already have account?{" "}
        <Link to="/login" className="text-blue-500 font-semibold">
          Log in
        </Link>
      </p>
      <form onSubmit={handleRegister}>
        <fieldset className="fieldset border-base-300 rounded-box ">
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            className="input w-full"
            placeholder="Name"
          />

          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input w-full"
            placeholder="Email"
          />

          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input w-full"
            placeholder="Password"
          />
          <Link className="text-blue-500 font-medium mt-3">
            Forget Password?
          </Link>

          <button className="btn btn-grad mt-4">Sign Up</button>
        </fieldset>
      </form>
      <div className="my-3">
        <p className="text-center">or sign in with</p>
      </div>
      <button
        onClick={handleGoogleSignIn}
        className="btn btn-outline btn-secondary w-full"
      >
        <FcGoogle /> Google
      </button>
    </div>
  );
};

export default Register;
