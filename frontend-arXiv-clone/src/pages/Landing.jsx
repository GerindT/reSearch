import InfoAccordion from "../components/InfoAccordion";
import MainNavbar from "../components/MainNavbar";
import { Blockquote } from "flowbite-react";
function Landing() {
  return (
    <>
      <MainNavbar />
      <div className="flex flex-col justify-center items-center gap-[2rem] mt-[2em]">
        <Blockquote className="text-center">
          &quot;Since we cannot be universal and know all that is to be known of
          everything, we ought to know a little about everything.&quot;
        </Blockquote>
        <InfoAccordion />
      </div>
    </>
  );
}

export default Landing;
