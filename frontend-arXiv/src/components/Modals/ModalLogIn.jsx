import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

import PropTypes from "prop-types";

function ModalLogIn({
  openModal,
  setOpenModal,
  setOpenModalR,
  openModalR,
  user,
  setUser,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  const apiUrl = !import.meta.env.DEV
    ? import.meta.env.VITE_PROD_API_URL
    : import.meta.env.VITE_DEV_API_URL;

  const validateInputs = () => {
    if (!password.trim() || !username.trim()) {
      setAlert("Please fill in all fields.");
      return false;
    }

    // Password requirements: at least 8 characters, one uppercase letter, one lowercase letter, one digit, one special character
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (!passwordRegex.test(password)) {
      setAlert(
        "Password must meet the specified requirements. At least 8 characters, one uppercase letter, one lowercase letter, one digit, one special character"
      );
      return false;
    }

    return true;
  };

  const loginUser = async (username, password) => {
    if (!validateInputs()) {
      return false;
    }

    const data = {
      action: "login",
      username: username,
      password: password,
    };

    try {
      const response = await fetch(apiUrl + "/index.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();
      console.log(result);
      if (result.status == "1") {
        setOpenModal(false);
        setUser(result.user);
        setPassword("");
        setUsername("");
      } else {
        setAlert(result.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
    return true;
  };

  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => {
          setOpenModal(false);
        }}
        popup
        className="modalt"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Log in to our platform
            </h3>
            {alert !== "" && (
              <Alert color="failure" icon={HiInformationCircle}>
                <span className="font-medium">Info be careful! </span>
                {alert}
              </Alert>
            )}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username" value="Your Username" />
              </div>
              <TextInput
                id="username"
                type="username"
                placeholder="AwesomeUsername"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
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

            <div className="w-full">
              <Button
                outline
                pill
                gradientDuoTone="purpleToBlue"
                onClick={() => {
                  loginUser(username, password);
                }}
              >
                Log in to your account
              </Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?&nbsp;
              <a
                href="#"
                className="text-cyan-700 hover:underline dark:text-cyan-500"
                onClick={() => {
                  setOpenModalR(!openModalR);
                  setOpenModal(!openModal);
                }}
              >
                Create account
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

ModalLogIn.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  openModalR: PropTypes.bool.isRequired,
  setOpenModalR: PropTypes.func.isRequired,
  isLogedIn: PropTypes.bool.isRequired,
  setIsLogedIn: PropTypes.func.isRequired,
};

export default ModalLogIn;
