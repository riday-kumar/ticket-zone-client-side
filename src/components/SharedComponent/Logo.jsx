import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center text-2xl gap-2">
      <span className="bg-primary p-2 text-white logo-color font-bold rounded-xl">
        <h1>TZ</h1>
      </span>
      <h1 className="font-bold text-primary">TicketZone</h1>
    </Link>
  );
};

export default Logo;
