import { Blockquote } from "flowbite-react";
import Posts from "../components/Posts";
import InfoAccordion from "../components/InfoAccordion";

function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-[2rem] mt-[2em]">
      <Blockquote className="text-center">
        &quot;Since we cannot be universal and know all that is to be known of
        everything, we ought to know a little about everything.&quot;
      </Blockquote>
      <InfoAccordion />
      {Array(10)
        .fill()
        .map((_, index) => (
          <Posts key={index} />
        ))}
    </div>
  );
}

export default Home;
