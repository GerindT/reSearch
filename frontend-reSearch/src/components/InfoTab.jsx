import PropTypes from "prop-types";

function InfoTab({ paperURL, apiUrl }) {
  return (
    <>
      <iframe src={apiUrl + "/" + paperURL} width="100%" height="1300px" />
    </>
  );
}

InfoTab.propTypes = {
  paperURL: PropTypes.string.isRequired,
  apiUrl: PropTypes.string,
};

export default InfoTab;
