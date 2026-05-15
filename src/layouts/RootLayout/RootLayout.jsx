import { Outlet } from "react-router";
import Navbar from "../../components/SharedComponent/Navbar";
import Footer from "../../components/SharedComponent/Footer";

const RootLayout = () => {
  return (
    <div className="custom-bg">
      <Navbar></Navbar>
      <div className="custom-container">
        <Outlet></Outlet>
      </div>
      <footer className="bg-primary">
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default RootLayout;
