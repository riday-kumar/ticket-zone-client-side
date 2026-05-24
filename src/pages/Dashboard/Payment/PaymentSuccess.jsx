import { Link, useSearchParams } from "react-router";
import { FaCheckCircle, FaHistory, FaHome } from "react-icons/fa";
import { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  //   console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/verify-payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-2xl border border-base-300">
        <div className="card-body items-center text-center py-12">
          {/* Success Icon */}
          <FaCheckCircle className="text-success text-7xl mb-4 animate-bounce" />

          {/* Title */}
          <h1 className="text-4xl font-bold text-success">
            Payment Successful!
          </h1>

          {/* Subtitle */}
          <p className="text-base-content/70 mt-3 text-lg">
            Your payment has been completed successfully.
          </p>

          <p className="text-base-content/60 text-sm mt-1">
            Thank you for your purchase 🎉
          </p>

          {/* Alert Box */}
          <div className="alert alert-success text-white mt-6">
            <span>
              Your booking/payment information has been saved successfully.
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full">
            <Link to="/dashboard/payments" className="btn btn-success flex-1">
              <FaHistory />
              Payment History
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

export default PaymentSuccess;
