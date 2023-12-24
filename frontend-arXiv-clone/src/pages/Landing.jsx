import MainNavbar from "../components/MainNavbar";
import { Outlet } from "react-router-dom";

import MainFooter from "../components/MainFooter";

function Landing() {
  return (
    <>
      <MainNavbar />
      <Outlet />
      <MainFooter />
    </>
  );
}

export default Landing;
