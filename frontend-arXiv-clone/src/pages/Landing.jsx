import InfoAccordion from "../components/InfoAccordion";
import MainNavbar from "../components/MainNavbar";
import { Blockquote, Footer } from "flowbite-react";
import Posts from "../components/Posts";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import ModalFooter from "../components/ModalFooter";

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
        {Array(10)
          .fill()
          .map((_, index) => (
            <Posts key={index} />
          ))}
      </div>
      <Footer container className="mt-[2em]">
        <Footer.Copyright href="#" by="ResearchGay™" year={2024} />
        <Footer.LinkGroup className="items-center">
          <Footer.Link href="#">
            <ModalFooter
              title={"Terms of Service"}
              info={
                "With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply."
              }
            />
          </Footer.Link>
          <Footer.Link href="#">
            <ModalFooter
              title={"Licence"}
              info={
                "With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply."
              }
            />
          </Footer.Link>
          <Footer.Link href="#" className="mr-2">
            <FaLinkedin size={20} />
          </Footer.Link>
          <Footer.Link href="#">
            <FaInstagram size={20} />
          </Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    </>
  );
}

export default Landing;
