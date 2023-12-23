import { Avatar, Dropdown, Navbar } from "flowbite-react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
function MainNavbar() {
  // Styled Navbar Link
  const StyledNavbarLink = styled(Navbar.Link)`
    &:hover {
      color: #1d4ed8; /* Hover text color */
    }
    align-items: center;
  `;

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
      <StyledNavbar rounded border>
        <Navbar.Brand className="cursor-pointer  transition duration-100 ease-in transform  hover:scale-110">
          <img
            src="/logo.png"
            className=" h-[3em] "
            alt="Flowbite React Logo"
          />
        </Navbar.Brand>

        <div className="flex md:order-2 items-center">
          <ul className="hidden md:flex content-center list-none flex-row gap-[2em]">
            <StyledNavbarLink
              href="#"
              className="text-md cursor-pointer  transition duration-100 ease-in transform  hover:scale-110   "
            >
              Home
            </StyledNavbarLink>
            <StyledNavbarLink
              href="#"
              className="text-md cursor-pointer  transition duration-100 ease-in transform  hover:scale-110"
            >
              About
            </StyledNavbarLink>
            <StyledNavbarLink
              href="#"
              className="text-md cursor-pointer  transition duration-100 ease-in transform  hover:scale-110"
            >
              Services
            </StyledNavbarLink>
          </ul>
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
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle className="ml-[1em]" />
        </div>
        <StyledNavbarCollapse className=" content-center">
          <Navbar.Link
            href="#"
            className="text-lg md:block md:max-w-[400px]  lg:w-[100vw] lg:ml-[0em] xl:ml-[18em]  "
          >
            <SearchBar />
          </Navbar.Link>

          <StyledNavbarLink
            href="#"
            className="text-lg cursor-pointer  transition duration-100 ease-in transform  hover:scale-110 md:hidden "
          >
            Home
          </StyledNavbarLink>
          <StyledNavbarLink
            href="#"
            className="text-lg cursor-pointer  transition duration-100 ease-in transform  hover:scale-110 md:hidden"
          >
            About
          </StyledNavbarLink>
          <StyledNavbarLink
            href="#"
            className="text-lg cursor-pointer  transition duration-100 ease-in transform  hover:scale-110 md:hidden"
          >
            Services
          </StyledNavbarLink>
        </StyledNavbarCollapse>
      </StyledNavbar>
    </>
  );
}

export default MainNavbar;
