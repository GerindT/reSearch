import { Button, Card, Avatar, Badge } from "flowbite-react";
import { HiCheck, HiClock } from "react-icons/hi";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

import PropTypes from "prop-types";

function Posts({
  title,
  author,
  abstract,
  date,
  isVerified,
  verDate,
  isFav,
  favDate,
  likes,
  categories,
}) {
  return (
    <Card className=" cursor-pointer  transition duration-100 ease-in transform  max-w-[100%] md:max-w-[60%]">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="text-gray-500 transition duration-100 ease-in transform hover:underline  ">
        <a href="" className="decoration-1">
          {author}
        </a>
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">{abstract}</p>
      <div className="flex flex-wrap gap-[1em]">
        <Badge
          className="bg-transparent  transition duration-100 ease-in transform  hover:scale-105"
          color={isVerified ? "success" : "red"}
          icon={isVerified ? HiCheck : RxCross1}
        >
          {isVerified ? verDate : "Not verified"}
        </Badge>
        <Badge
          className="  transition duration-100 ease-in transform hover:scale-105"
          color="gray"
          icon={HiClock}
        >
          {date}
        </Badge>
      </div>
      <div className="flex flex-wrap gap-[1em]">
        {categories.map((c, index) => (
          <Badge
            key={index}
            className="rounded-lg transition duration-100 ease-in transform hover:scale-105"
            color={c.color}
          >
            {c.name}
          </Badge>
        ))}
      </div>

      <div className="flex justify-between">
        <Link to="/paper/1">
          <Button
            pill
            outline
            gradientDuoTone="purpleToBlue"
            className="max-w-[200px]  "
          >
            Read more
            <svg
              className="-mr-1 ml-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </Link>
        <div className="flex flex-row">
          <Avatar.Group>
            {Array(likes > 0 ? 3 : 0)
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
            <Avatar.Counter total={likes} href="#" />
          </Avatar.Group>
        </div>
      </div>
    </Card>
  );
}

Posts.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  abstract: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  isVerified: PropTypes.bool.isRequired,
  verDate: PropTypes.string.isRequired,
  isFav: PropTypes.bool.isRequired,
  favDate: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  categories: PropTypes.array.isRequired,
};

export default Posts;
