import { Accordion, Alert } from "flowbite-react";
import { RxCross1 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function InfoAccordion() {
  const [show, setShow] = useState(false);
  const [showAccordion, setShowAccordion] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 5000);
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className={`max-w-[100%] md:max-w-[60%] w-[1900px] flex justify-end ml-[10px] self-center  ${
          show && showAccordion ? " " : " hidden"
        } `}
      >
        <Alert
          color="cyan"
          withBorderAccent
          className="max-w-[100%] md:max-w-[100%] w-[1900px] flex jusify-between"
        >
          <div className="flex flex-row  w-[85vw] md:w-[55vw] xl:w-[50vw] justify-between">
            <div>
              <span>
                <span className="font-medium">Tip!</span> You can remove the
                extra info by clicking on the cross.
              </span>
            </div>
            <div>
              <RxCross1
                onClick={() => setShowAccordion(!showAccordion)}
                className="self-end  cursor-pointer  transition duration-250 ease-in transform  hover:scale-125 hover:rotate-90  "
                size={24}
              />
            </div>
          </div>
        </Alert>
      </motion.div>
      {showAccordion && (
        <Accordion className="max-w-[100%] md:max-w-[60%]">
          <Accordion.Panel>
            <Accordion.Title>What is ReSearch?</Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                ReSearch is a dynamic online platform designed to foster
                collaboration and knowledge exchange within the realm of
                artificial intelligence. With interactive features such as
                personalized research topics based on your preferences and
                likes, as well as comment section and a thriving community, we
                aim to enrich collective understanding of artificial
                intelligence and the promotion of free independent on research.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              Are there any measures in place to prevent misinformation or
              inappropriate content in the comments section ?
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Yes, maintaining a positive and informative environment is
                crucial to us. We have implemented moderation tools and
                community guidelines to prevent misinformation and inappropriate
                content. Our dedicated team actively monitors comments and
                ensures that discussions remain respectful, fostering a space
                where users can engage in meaningful conversation
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              What are the differences between ReSearch and ResearchGate?
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Cupiditate, consequatur est? Maiores dolores unde suscipit, fuga
                laudantium dignissimos voluptatem similique assumenda nesciunt
                fugit quos animi alias aperiam ipsa dicta beatae.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      )}
    </>
  );
}

export default InfoAccordion;
