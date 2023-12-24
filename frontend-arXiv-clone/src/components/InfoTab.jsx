import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "flowbite-react";
import { ReactReader } from "react-reader";
import { FaFileDownload } from "react-icons/fa";
function InfoTab({ paperURL }) {
  const [location, setLocation] = useState(0);

  // Use the split() method to split the string by the dot (.)
  const parts = paperURL.split(".");

  // Take the last element of the resulting array
  const extension = parts[parts.length - 1];

  const handleDownload = () => {
    // Use window.open to initiate the download
    window.open(paperURL, "_blank");
  };

  return (
    <>
      {extension == "pdf" ? (
        <iframe src={paperURL} width="100%" height="1300px" />
      ) : (
        <>
          <div style={{ height: "100vh" }}>
            <ReactReader
              url={paperURL}
              location={location}
              locationChanged={(epubcfi) => setLocation(epubcfi)}
            />
          </div>
          <div className="w-full flex flex-row justify-center">
            <Button
              className="flex flex-row justify-center text-"
              gradientDuoTone={"purpleToBlue"}
              pill
              outline
              onClick={handleDownload} // Add onClick handler
            >
              <FaFileDownload className="mr-1" />
              Download
            </Button>
          </div>
        </>
      )}
    </>
  );
}

InfoTab.propTypes = {
  paperURL: PropTypes.string.isRequired,
};

export default InfoTab;
