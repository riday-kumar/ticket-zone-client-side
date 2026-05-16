import { FaPlaneDeparture } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Register = () => {
  const { signUpWithEmail, googleLogin } = useAuth();

  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = (data) => {
    // e.preventDefault();
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const newUser = { name, email };

    // console.log(data);

    signUpWithEmail(email, password)
      .then((res) => {
        if (res.user) {
          axiosSecure.post("/users", newUser).then((data) => {
            console.log(data);
            if (data.data.acknowledged) {
              toast.success("Sign up Successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              navigate(location.state || "/");
            }
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        if (err.message == "Firebase: Error (auth/email-already-in-use).") {
          toast.error("User Already Exists. Please Log in!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          navigate(location.state || "/");
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
              navigate(location.state || "/");
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
      <form onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="fieldset border-base-300 rounded-box ">
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            {...register("name", { required: true })}
            className="input w-full"
            placeholder="Name"
          />
          {errors.name?.type === "required" && (
            <span className="text-red-500 font-semibold">Name is required</span>
          )}

          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
            className="input w-full"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <span className="text-red-500 font-semibold">
              Email is required
            </span>
          )}
          {errors.email?.type === "pattern" && (
            <span className="text-red-500 font-semibold">Invalid Email</span>
          )}

          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            {...register("password", {
              required: true,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/,
            })}
            className="input w-full"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <span className="text-red-500 font-semibold">
              Password is required
            </span>
          )}
          {errors.password?.type === "pattern" && (
            <span className="text-red-500 font-semibold">
              Password must contain uppercase, lowercase, number, special
              character and minimum 6 characters
            </span>
          )}
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
