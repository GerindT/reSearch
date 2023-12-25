import { Blockquote } from "flowbite-react";
import Posts from "../components/Posts";
import InfoAccordion from "../components/InfoAccordion";
import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useOutletContext();
  console.log(posts);
  return (
    <div className="flex flex-col justify-center items-center gap-[2rem] mt-[2em]">
      <Blockquote className="text-center">
        &quot;Since we cannot be universal and know all that is to be known of
        everything, we ought to know a little about everything.&quot;
      </Blockquote>
      <InfoAccordion />
      {!posts.length > 0 ? (
        <div className="h-[70vh] flex flex-col justify-center self-center">
          <p className="font-thin text-xs text-gray-500 text-center mr-[4em]">
            There were no results for your query. Try again with different
            terms.
          </p>
          <img src="/giphy.gif" alt="coffe crying" />
        </div>
      ) : (
        posts.map((p, index) => (
          <Posts
            key={index}
            title={p.title}
            author={p.authors}
            abstract={p.abstract}
            date={p.date}
            isVerified={p.isVerified}
            verDate={p.verDate}
            isFav={p.isFav}
            favDate={p.favDate}
            likes={p.likes}
            categories={p.categories}
          />
        ))
      )}
    </div>
  );
}

export default Home;
