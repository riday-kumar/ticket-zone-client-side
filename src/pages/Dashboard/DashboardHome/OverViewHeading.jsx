import { VscGraph } from "react-icons/vsc";
const OverViewHeading = ({ name }) => {
  return (
    <div className="mt-5 mb-10">
      <div className="flex items-center gap-2 text-secondary">
        <VscGraph className="text-3xl font-black" />
        <h3 className="text-3xl font-bold capitalize mb-3">
          {name} Dashboard Overview
        </h3>
      </div>
      <hr className="text-gray-300" />
    </div>
  );
};

export default OverViewHeading;
