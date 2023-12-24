import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import { IoStarSharp } from "react-icons/io5";
import { Avatar, Badge } from "flowbite-react";
import { HiCheck, HiClock } from "react-icons/hi";

const customTheme = {
  base: "flex flex-col gap-2",
  tablist: {
    base: "flex text-center",
    styles: {
      default: "flex-wrap border-b border-gray-200 dark:border-gray-700",
      underline:
        "flex-wrap -mb-px border-b border-gray-200 dark:border-gray-700",
      pills:
        "flex-wrap font-medium text-sm text-gray-500 dark:text-gray-400 space-x-2",
      fullWidth:
        "w-full text-sm font-medium divide-x divide-gray-200 shadow grid grid-flow-col dark:divide-gray-700 dark:text-gray-400 rounded-none",
    },
    tabitem: {
      base: "flex items-center justify-center p-4 rounded-t-lg text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 focus:ring-4 focus:ring-blue-300 focus:outline-none",
      styles: {
        default: {
          base: "rounded-t-lg",
          active: {
            on: "bg-gray-100 text-blue-600 dark:bg-gray-800 dark:text-blue-500",
            off: "text-gray-500 hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800  dark:hover:text-gray-300",
          },
        },
        underline: {
          base: "rounded-t-lg",
          active: {
            on: "text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500",
            off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
          },
        },
        pills: {
          base: "",
          active: {
            on: "rounded-lg bg-blue-600 text-white",
            off: "rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white",
          },
        },
        fullWidth: {
          base: "ml-0 first:ml-0 w-full rounded-none flex",
          active: {
            on: "p-4 text-gray-900 bg-gray-100 active dark:bg-gray-700 dark:text-white rounded-none",
            off: "bg-white hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 rounded-none",
          },
        },
      },
      icon: "mr-2 h-5 w-5",
    },
  },
  tabitemcontainer: {
    base: "",
    styles: {
      default: "",
      underline: "",
      pills: "",
      fullWidth: "",
    },
  },
  tabpanel: "py-3",
};

function Paper() {
  return (
    <div className="h-[100vh] mx-[1.5em] md:mx-[4em]">
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/" icon={HiHome}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/">Paper</Breadcrumb.Item>
        <Breadcrumb.Item>Paper Short Name</Breadcrumb.Item>
      </Breadcrumb>
      <Tabs
        aria-label="Tabs with icons"
        theme={customTheme} // Apply the custom theme
        style="underline"
        className="mt-[1em]"
      >
        <Tabs.Item
          style={{ color: "red" }}
          active
          title="Paper"
          icon={HiUserCircle}
        >
          <div className="flex flex-col gap-[1em]">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
            <p className="text-gray-500 transition duration-100 ease-in transform hover:underline  ">
              <a href="" className="decoration-1">
                Author example
              </a>
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              facere exercitationem officia iure soluta magni accusantium quidem
              consequatur nulla quos ipsum omnis facilis, tenetur quas debitis
              assumenda. Nemo, saepe cumque.
            </p>
            <div className="flex flex-wrap gap-[1em]">
              <Badge
                className="bg-transparent  transition duration-100 ease-in transform  hover:scale-105"
                icon={HiCheck}
              >
                2 minutes ago
              </Badge>
              <Badge
                className="  transition duration-100 ease-in transform hover:scale-105"
                color="gray"
                icon={HiClock}
              >
                3 days ago
              </Badge>
            </div>
            <div className="flex flex-wrap gap-[1em]">
              <Badge
                className="rounded-lg transition duration-100 ease-in transform hover:scale-105"
                color="info"
              >
                NLP
              </Badge>
              <Badge
                className="rounded-lg transition duration-100 ease-in transform hover:scale-105"
                color="gray"
              >
                ML
              </Badge>
              <Badge
                className="rounded-lg transition duration-100 ease-in transform hover:scale-105"
                color="failure"
              >
                AI
              </Badge>
              <Badge
                className="rounded-lg transition duration-100 ease-in transform hover:scale-105"
                color="success"
              >
                WEB SCRAPING
              </Badge>
              <Badge
                className="rounded-lg transition duration-100 ease-in transform hover:scale-105"
                color="warning"
              >
                Robotics
              </Badge>
              <Badge
                className="rounded-lg transition duration-100 ease-in transform hover:scale-105"
                color="indigo"
              >
                CNN
              </Badge>
              <Badge
                className="rounded-lg transition duration-100 ease-in transform hover:scale-105"
                color="purple"
              >
                BIG DATA
              </Badge>
              <Badge
                className="rounded-lg transition duration-100 ease-in transform hover:scale-105"
                color="pink"
              >
                IOT
              </Badge>
            </div>
            <div className="flex flex-end">
              <Avatar.Group>
                {Array(3)
                  .fill()
                  .map((_, index) => (
                    <Avatar
                      key={index}
                      alt="User settings"
                      img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      rounded
                      stacked
                      className="cursor-pointer  transition duration-100 ease-in transform  hover:scale-110 ml-[1em]"
                    />
                  ))}
                <Avatar.Counter total={99} href="#" />
              </Avatar.Group>
            </div>
          </div>
        </Tabs.Item>

        <Tabs.Item title="Download" icon={HiAdjustments}>
          This is
          <span className="font-medium text-gray-800 dark:text-white">
            Settings tab&apos;s associated content
          </span>
          . Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </Tabs.Item>
        <Tabs.Item title="Comments" icon={IoStarSharp}>
          This is
          <span className="font-medium text-gray-800 dark:text-white">
            Contacts tab&apos;s associated content
          </span>
          . Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </Tabs.Item>
        <Tabs.Item disabled title="Disabled">
          Disabled content
        </Tabs.Item>
      </Tabs>
    </div>
  );
}

export default Paper;
