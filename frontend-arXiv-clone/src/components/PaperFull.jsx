import { Avatar, Badge } from "flowbite-react";
import { HiCheck, HiClock } from "react-icons/hi";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import PropTypes from "prop-types";
import ModalAreYouSure from "./ModalAreYouSure";
import { useState } from "react";

function PaperFull({
  title,
  author,
  content,
  isVerified,
  setVerified,
  verDate,
  isFav,
  setFav,
  favDate,
  likes,
}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex flex-col gap-[1em]">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="text-gray-500 transition duration-100 ease-in transform hover:underline  ">
        <a href="" className="decoration-1">
          {author}
        </a>
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        <span className="font-semibold text-lg ">Abstract</span>
        <br />
        {content}
      </p>
      <div className="flex flex-wrap gap-[1em]">
        <Badge
          className="bg-transparent  cursor-pointer transition duration-100 ease-in transform  hover:scale-105"
          color={isVerified ? "success" : "red"}
          icon={isVerified ? HiCheck : RxCross1}
          onClick={() => setOpenModal(true)}
        >
          {isVerified ? verDate : "Not verified"}
        </Badge>
        <ModalAreYouSure
          openModal={openModal}
          setOpenModal={setOpenModal}
          msg={"Are you sure you want to verify this paper?"}
          setVerified={setVerified}
        />
        <Badge
          className="  cursor-pointer transition duration-100 ease-in transform hover:scale-105"
          color="gray"
          icon={HiClock}
        >
          {favDate}
        </Badge>
        <Badge
          className="cursor-pointer transition duration-100 ease-in transform hover:scale-105"
          color={isFav ? "red" : "gray"}
          icon={isFav ? FaHeart : FaRegHeart}
          onClick={() => setFav(!isFav)}
        >
          {isFav ? "Remove from favorites" : "Add to favorites"}
        </Badge>
      </div>
      <div className="flex flex-row flex-wrap justify-between gap-[1em]">
        <div className="flex flex-row flex-wrap gap-[1em]">
          <Badge
            className="rounded-lg cursor-pointer self-center transition duration-100 ease-in transform hover:scale-105"
            color="info"
          >
            NLP
          </Badge>
          <Badge
            className="rounded-lg cursor-pointer self-center transition duration-100 ease-in transform hover:scale-105"
            color="gray"
          >
            ML
          </Badge>
          <Badge
            className="rounded-lg cursor-pointer self-center transition duration-100 ease-in transform hover:scale-105"
            color="failure"
          >
            AI
          </Badge>
          <Badge
            className="rounded-lg cursor-pointer self-center transition duration-100 ease-in transform hover:scale-105"
            color="success"
          >
            WEB SCRAPING
          </Badge>
          <Badge
            className="rounded-lg cursor-pointer self-center transition duration-100 ease-in transform hover:scale-105"
            color="warning"
          >
            Robotics
          </Badge>
          <Badge
            className="rounded-lg cursor-pointer self-center transition duration-100 ease-in transform hover:scale-105"
            color="indigo"
          >
            CNN
          </Badge>
          <Badge
            className="rounded-lg cursor-pointer self-center transition duration-100 ease-in transform hover:scale-105"
            color="purple"
          >
            BIG DATA
          </Badge>
          <Badge
            className="rounded-lg cursor-pointer self-center transition duration-100 ease-in transform hover:scale-105"
            color="pink"
          >
            IOT
          </Badge>
        </div>
        <div className="flex flex-end">
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
    </div>
  );
}

PaperFull.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isVerified: PropTypes.bool.isRequired,
  setVerified: PropTypes.func.isRequired,
  verDate: PropTypes.string.isRequired,
  isFav: PropTypes.bool.isRequired,
  setFav: PropTypes.func.isRequired,
  favDate: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
};

export default PaperFull;
