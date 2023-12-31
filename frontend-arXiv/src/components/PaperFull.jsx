import { Avatar, Badge, Banner } from "flowbite-react";
import { HiCheck, HiClock, HiX } from "react-icons/hi";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import PropTypes from "prop-types";
import ModalAreYouSure from "./Modals/ModalAreYouSure";
import { useState } from "react";
import { MdAnnouncement } from "react-icons/md";

function PaperFull({
  paperId,
  title,
  author,
  content,
  isVerified,
  verDate,
  isFav,
  date,
  likes,
  categories = [],
  handleVerification,
  handleFavorites,
  handleTagsClick,
}) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="flex flex-col gap-[1em]">
      {!isVerified && (
        <Banner>
          <div className="flex w-full justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
            <div className="mx-auto flex items-center">
              <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                <MdAnnouncement className="hidden md:flex mr-4 h-4 w-4" />
                <span className="[&_p]:inline">
                  This paper has not been verified yet, it may contain false or
                  misleading information. Our team is working on verifying it as
                  soon as possible.
                </span>
              </p>
            </div>
            <Banner.CollapseButton
              color="gray"
              className="border-0 bg-transparent text-gray-500 dark:text-gray-400"
            >
              <HiX className="h-4 w-4" />
            </Banner.CollapseButton>
          </div>
        </Banner>
      )}

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
          onClick={() => {
            isVerified ? "" : setOpenModal(true);
          }}
        >
          {isVerified ? verDate : "Not verified"}
        </Badge>
        <ModalAreYouSure
          openModal={openModal}
          setOpenModal={setOpenModal}
          msg={"Are you sure you want to verify this paper?"}
          handleVerification={handleVerification}
          setVerified={null}
          paperId={paperId}
        />
        <Badge
          className="  cursor-pointer transition duration-100 ease-in transform hover:scale-105"
          color="gray"
          icon={HiClock}
        >
          {date}
        </Badge>
        <Badge
          className="cursor-pointer transition duration-100 ease-in transform hover:scale-105"
          color={isFav ? "red" : "gray"}
          icon={isFav ? FaHeart : FaRegHeart}
          onClick={() => handleFavorites()}
        >
          {isFav ? "Remove from favorites" : "Add to favorites"}
        </Badge>
      </div>
      <div className="flex flex-row flex-wrap justify-between gap-[1em]">
        <div className="flex flex-row flex-wrap gap-[1em]">
          {categories.map((c, index) => (
            <Badge
              key={index}
              className="rounded-lg cursor-pointer transition duration-100 ease-in transform hover:scale-105"
              color={c.color}
              onClick={() => handleTagsClick(c.name)}
            >
              {c.name}
            </Badge>
          ))}
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
  verDate: PropTypes.string.isRequired,
  isFav: PropTypes.bool.isRequired,
  setFav: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  categories: PropTypes.array.isRequired,
  handleVerification: PropTypes.func.isRequired,
  handleFavorites: PropTypes.func.isRequired,
};

export default PaperFull;
