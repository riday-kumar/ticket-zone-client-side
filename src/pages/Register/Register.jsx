import { FaPlaneDeparture } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";

const Register = () => {
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
      <form action="">
        <fieldset className="fieldset border-base-300 rounded-box ">
          <label className="label">Name</label>
          <input type="text" className="input w-full" placeholder="Name" />

          <label className="label">Email</label>
          <input type="email" className="input w-full" placeholder="Email" />

          <label className="label">Password</label>
          <input
            type="password"
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
      <button className="btn btn-outline btn-secondary w-full">
        <FcGoogle /> Google
      </button>
    </div>
  );
};

export default Register;
