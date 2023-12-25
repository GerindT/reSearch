"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";

import PropTypes from "prop-types";

function ModalRegister({
  openModal,
  setOpenModal,
  setOpenModalR,
  openModalR,
  isLogedIn,
  setIsLogedIn,
}) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");

  function onCloseModal() {
    setOpenModal(false);
    setPassword("");
    setEmail("");
  }

  return (
    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Register to our platform
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username" value="Your Username" />
              </div>
              <TextInput
                id="username"
                type="text"
                placeholder="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput
                id="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Re-enter the password" />
              </div>
              <TextInput
                id="password"
                type="password"
                required
                onChange={(e) => setRePassword(e.target.value)}
              />
            </div>

            <div className="w-full">
              <Button
                outline
                pill
                gradientDuoTone="purpleToBlue"
                onClick={() => {
                  setIsLogedIn(!isLogedIn);
                }}
              >
                Register
              </Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Already have an account?&nbsp;
              <a
                href="#"
                className="text-cyan-700 hover:underline dark:text-cyan-500"
                onClick={() => {
                  setOpenModalR(!openModalR);
                  setOpenModal(!openModal);
                }}
              >
                Log in
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

ModalRegister.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  openModalR: PropTypes.bool.isRequired,
  setOpenModalR: PropTypes.func.isRequired,
  isLogedIn: PropTypes.bool.isRequired,
  setIsLogedIn: PropTypes.func.isRequired,
};

export default ModalRegister;
