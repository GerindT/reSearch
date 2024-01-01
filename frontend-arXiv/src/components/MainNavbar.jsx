import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import { useState } from "react";
import ModalLogIn from "./Modals/ModalLogIn";
import ModalRegister from "./Modals/ModalRegister";
import ModalSettings from "./Modals/ModalSettings";
import ModalDashboard from "./Modals/ModalDashboard";
import ModalNewPaper from "./Modals/ModalNewPaper";
import PropTypes from "prop-types";
import { useContext } from "react";
import { UserContext, SetUserContext } from "../pages/Landing";

function MainNavbar({ posts, setPosts }) {
  const [openModal, setOpenModal] = useState(false);
  const [openModalR, setOpenModalR] = useState(false);

  const [openModalSettings, setOpenModalSettings] = useState(false);
  const [openModalDashboard, setOpenModalDashboard] = useState(false);
  const [openModalNewPaper, setOpenModalNewPaper] = useState(false);

  const user = useContext(UserContext);
  const setUser = useContext(SetUserContext);

  const apiUrl = !import.meta.env.DEV
    ? import.meta.env.VITE_PROD_API_URL
    : import.meta.env.VITE_DEV_API_URL;

  const handleSignOut = () => {
    fetch(apiUrl + "/index.php", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "1") {
          setUser(null);
        }
      });
  };

  const StyledNavbar = styled(Navbar)`
    @media (max-width: 880px) {
      div {
        max-width: 100% !important; /* Hover text color */
      }
    }
  `;

  const StyledNavbarCollapse = styled(Navbar.Collapse)`
    @media (min-width: 880px) {
      ul {
        /* Your custom styles for the ul */
        align-items: center;
      }
    }
  `;

  return (
    <>
      <StyledNavbar>
        <Navbar.Brand
          href="/"
          className="cursor-pointer  transition duration-100 ease-in transform  hover:scale-110"
        >
          <img
            src="/logo.png"
            className=" h-[3em] "
            alt="Flowbite React Logo"
          />
        </Navbar.Brand>

        <div className="flex md:order-2 items-center">
          {user ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img={user.Avatar}
                  rounded
                  className="cursor-pointer  transition duration-100 ease-in transform  hover:scale-110 ml-[1em]"
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{user.Username}</span>
                <span className="block truncate text-sm font-medium">
                  {user.Email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item
                onClick={() => {
                  setOpenModalNewPaper(true);
                }}
              >
                Add a new paper
              </Dropdown.Item>
              {Boolean(parseInt(user.IsAdmin)) && (
                <Dropdown.Item onClick={() => setOpenModalDashboard(true)}>
                  Dashboard
                </Dropdown.Item>
              )}
              <Dropdown.Item
                onClick={() => {
                  setOpenModalSettings(true);
                }}
              >
                Settings
              </Dropdown.Item>

              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => {
                  handleSignOut();
                }}
              >
                Sign out
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <>
              <Button
                className="ml-[20px]"
                pill
                outline
                gradientDuoTone="purpleToBlue"
                onClick={() => {
                  setOpenModal(!openModal);
                }}
              >
                Log In
              </Button>
              <ModalLogIn
                openModal={openModal}
                setOpenModal={setOpenModal}
                setOpenModalR={setOpenModalR}
                openModalR={openModalR}
                user={user}
                setUser={setUser}
              />
              <ModalRegister
                openModal={openModalR}
                setOpenModal={setOpenModalR}
                setOpenModalR={setOpenModal}
                openModalR={openModal}
                user={user}
                setUser={setUser}
              />
            </>
          )}
          <Navbar.Toggle className="ml-[1em]" />
        </div>
        <ModalSettings
          openModal={openModalSettings}
          setOpenModal={setOpenModalSettings}
        />
        <ModalDashboard
          openModal={openModalDashboard}
          setOpenModal={setOpenModalDashboard}
        />
        <ModalNewPaper
          openModal={openModalNewPaper}
          setOpenModal={setOpenModalNewPaper}
          posts={posts}
          setPosts={setPosts}
        />
        <StyledNavbarCollapse className=" content-center">
          <Navbar.Link
            href="#"
            className={`text-md md:text-lg md:block md:max-w-[400px]  lg:w-[100vw] lg:ml-[0em] ${
              user ? " " : "xl:ml-[3em]"
            }  `}
          >
            <SearchBar posts={posts} setPosts={setPosts} />
          </Navbar.Link>
        </StyledNavbarCollapse>
      </StyledNavbar>
    </>
  );
}

MainNavbar.propTypes = {
  posts: PropTypes.array,
  setPosts: PropTypes.func,
};

export default MainNavbar;
