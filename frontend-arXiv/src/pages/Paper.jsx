import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import { IoStarSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { formatDateDifference } from "../helper/dateHelper";

import PaperFull from "../components/PaperFull";
import Comments from "../components/Comments";
import InfoTab from "../components/InfoTab";

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

const commentsTemp = [
  {
    id: 1,
    name: "Michael Gough",
    date: "Feb. 8, 2022",
    body: " Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.",
    email: "test@gmail.com",
  },
  {
    id: 2,
    name: "Michael Gough",
    date: "Feb. 8, 2022",
    body: " Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.",
    email: "test@gmail.com",
  },
];

function Paper() {
  const apiUrl = !import.meta.env.DEV
    ? import.meta.env.VITE_PROD_API_URL
    : import.meta.env.VITE_DEV_API_URL;
  const [post, setPost] = useState(null);

  useEffect(() => {
    const paperId = window.location.pathname.split("/")[2];
    console.log(paperId);
    fetch(`${apiUrl}/singlePost.php?id=${paperId}`)
      .then((res) => res.json())
      .then((data) => {
        data.Comments = JSON.parse(data.Comments);
        data.Categories = JSON.parse(data.Categories);
        setPost(data);
        console.log(data);
      });
  }, []);

  const [isFav, setFav] = useState(false);
  const [isVerified, setVerified] = useState(false);
  const [comments, setComments] = useState(commentsTemp);

  return (
    <div className=" mx-[1.5em] md:mx-[4em] ">
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
          {post === null ? (
            ""
          ) : (
            <PaperFull
              title={post.Title}
              author={post.Author}
              date={formatDateDifference(post.CreatedAt)}
              content={post.Content}
              isVerified={Boolean(parseInt(post.IsVerified))}
              setVerified={setVerified}
              verDate={formatDateDifference(post.VerifiedDate)}
              isFav={isFav}
              setFav={setFav}
              likes={post.NumFavorites}
              categories={post.Categories || []}
            />
          )}
        </Tabs.Item>

        <Tabs.Item title="Information" icon={HiAdjustments}>
          {post === null ? "" : <InfoTab paperURL={post.PaperFile} />}
        </Tabs.Item>
        <Tabs.Item title="Comments" icon={IoStarSharp}>
          {post === null ? (
            ""
          ) : (
            <Comments
              comments={post.Comments || []}
              setComments={setComments}
            />
          )}
        </Tabs.Item>
      </Tabs>
    </div>
  );
}

export default Paper;
