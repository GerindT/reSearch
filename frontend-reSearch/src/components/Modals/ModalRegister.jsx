import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import PropTypes from "prop-types";

function ModalRegister({
  openModal,
  setOpenModal,
  setOpenModalR,
  openModalR,
  setUser,
}) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [alert, setAlert] = useState("");

  const apiUrl = !import.meta.env.DEV
    ? import.meta.env.VITE_PROD_API_URL
    : import.meta.env.VITE_DEV_API_URL;

  const validateInputs = () => {
    if (!username.trim() || !password.trim() || !email.trim()) {
      setAlert("Please fill in all fields.");
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setAlert("Invalid email address.");
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

    if (password !== repassword) {
      setAlert("Passwords do not match.");
      return false;
    }

    return true;
  };

  const registerUser = async (username, password, email) => {
    if (!validateInputs()) {
      return false;
    }

    const data = {
      action: "register",
      username: username,
      password: password,
      email: email,
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

      if (result.status == "1") {
        setOpenModal(false);

        if (result.user.UserCategories !== null) {
          result.user.UserCategories = JSON.parse(result.user.UserCategories);
        }
        setUser(result.user);
        setPassword("");
        setEmail("");
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
        size="2xl"
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
              Register to our platform
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
                  registerUser(username, password, email);
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
  isLogedIn: PropTypes.bool,
  setIsLogedIn: PropTypes.func,
  user: PropTypes.object,
  setUser: PropTypes.func,
};

export default ModalRegister;
