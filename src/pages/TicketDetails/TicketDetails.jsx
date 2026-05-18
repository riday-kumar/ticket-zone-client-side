import { useQuery } from "@tanstack/react-query";
import { FaBus, FaLocationDot, FaClock } from "react-icons/fa6";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/SharedComponent/Loading";

const TicketDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  // Fetch Ticket Details

  const { isLoading, data: ticketDetails = {} } = useQuery({
    queryKey: ["ticketDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets/${id}`);
      return res.data;
    },
  });

  // Countdown State

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  // Countdown Function

  const calculateTimeLeft = () => {
    // If departureTime not exists
    if (!ticketDetails?.departureTime) return;

    // Departure Time
    const departureTime = new Date(ticketDetails.departureTime).getTime();

    // Current Time
    const now = new Date().getTime();

    // Difference
    const distance = departureTime - now;

    // Expired
    if (distance <= 0) {
      return {
        expired: true,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    // Time Calculation
    return {
      expired: false,

      days: Math.floor(distance / (1000 * 60 * 60 * 24)),

      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),

      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),

      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  };

  // =========================
  // Live Countdown
  // =========================
  useEffect(() => {
    // if departureTime not exists
    if (!ticketDetails?.departureTime) return;

    // Initial Time Set
    setTimeLeft(calculateTimeLeft());

    // প্রতি 1 sec update
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup
    return () => clearInterval(interval);
  }, [ticketDetails]);

  // Loading State

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* ================= LEFT SIDE ================= */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-2xl border border-base-300">
            {/* Banner */}
            <figure className="relative">
              <img
                src={ticketDetails.photoURL}
                alt="ticket"
                className="h-80 w-full object-cover"
              />

              <div className="absolute top-4 left-4 badge badge-primary badge-lg p-4">
                {ticketDetails.ticketTitle}
              </div>
            </figure>

            <div className="card-body space-y-6">
              {/* Route */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold">
                    {ticketDetails.ticketFrom} → {ticketDetails.ticketTo}
                  </h2>

                  <p className="text-base-content/70 mt-1">
                    {ticketDetails.ticketTitle}
                  </p>
                </div>

                <div className="badge badge-success badge-lg p-4 text-white">
                  Available Seats: {ticketDetails.ticketQuantity}
                </div>
              </div>

              {/* Ticket Info */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Departure */}
                <div className="bg-base-200 rounded-2xl p-5 flex items-center gap-4">
                  <FaLocationDot className="text-3xl text-primary" />

                  <div>
                    <p className="text-sm opacity-70">Departure</p>

                    <h3 className="text-xl font-bold">
                      {ticketDetails.ticketFrom}
                    </h3>
                  </div>
                </div>

                {/* Arrival */}
                <div className="bg-base-200 rounded-2xl p-5 flex items-center gap-4">
                  <FaLocationDot className="text-3xl text-secondary" />

                  <div>
                    <p className="text-sm opacity-70">Arrival</p>

                    <h3 className="text-xl font-bold">
                      {ticketDetails.ticketTo}
                    </h3>
                  </div>
                </div>

                {/* Time */}
                <div className="bg-base-200 rounded-2xl p-5 flex items-center gap-4">
                  <FaClock className="text-3xl text-warning" />

                  <div>
                    <p className="text-sm opacity-70">Departure Time</p>

                    <h3 className="text-xl font-bold">
                      {ticketDetails.departureTime}
                    </h3>
                  </div>
                </div>

                {/* Seat */}
                <div className="bg-base-200 rounded-2xl p-5 flex items-center gap-4">
                  <MdAirlineSeatReclineExtra className="text-3xl text-error" />

                  <div>
                    <p className="text-sm opacity-70">Seat Type</p>

                    <h3 className="text-xl font-bold">Comfortable</h3>
                  </div>
                </div>
              </div>

              {/* Facilities */}
              <div>
                <h3 className="text-xl font-bold mb-3">Ticket Facilities</h3>

                <div className="flex flex-wrap gap-3">
                  {ticketDetails?.perks?.map((perk, index) => (
                    <div
                      key={index}
                      className="badge badge-outline badge-lg p-4"
                    >
                      {perk}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div>
          <div className="card bg-base-100 shadow-2xl border border-base-300 sticky top-5">
            <div className="card-body">
              <h2 className="text-2xl font-bold text-center">
                Booking Summary
              </h2>

              {/* Price */}
              <div className="text-center py-4">
                <p className="text-base-content/70">Ticket Price</p>

                <h1 className="text-5xl font-extrabold text-primary">
                  ৳{ticketDetails.ticketPrice}
                </h1>
              </div>

              {/* Countdown */}
              <div className="bg-error/10 border border-error/20 rounded-2xl p-5">
                <h3 className="font-bold text-lg mb-4 text-center">
                  Departure Countdown
                </h3>

                {timeLeft.expired ? (
                  <p className="text-center text-error font-bold">
                    Bus Already Departed
                  </p>
                ) : (
                  <div className="grid grid-cols-4 gap-2 text-center">
                    {/* Days */}
                    <div className="bg-base-100 rounded-xl p-3 shadow">
                      <h2 className="text-2xl font-bold">{timeLeft.days}</h2>

                      <p className="text-xs">Days</p>
                    </div>

                    {/* Hours */}
                    <div className="bg-base-100 rounded-xl p-3 shadow">
                      <h2 className="text-2xl font-bold">{timeLeft.hours}</h2>

                      <p className="text-xs">Hours</p>
                    </div>

                    {/* Minutes */}
                    <div className="bg-base-100 rounded-xl p-3 shadow">
                      <h2 className="text-2xl font-bold">{timeLeft.minutes}</h2>

                      <p className="text-xs">Minutes</p>
                    </div>

                    {/* Seconds */}
                    <div className="bg-base-100 rounded-xl p-3 shadow">
                      <h2 className="text-2xl font-bold">{timeLeft.seconds}</h2>

                      <p className="text-xs">Seconds</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Extra Info */}
              <div className="space-y-3 mt-5">
                <div className="flex justify-between">
                  <span className="opacity-70">Transport Type</span>

                  <span className="font-semibold">
                    {ticketDetails.transportType}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="opacity-70">Available Seats</span>

                  <span className="font-semibold">
                    {ticketDetails.ticketQuantity} Seats
                  </span>
                </div>
              </div>

              {/* Button */}
              <button
                disabled={timeLeft.expired}
                className="btn btn-primary btn-lg w-full mt-6 rounded-xl"
              >
                <FaBus />
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
