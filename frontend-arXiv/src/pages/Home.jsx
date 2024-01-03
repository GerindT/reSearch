import { Blockquote } from "flowbite-react";
import Posts from "../components/Posts";
import InfoAccordion from "../components/InfoAccordion";
import { useOutletContext } from "react-router-dom";
import { UserContext } from "../pages/Landing";
import { useContext } from "react";

function Home() {
  const [posts, setPosts] = useOutletContext();
  const user = useContext(UserContext);

  const apiUrl = !import.meta.env.DEV
    ? import.meta.env.VITE_PROD_API_URL
    : import.meta.env.VITE_DEV_API_URL;

  const handleTagsClick = (name) => {
    const filteredPosts = posts.filter(
      (post) =>
        post.Categories !== null &&
        post.Categories.some((category) => category.CategoryName === name)
    );
    setPosts(filteredPosts);
  };
  console.log(posts);

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
        console.log(data);
        if (data.status === 1) {
          setPosts(posts.filter((post) => post.PaperID !== id));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-[2rem] mt-[2em]">
      <Blockquote className="my-4 border-l-4 border-gray-300 bg-gray-50 p-4 dark:border-gray-500 dark:bg-gray-800">
        &quot;Since we cannot be universal and know all that is to be known of
        everything, we ought to know a little about everything.&quot;
      </Blockquote>
      <InfoAccordion />
      {!posts.length > 0 ? (
        <div className="h-[70vh] flex flex-col justify-center self-center">
          <p className="font-thin text-xs text-gray-500 text-center mr-[4em]">
            There were no results for your query. Try again with different
            terms. 🙄
          </p>
          <img src="/giphy.gif" alt="coffe crying" />
        </div>
      ) : (
        posts.map((p, index) => (
          <Posts
            key={p.PaperID}
            pId={p.PaperID}
            title={p.Title}
            author={p.Authors}
            abstract={p.Abstract}
            date={p.CreatedAt}
            isVerified={Boolean(parseInt(p.IsVerified))}
            verDate={p.VerifiedDate}
            likes={p.NumFavorites || 0}
            categories={p.Categories || []}
            handleTagsClick={handleTagsClick}
            authorId={p.UserID}
            user={user}
            handleDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}

export default Home;
