import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import PropTypes from "prop-types";

function ModalAreYouSure({ openModal, setOpenModal, msg, setVerified }) {
  return (
    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {msg}
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              outline
              pill
              color="blue"
              onClick={() => {
                setOpenModal(false), setVerified(true);
              }}
            >
              {"Yes, I'm sure"}
            </Button>
            <Button
              outline
              pill
              color="failure"
              onClick={() => {
                setOpenModal(false), setVerified(false);
              }}
            >
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

ModalAreYouSure.propTypes = {
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func,
  msg: PropTypes.string,
  setVerified: PropTypes.func,
};

export default ModalAreYouSure;
