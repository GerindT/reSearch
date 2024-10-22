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

import { customThemeTabs } from "../helper/themes";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../pages/Landing";

function Paper() {
  const apiUrl = !import.meta.env.DEV
    ? import.meta.env.VITE_PROD_API_URL
    : import.meta.env.VITE_DEV_API_URL;
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useOutletContext();
  let navigate = useNavigate();
  const user = useContext(UserContext);

  useEffect(() => {
    const paperId = window.location.pathname.split("/")[2];

    const userId = user ? user.UserID : null; // Replace with the actual user ID

    fetch(`${apiUrl}/singlePost.php?id=${paperId}&userId=${userId}`, {
      method: "GET", // Specify the GET method
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `Failed to fetch data: ${res.status} ${res.statusText}`
          );
        }
        return res.json();
      })
      .then((data) => {
        data.Comments = JSON.parse(data.Comments);
        data.Categories = JSON.parse(data.Categories);
        setPost(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  }, []);

  const handleVerification = () => {
    const paperId = window.location.pathname.split("/")[2];

    const data = {
      action: "updateVerification",
      postID: paperId,
    };
    fetch(`${apiUrl}/singlePost.php`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data

        data.status === 1
          ? setPost((prevState) => {
              return {
                ...prevState,
                IsVerified: 1,
                VerifiedDate: data.verifiedDate,
              };
            })
          : console.log("error");
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

  const handleFavorites = () => {
    const paperId = window.location.pathname.split("/")[2];
    const userId = user ? user.UserID : null; // Replace with the actual user ID

    const data = {
      action: "toggleFavorite",
      postID: paperId,
      userID: userId,
    };

    fetch(`${apiUrl}/singlePost.php`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data

        if (data.status === 1) {
          // Toggle the favorite state in the component
          setPost((prevState) => {
            return {
              ...prevState,
              IsFavorited: data.statusVal ? 1 : 0,
              NumFavorites: data.statusVal
                ? parseInt(prevState.NumFavorites) + 1
                : parseInt(prevState.NumFavorites) - 1,
            };
          });
        } else {
          console.log("error");
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

  const handleTagsClick = (name) => {
    const filteredPosts = posts.filter(
      (post) =>
        post.Categories !== null &&
        post.Categories.some((category) => category.CategoryName === name)
      // post.Categories.some((category) => category.name === name)
    );
    setPosts(filteredPosts);
    navigate("/");
  };

  // postID
  const handleDelete = (id) => {
    const data = {
      action: "deletePost",
      postID: id,
    };
    fetch(apiUrl + "/singlePost.php", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 1) {
          setPosts(posts.filter((post) => post.PaperID !== id));
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className=" mx-[1.5em] md:mx-[4em] ">
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/" icon={HiHome}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/">Paper</Breadcrumb.Item>
        <Breadcrumb.Item>{post === null ? "" : post.Title}</Breadcrumb.Item>
      </Breadcrumb>
      <Tabs
        aria-label="Tabs with icons"
        theme={customThemeTabs} // Apply the custom theme
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
              paperId={post.PaperID}
              title={post.Title}
              author={post.Author}
              date={formatDateDifference(post.CreatedAt)}
              content={post.Content}
              isVerified={Boolean(parseInt(post.IsVerified))}
              verDate={formatDateDifference(post.VerifiedDate)}
              isFav={Boolean(parseInt(post.IsFavorited))}
              handleFavorites={handleFavorites}
              handleVerification={handleVerification}
              likes={parseInt(post.NumFavorites)}
              categories={post.Categories || []}
              handleTagsClick={handleTagsClick}
              user={user}
              authorId={post.UserID}
              handleDelete={handleDelete}
            />
          )}
        </Tabs.Item>

        <Tabs.Item title="Information" icon={HiAdjustments}>
          {post === null ? (
            ""
          ) : (
            <InfoTab paperURL={post.PaperFile} apiUrl={apiUrl} />
          )}
        </Tabs.Item>
        <Tabs.Item title="Comments" icon={IoStarSharp}>
          {post === null ? (
            ""
          ) : (
            <Comments
              user={user}
              comments={post.Comments || []}
              setPost={setPost}
              paperId={post.PaperID}
            />
          )}
        </Tabs.Item>
      </Tabs>
    </div>
  );
}

export default Paper;
