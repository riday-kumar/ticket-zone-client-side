import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCheckUserRole from "../../../hooks/useCheckUserRole";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/SharedComponent/Loading";

const VendorDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { role, roleLoading } = useCheckUserRole();

  const { isLoading, data: totalTicketAdded = [] } = useQuery({
    queryKey: ["totalTicketAdded", role.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets?email=${role.email}`);
      return res.data;
    },
  });

  if (roleLoading || isLoading) {
    return <Loading></Loading>;
  }

  const data = [
    {
      name: "Total Tickets Added",
      number: 50,
    },
    {
      name: "Total Tickets Sold",
      number: 20,
    },
  ];

  return (
    <div className="space-y-10">
      <div className="grid md:grid-cols-3 gap-5 lg:gap-10">
        <div className="font-bold px-10 py-7 rounded-xl text-white bg-linear-to-r from-emerald-500 to-emerald-900">
          <p className="text-2xl pb-2">Total Tickets Added</p>
          <h3 className="text-3xl ">{totalTicketAdded.length}</h3>
        </div>
        <div className="font-bold px-10 py-7 rounded-xl text-white bg-linear-to-r from-red-500 to-orange-500">
          <p className="text-2xl pb-2">Total Tickets Sold</p>
          <h3 className="text-3xl ">15</h3>
        </div>
        <div className="font-bold px-10 py-7 rounded-xl text-white bg-linear-to-l from-cyan-500 to-blue-500">
          <p className="text-2xl pb-2">Total Revenue</p>
          <h3 className="text-3xl ">15</h3>
        </div>
      </div>
      {/* ================= chart ================ */}
      <div className="p-5 w-[50%] 70vh bg-sky-100 mx-auto shadow-xl">
        <BarChart
          style={{
            width: "100%",
            maxWidth: "700px",
            maxHeight: "70vh",
            aspectRatio: 1.618,
          }}
          responsive
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="number" width="auto" />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="number"
            fill="blue"
            activeBar={{ fill: "red", stroke: "blue" }}
            barSize={60}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </div>
    </div>
  );
};

export default VendorDashboardHome;
