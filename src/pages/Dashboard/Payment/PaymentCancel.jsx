import { Link } from "react-router";
import { FaTimesCircle, FaRedo, FaHome } from "react-icons/fa";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-2xl border border-base-300">
        <div className="card-body items-center text-center py-12">
          {/* Cancel Icon */}
          <FaTimesCircle className="text-error text-7xl mb-4 animate-pulse" />

          {/* Title */}
          <h1 className="text-4xl font-bold text-error">Payment Cancelled</h1>

          {/* Subtitle */}
          <p className="text-base-content/70 mt-3 text-lg">
            Your payment process was cancelled.
          </p>

          <p className="text-base-content/60 text-sm mt-1">
            No worries — you can try again anytime.
          </p>

          {/* Alert */}
          <div className="alert alert-error mt-6">
            <span>Your transaction was not completed.</span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full">
            <Link to="/dashboard/my-bookings" className="btn btn-error flex-1">
              <FaRedo />
              Try Again
            </Link>

            <Link to="/" className="btn btn-outline flex-1">
              <FaHome />
              Back Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
