import { useState } from "react";
import { Button, Badge } from "flowbite-react";
import { IoIosSearch, IoIosArrowDown } from "react-icons/io";
import PropTypes from "prop-types";

function SearchBar({ posts, setPosts }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();

    // Filter posts based on the search query
    const filteredPosts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        selectedCategories.every((category) =>
          post.categories.includes(category)
        )
    );

    // Update the state with the filtered posts
    setPosts(filteredPosts);
  };
  const categories = [
    { name: "WEB SCRAPING", color: "success" },
    { name: "BIG DATA", color: "purple" },
    { name: "Robotics", color: "warning" },
    { name: "NLP", color: "info" },
    { name: "ML", color: "gray" },
    { name: "AI", color: "failure" },
    { name: "CNN", color: "indigo" },
    { name: "IOT", color: "pink" },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category.name)) {
        // If category is already selected, remove it
        return prevCategories.filter(
          (selectedCategory) => selectedCategory !== category.name
        );
      } else {
        // If category is not selected, add it
        return [...prevCategories, category.name];
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <div className="flex flex-row">
          <div className="relative w-full">
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
          <div className="self-center">
            <IoIosArrowDown
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              size={24}
              className="text-gray-500"
            />

            <div
              id="dropdown"
              className="z-10 hidden px-3 py-2 rounded  bg-white shadow focus:outline-none rounded-t-lg w-64 "
            >
              <div className="">
                <h3 className="font-semibold text-black-800 text-center hover:text-black-800 ">
                  Choose your tags
                </h3>
              </div>
              <div className="flex flex-col flex-wrap  items-center h-[10em] gap-4 mt-2 ">
                {categories.map((category) => (
                  <div key={category.name} className=" flex">
                    <Badge
                      className="rounded-lg transition duration-100 ease-in transform hover:scale-105"
                      color={
                        selectedCategories.includes(category.name)
                          ? category.color
                          : "red"
                      }
                      onClick={(e) => {
                        handleCategoryClick(category, e);
                      }}
                    >
                      {category.name}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
