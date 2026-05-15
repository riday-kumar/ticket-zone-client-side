import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBuilding,
} from "react-icons/fa";

const Contact = () => {
  return (
    <section className=" py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* LEFT SIDE FORM */}
        <div className="bg-base-100 shadow-xl rounded-2xl p-8">
          <form className="space-y-6">
            {/* Name + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-semibold mb-2 block">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered w-full focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-semibold mb-2 block">Phone Number</label>
                <input
                  type="text"
                  placeholder="Your Phone Number"
                  className="input input-bordered w-full focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="font-semibold mb-2 block">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full focus:outline-none focus:border-primary"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="font-semibold mb-2 block">Subject</label>
              <input
                type="text"
                placeholder="Your Subject"
                className="input input-bordered w-full focus:outline-none focus:border-primary"
              />
            </div>

            {/* Message */}
            <div>
              <label className="font-semibold mb-2 block">Message</label>
              <textarea
                rows="7"
                placeholder="Your Message"
                className="textarea textarea-bordered w-full focus:outline-none focus:border-primary"
              ></textarea>
            </div>

            {/* Button */}
            <button className="btn btn-primary w-full rounded-full text-white text-base">
              Submit Button
            </button>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="py-4 lg:px-6">
          <p className="text-primary font-semibold mb-3">Contact Us</p>

          <h2 className="text-4xl md:text-5xl font-bold mb-2">Get In Touch</h2>

          <p className="text-secondary leading-8 mb-10">
            We're here to help! Feel free to contact with us.
          </p>

          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Item */}
            <div className="flex items-start gap-4">
              <div className="bg-primary text-white p-4 rounded-lg text-2xl">
                <FaBuilding />
              </div>

              <div>
                <h4 className="text-2xl font-bold mb-1">HKS Complex</h4>
                <p className="text-base-content/60">
                  House - 7<br></br>
                  141 no KB Road
                </p>
              </div>
            </div>

            {/* Item */}
            <div className="flex items-start gap-4">
              <div className="bg-primary text-white p-4 rounded-lg text-2xl">
                <FaMapMarkerAlt />
              </div>

              <div>
                <h4 className="text-2xl font-bold mb-1">Narayanganj</h4>
                <p className="text-base-content/60">
                  Near City Corporation
                  <br />
                  Nitaiganj
                </p>
              </div>
            </div>

            {/* Item */}
            <div className="flex items-start gap-4">
              <div className="bg-primary text-white p-4 rounded-lg text-2xl">
                <FaPhoneAlt />
              </div>

              <div>
                <h4 className="text-2xl font-bold mb-1">Call Us</h4>
                <p className="text-base-content/60">+880 1234-567890</p>
              </div>
            </div>

            {/* Item */}
            <div className="flex items-start gap-4">
              <div className="bg-primary text-white p-4 rounded-lg text-2xl">
                <FaEnvelope />
              </div>

              <div>
                <h4 className="text-2xl font-bold mb-1">Email</h4>
                <p className="text-base-content/60">support@ticketzone.com</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="divider my-10"></div>

          {/* Social Media */}
          <div>
            <h3 className="text-3xl font-bold mb-6">Follow Our Social Media</h3>

            <div className="flex items-center gap-4">
              <a className="btn btn-primary btn-square text-lg text-white">
                <FaFacebookF />
              </a>

              <a className="btn btn-primary btn-square text-lg text-white">
                <FaTwitter />
              </a>

              <a className="btn btn-primary btn-square text-lg text-white">
                <FaInstagram />
              </a>

              <a className="btn btn-primary btn-square text-lg text-white">
                <FaLinkedinIn />
              </a>

              <a className="btn btn-primary btn-square text-lg text-white">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
