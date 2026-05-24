import { FaUserCircle, FaEnvelope, FaUserShield, FaEdit } from "react-icons/fa";

import useCheckUserRole from "../../../hooks/useCheckUserRole";
import Loading from "../../../components/SharedComponent/Loading";

const MyProfile = () => {
  const { role, roleLoading } = useCheckUserRole();
  // console.log(role);

  if (roleLoading) {
    <Loading></Loading>;
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-300">
        {/* Top Banner */}
        <div className="h-28 bg-primary rounded-t-2xl relative">
          <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 bg-base-100 flex items-center justify-center">
                <FaUserCircle className="text-7xl text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="card-body pt-16">
          <h2 className="text-3xl font-bold text-center"></h2>

          <p className="text-center text-base-content/60 mb-6">
            Welcome to your profile
          </p>

          {/* Info Section */}
          <div className="space-y-4">
            {/* Name */}
            <div className="flex items-center gap-4 bg-base-200 p-4 rounded-xl">
              <div className="bg-primary text-primary-content p-3 rounded-full">
                <FaUserCircle size={20} />
              </div>

              <div>
                <p className="text-sm text-base-content/60">Name</p>
                <h3 className="font-semibold text-lg">{role?.name}</h3>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 bg-base-200 p-4 rounded-xl">
              <div className="bg-primary text-primary-content p-3 rounded-full">
                <FaEnvelope size={18} />
              </div>

              <div>
                <p className="text-sm text-base-content/60">Email</p>
                <h3 className="font-semibold text-lg break-all">
                  {role?.email}
                </h3>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center gap-4 bg-base-200 p-4 rounded-xl">
              <div className="bg-primary text-primary-content p-3 rounded-full">
                <FaUserShield size={18} />
              </div>

              <div>
                <p className="text-sm text-base-content/60">Role</p>
                <div className="badge badge-primary badge-lg mt-1">
                  {role?.role}
                </div>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="mt-8">
            <button className="btn btn-primary w-full rounded-xl text-base">
              <FaEdit />
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
