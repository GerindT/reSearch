import { Button, Card, Avatar, Badge } from "flowbite-react";
import { HiCheck, HiClock } from "react-icons/hi";

function Posts() {
  return (
    <Card className=" cursor-pointer  transition duration-100 ease-in transform  max-w-[100%] md:max-w-[60%]">
      <div className="flex flex-row justify-end items-center"></div>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Noteworthy technology acquisitions 2021
      </h5>
      <p className="text-gray-500 transition duration-100 ease-in transform hover:underline  ">
        <a href="" className="decoration-1">
          Author example
        </a>
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facere
        exercitationem officia iure soluta magni accusantium quidem consequatur
        nulla quos ipsum omnis facilis, tenetur quas debitis assumenda. Nemo,
        saepe cumque.
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

      <div className="flex justify-between">
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
        <div className="flex flex-row">
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
    </Card>
  );
}

export default Posts;
