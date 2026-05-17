import { FaLock, FaArrowLeft, FaHome } from "react-icons/fa";
import { Link } from "react-router";
const Forbidden = () => {
  return (
    <div>
      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-300">
          <div className="card-body items-center text-center">
            {/* Icon */}
            <div className="w-24 h-24 rounded-full bg-error/10 flex items-center justify-center mb-4">
              <FaLock className="text-5xl text-error" />
            </div>

            {/* Error Code */}
            <h1 className="text-6xl font-extrabold text-error">403</h1>

            {/* Title */}
            <h2 className="text-2xl font-bold mt-2">Access Forbidden</h2>

            {/* Message */}
            <p className="text-base-content/70 mt-2">
              You do not have permission to access this page. Please contact the
              administrator if you think this is a mistake.
            </p>

            {/* Buttons */}
            <div className="flex gap-3 mt-6 flex-wrap justify-center">
              <button
                onClick={() => window.history.back()}
                className="btn btn-outline"
              >
                <FaArrowLeft />
                Go Back
              </button>

              <Link to="/" className="btn btn-primary">
                <FaHome />
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
