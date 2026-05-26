import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/SharedComponent/Loading";
import Countdown from "react-countdown";
import { GiTicket } from "react-icons/gi";
import { TbCoinTakaFilled } from "react-icons/tb";
import { useState } from "react";
import DashboardHeading from "../../../components/DashboardHeading";

const MyBookings = () => {
  const [validPaid, setValidPaid] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading: dataLoading, data: myBookings = [] } = useQuery({
    queryKey: ["myBookings", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      return res.data;
    },
  });

  // console.log(myBookings);

  if (dataLoading) {
    return <Loading></Loading>;
  }

  const handlePayment = async (
    bookingId,
    cost,
    ticketName,
    bookingEmail,
    ticketId,
    bookingQuantity,
  ) => {
    const paymentInfo = {
      bookingId,
      cost,
      ticketName,
      bookingEmail,
      ticketId,
      bookingQuantity,
    };
    // console.log(paymentInfo);
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    // console.log(res.data);
    window.location.assign(res.data.url);
  };

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      setValidPaid(true);
      return <span className="text-red-500 font-bold">Already Departed</span>;
    }
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 sm:gap-2 text-center">
        {/* Days */}
        <div className="bg-base-100 rounded-xl p-3 shadow">
          <h2 className="text-2xl font-bold">{days}</h2>

          <p className="text-xs">Days</p>
        </div>

        {/* Hours */}
        <div className="bg-base-100 rounded-xl p-3 shadow">
          <h2 className="text-2xl font-bold">{hours}</h2>

          <p className="text-xs">Hours</p>
        </div>

        {/* Minutes */}
        <div className="bg-base-100 rounded-xl p-3 shadow">
          <h2 className="text-2xl font-bold">{minutes}</h2>

          <p className="text-xs">Minutes</p>
        </div>

        {/* Seconds */}
        <div className="bg-base-100 rounded-xl p-3 shadow">
          <h2 className="text-2xl font-bold">{seconds}</h2>

          <p className="text-xs">Seconds</p>
        </div>
      </div>
    );
  };

  if (myBookings.length === 0) {
    return (
      <div>
        <DashboardHeading heading="My Bookings"></DashboardHeading>
        <div className="text-center">
          <span>
            No bookings found.Once you book tickets, your bookings history will
            appear here.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <DashboardHeading heading="My Bookings"></DashboardHeading>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {myBookings.map((booking, index) => (
          <div
            key={index}
            className="bg-[#c7eee6] p-2 sm:p-4 card w-full lg:w-96 shadow-sm"
          >
            <figure className="rounded-4xl">
              <img
                className="h-50 w-full"
                src={booking.ticketBooingCombineData[0].photoURL}
                alt="Shoes"
              />
            </figure>
            <div className="card-body text-primary space-y-3">
              <h2 className="card-title text-2xl font-bold">
                {booking.ticketBooingCombineData[0].ticketTitle}
              </h2>
              <h3 className="text-[18px] text-gray-500">
                {booking.ticketBooingCombineData[0].ticketFrom} to{" "}
                {booking.ticketBooingCombineData[0].ticketTo}
              </h3>
              <div className="sm:flex justify-between items-center text-[18px] font-bold">
                <h3 className="flex gap-2 justify-center items-center">
                  <GiTicket />
                  Quantity : {booking.ticketQuantity}
                </h3>
                <h3 className="text-black flex justify-center items-center">
                  Total : <TbCoinTakaFilled /> {booking.totalPrice}
                </h3>
              </div>

              <h4 className="text-[18px] font-semibold">
                Departure : {booking.ticketBooingCombineData[0].departureTime}
              </h4>

              <Countdown
                className="text-[16px] font-bold text-green-500 mt-3"
                renderer={renderer}
                date={booking.ticketBooingCombineData[0].departureTime}
              ></Countdown>

              {booking.payment === "paid" ? (
                <div className="badge badge-success text-white font-bold">
                  Paid
                </div>
              ) : (
                <div className="card-actions justify-end">
                  {booking.status === "accept" ? (
                    <button
                      onClick={() =>
                        handlePayment(
                          booking._id,
                          booking.totalPrice,
                          booking.ticketBooingCombineData[0].ticketTitle,
                          booking.userEmail,
                          booking.ticketBooingCombineData[0]._id,
                          booking.ticketQuantity,
                        )
                      }
                      disabled={validPaid}
                      className="btn btn-primary text-white"
                    >
                      Pay Now
                    </button>
                  ) : booking.status === "reject" ? (
                    <div className="badge badge-error text-white font-bold">
                      Rejected
                    </div>
                  ) : (
                    <button className="btn btn-warning text-white">
                      Pending
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
