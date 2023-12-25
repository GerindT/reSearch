import { FaLinkedin, FaInstagram } from "react-icons/fa";
import ModalFooter from "../components/Modals/ModalFooter";
import { Footer } from "flowbite-react";

function MainFooter() {
  return (
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
  );
}

export default MainFooter;
