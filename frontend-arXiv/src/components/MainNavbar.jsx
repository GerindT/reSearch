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

function MainNavbar({ posts, setPosts }) {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalR, setOpenModalR] = useState(false);

  // Styled Navbar Link
  // const StyledNavbarLink = styled(Navbar.Link)`
  //   &:hover {
  //     color: black; /* Hover text color */
  //   }
  //   align-items: center;
  // `;

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

  const [openModalSettings, setOpenModalSettings] = useState(false);
  const [isAdmin, setAdmin] = useState(true);
  const [openModalDashboard, setOpenModalDashboard] = useState(false);
  const [openModalNewPaper, setOpenModalNewPaper] = useState(false);

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
          {isLogedIn ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                  className="cursor-pointer  transition duration-100 ease-in transform  hover:scale-110 ml-[1em]"
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">
                  name@flowbite.com
                </span>
              </Dropdown.Header>
              <Dropdown.Item
                onClick={() => {
                  setOpenModalNewPaper(true);
                }}
              >
                Add a new paper
              </Dropdown.Item>
              {isAdmin && (
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
                  setIsLogedIn(!isLogedIn);
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
                isLogedIn={isLogedIn}
                setIsLogedIn={setIsLogedIn}
              />
              <ModalRegister
                openModal={openModalR}
                setOpenModal={setOpenModalR}
                setOpenModalR={setOpenModal}
                openModalR={openModal}
                isLogedIn={isLogedIn}
                setIsLogedIn={setIsLogedIn}
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
              isLogedIn ? " " : "xl:ml-[3em]"
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