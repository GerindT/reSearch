import { Modal } from "flowbite-react";
import { useState } from "react";

import PropTypes from "prop-types";

function ModalFooter({ title, info }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <p onClick={() => setOpenModal(true)}>{title}</p>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="modalt"
      >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {info}
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

ModalFooter.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
};

export default ModalFooter;
