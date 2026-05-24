import { useQuery } from "@tanstack/react-query";
import { FaBus, FaLocationDot, FaClock } from "react-icons/fa6";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/SharedComponent/Loading";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const TicketDetails = () => {
  const [ticketCount, setTicketCount] = useState(1);

  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const bookingModal = useRef(null);

  const navigate = useNavigate();

  // Fetch Ticket Details

  const { isLoading, data: ticketDetails = {} } = useQuery({
    queryKey: ["ticketDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets/${id}`);
      return res.data;
    },
  });

  // ticket price
  // const [totalPrice, setTotalPrice] = useState(ticketDetails.ticketPrice);
  const totalPrice = ticketCount * ticketDetails.ticketPrice;

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

  // Live Countdown

  useEffect(() => {
    // if departureTime not exists
    if (!ticketDetails?.departureTime) return;

    // Initial Time Set
    setTimeLeft(calculateTimeLeft());

    // per 1 sec update
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup
    return () => clearInterval(interval);
  }, [ticketDetails]);

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    setValue("bkuserTicketQuantity", ticketCount);
  }, [ticketCount, setValue]);

  useEffect(() => {
    setValue("bkTotalPrice", totalPrice);
  }, [totalPrice, setValue]);

  const handleShowBookingModal = () => {
    bookingModal.current.showModal();
  };

  const handleTicketBooking = (data) => {
    const bookingData = { ...data };
    bookingData.bkuserEmail = user?.email;

    axiosSecure.post("/bookings", bookingData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Ticket Booking Successful. Vendor will review your ticket",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/dashboard/my-bookings");
      }
    });
  };

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
                onClick={handleShowBookingModal}
                disabled={
                  timeLeft.expired || ticketDetails.ticketQuantity === 0
                }
                className="btn btn-primary btn-lg w-full mt-6 rounded-xl"
              >
                <FaBus />
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* modal for ticket booking */}
      <dialog ref={bookingModal} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Book Now</h3>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost">✕</button>
            </form>
          </div>
          {/* =============== form for ticket booking ========= */}
          <form
            onSubmit={handleSubmit(handleTicketBooking)}
            className="space-y-5"
          >
            {/* User Info */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="label">
                  <span className="label-text">User Name</span>
                </label>

                <input
                  type="text"
                  defaultValue={user?.displayName}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>

              {/* Email */}
              <div>
                <label className="label">
                  <span className="label-text">User Email</span>
                </label>

                <input
                  type="email"
                  defaultValue={user?.email}
                  readOnly
                  className="input input-bordered w-full"
                  {...register("bkUserEmail")}
                />
              </div>
            </div>

            {/* Ticket Info */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Ticket Name */}
              <div>
                <label className="label">
                  <span className="label-text">Ticket Name</span>
                </label>
                <input
                  type="hidden"
                  value={ticketDetails._id}
                  {...register("bkTicketId")}
                />

                <input
                  type="text"
                  defaultValue={ticketDetails.ticketTitle}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>

              {/* Ticket Count */}
              <div>
                <label className="label">
                  <span className="label-text">Number of Tickets</span>
                </label>

                <input
                  type="number"
                  min="1"
                  max={ticketDetails.ticketQuantity}
                  value={ticketCount}
                  onChange={(e) => setTicketCount(Number(e.target.value))}
                  className="input input-bordered w-full"
                />

                <input type="hidden" {...register("bkuserTicketQuantity")} />
              </div>
            </div>

            {/* Route */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* From */}
              <div>
                <label className="label">
                  <span className="label-text">From</span>
                </label>

                <input
                  type="text"
                  defaultValue={ticketDetails.ticketFrom}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>

              {/* To */}
              <div>
                <label className="label">
                  <span className="label-text">To</span>
                </label>

                <input
                  type="text"
                  value={ticketDetails.ticketTo}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-base-200 rounded-2xl p-5 space-y-3">
              <div className="flex justify-between">
                <span>Price Per Ticket</span>

                <span className="font-bold">৳{ticketDetails.ticketPrice}</span>
              </div>

              <div className="flex justify-between">
                <span>Quantity</span>

                <span className="font-bold">{ticketCount}</span>
              </div>

              <div className="divider my-1"></div>

              <div className="flex justify-between text-lg">
                <span className="font-bold">Total Price</span>

                <span className="font-extrabold text-primary">
                  ৳{ticketCount * ticketDetails.ticketPrice}
                </span>

                <input type="hidden" {...register("bkTotalPrice")} />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button type="submit" className="btn btn-primary flex-1">
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default TicketDetails;
