import { Outlet } from "react-router";
import Navbar from "../../components/SharedComponent/Navbar";
import Footer from "../../components/SharedComponent/Footer";

const RootLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="custom-container">
        <Outlet></Outlet>
      </div>
      <footer className="bg-primary h-50">
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default RootLayout;
