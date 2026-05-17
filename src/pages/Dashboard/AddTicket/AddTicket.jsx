import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const AddTicket = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleTicketAdd = (data) => {
    const ticketTitle = data.title;
    const ticketFrom = data.from;
    const ticketTo = data.to;
    const transportType = data.transportType;
    const ticketPrice = data.price;
    const ticketQuantity = data.quantity;
    const departureTime = data.departureTime;
    const perks = data.perks;
    const vendorName = data.vendorName;
    const vendorEmail = data.vendorEmail;

    const profileImg = data.image[0];
    const formData = new FormData();
    formData.append("image", profileImg);

    const img_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_BB_API}`;
    // img upload to image bb
    axios.post(img_API_URL, formData).then((res) => {
      const photoURL = res.data.data.url;

      const newTicket = {
        ticketTitle,
        ticketFrom,
        ticketTo,
        transportType,
        ticketPrice,
        ticketQuantity,
        departureTime,
        perks,
        photoURL,
        vendorName,
        vendorEmail,
      };
      // create ticket now
      axiosSecure.post("/tickets", newTicket).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Ticket Added Successfully. Admin will review",
            showConfirmButton: false,
            timer: 2000,
          });
          reset();
        }
      });
    });
  };

  return (
    <div>
      <p className="text-primary text-3xl text-center font-bold">Add Ticket</p>
      <div className="lg:py-10 lg:px-20">
        <form onSubmit={handleSubmit(handleTicketAdd)} className="space-y-5">
          {/* Ticket Title */}
          <div>
            <label className="font-semibold">Ticket Title</label>
            <input
              type="text"
              placeholder="Enter ticket title"
              className="input input-bordered w-full mt-1"
              {...register("title", {
                required: "Ticket title is required",
              })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1 font-semibold">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* From & To */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">From</label>
              <input
                type="text"
                placeholder="From location"
                className="input input-bordered w-full mt-1"
                {...register("from", {
                  required: "From location is required",
                })}
              />
              {errors.from && (
                <p className="text-red-500 text-sm mt-1 font-semibold">
                  {errors.from.message}
                </p>
              )}
            </div>

            <div>
              <label className="font-semibold">To</label>
              <input
                type="text"
                placeholder="To location"
                className="input input-bordered w-full mt-1"
                {...register("to", {
                  required: "To location is required",
                })}
              />
              {errors.to && (
                <p className="text-red-500 text-sm mt-1 font-semibold">
                  {errors.to.message}
                </p>
              )}
            </div>
          </div>

          {/* Transport Type */}
          <div>
            <label className="font-semibold">Transport Type</label>

            <select
              className="select select-bordered w-full mt-1"
              {...register("transportType", {
                required: "Select a transport type",
              })}
            >
              <option value="">Select Transport</option>
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
              <option value="Flight">Flight</option>
              <option value="Ship">Ship</option>
            </select>
            {errors.transportType && (
              <p className="text-red-500 text-sm mt-1 font-semibold">
                {errors.transportType.message}
              </p>
            )}
          </div>

          {/* Price & Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Price (Per Unit)</label>

              <input
                type="number"
                placeholder="Enter price"
                className="input input-bordered w-full mt-1"
                {...register("price", {
                  required: "Price is required",
                })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1 font-semibold">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label className="font-semibold">Ticket Quantity</label>

              <input
                type="number"
                placeholder="Available tickets"
                className="input input-bordered w-full mt-1"
                {...register("quantity", {
                  required: "Quantity is required",
                })}
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm mt-1 font-semibold">
                  {errors.quantity.message}
                </p>
              )}
            </div>
          </div>

          {/* Departure Date & Time */}
          <div>
            <label className="font-semibold">Departure Date & Time</label>

            <input
              type="datetime-local"
              className="input input-bordered w-full mt-1"
              {...register("departureTime", {
                required: "Departure date & time is required",
              })}
            />
            {errors.departureTime && (
              <p className="text-red-500 text-sm mt-1 font-semibold">
                {errors.departureTime.message}
              </p>
            )}
          </div>

          {/* Perks */}
          <div>
            <label className="font-semibold block mb-2">Perks</label>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="AC"
                  className="checkbox"
                  {...register("perks")}
                />
                AC
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="Breakfast"
                  className="checkbox"
                  {...register("perks")}
                />
                Breakfast
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="Wifi"
                  className="checkbox"
                  {...register("perks")}
                />
                Wifi
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="Charging Port"
                  className="checkbox"
                  {...register("perks")}
                />
                Charging Port
              </label>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="font-semibold">Image Upload</label>

            <input
              type="file"
              className="file-input file-input-bordered w-full mt-1"
              {...register("image", {
                required: "Image is required",
              })}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1 font-semibold">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Vendor Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Vendor Name</label>

              <input
                type="text"
                defaultValue={user.displayName}
                placeholder="Vendor name"
                className="input input-bordered w-full mt-1"
                {...register("vendorName", {
                  required: "Vendor name is required",
                })}
              />
            </div>

            <div>
              <label className="font-semibold">Vendor Email</label>

              <input
                type="email"
                defaultValue={user.email}
                placeholder="Vendor email"
                className="input input-bordered w-full mt-1"
                {...register("vendorEmail", {
                  required: "Vendor email is required",
                })}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button className="btn btn-primary w-full">Add Ticket</button>
        </form>
      </div>
    </div>
  );
};

export default AddTicket;
