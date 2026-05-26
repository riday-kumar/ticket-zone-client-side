import { useQuery } from "@tanstack/react-query";
import DashboardHeading from "../../../components/DashboardHeading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "../../../components/SharedComponent/Loading";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    isLoading: allUsersLoading,
    data: allUsers = [],
    refetch,
  } = useQuery({
    queryKey: ["allUsers", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("users");
      return res.data;
    },
  });

  if (allUsersLoading) {
    return <Loading></Loading>;
  }

  const handleMakeAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Accept it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${id}?role=admin?email=${user.email}`)
          .then((res) => {
            // console.log(res);
            if (res.data.modifiedCount === 1) {
              refetch();
              Swal.fire({
                title: "Admin",
                text: "All the best for the Role",
                icon: "success",
              });
            }
          });
      }
    });
  };

  const handleMakeVendor = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Accept it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${id}?role=vendor?email=${user.email}`)
          .then((res) => {
            // console.log(res);
            if (res.data.modifiedCount === 1) {
              refetch();
              Swal.fire({
                title: "Vendor",
                text: "New Vendor Added",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div>
      <DashboardHeading heading="User Management"></DashboardHeading>
      <div className="overflow-x-auto px-10">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td
                  className={`font-bold ${user.role === "admin" ? "text-green-500" : user.role === "vendor" ? "text-yellow-400" : "text-primary"}`}
                >
                  {user.role}
                </td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleMakeAdmin(user._id)}
                    className="btn btn-sm btn-success text-white"
                  >
                    Admin
                  </button>
                  <button
                    onClick={() => handleMakeVendor(user._id)}
                    className="btn btn-sm btn-warning text-white"
                  >
                    Vendor
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
