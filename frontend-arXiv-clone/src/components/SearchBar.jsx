import { useState } from "react";
import { Button } from "flowbite-react";
import { IoIosSearch } from "react-icons/io";
import PropTypes from "prop-types";

function SearchBar({ posts, setPosts }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    // Filter posts based on the search query
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Update the state with the filtered posts
    setPosts(filteredPosts);
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 cursor-pointer  transition duration-100 ease-in transform  hover:scale-110 ">
            <IoIosSearch
              className="w-[1.2em] h-[1.2em] text-gray-500 dark:text-gray-400 "
              size={24}
            />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-transparent rounded-lg  "
            placeholder="Search Mockups, Logos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
          <Button
            pill
            outline
            gradientDuoTone="purpleToBlue"
            type="submit"
            className="cursor-pointer bg-transparent  transition duration-100 ease-in transform  hover:scale-110 text-white absolute end-2.5 bottom-1.5     "
          >
            Search
          </Button>
        </div>
      </form>
    </>
  );
}

SearchBar.propTypes = {
  posts: PropTypes.array,
  setPosts: PropTypes.func,
};

export default SearchBar;
