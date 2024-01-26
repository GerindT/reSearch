import {
  Button,
  Modal,
  Label,
  TextInput,
  FileInput,
  Alert,
} from "flowbite-react";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import PropTypes from "prop-types";

function ModalSettings({ openModal, setOpenModal, user, setUser }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [email, setEmail] = useState(user.Email);
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const [showAlert, setShowAlert] = useState("");

  const apiUrl = !import.meta.env.DEV
    ? import.meta.env.VITE_PROD_API_URL
    : import.meta.env.VITE_DEV_API_URL;

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setSelectedFile(file);
  };

  const handleSaveChanges = () => {
    // Email validation using regex if email is provided
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      // Handle invalid email
      setShowAlert("Invalid email");
      return;
    }

    // Username validation using regex if username is provided
    const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
    if (username && !usernameRegex.test(username)) {
      // Handle invalid username
      setShowAlert("Invalid username");
      return;
    }

    // Password validation using regex if password is provided
    // At least 8 characters, at least one uppercase letter, one lowercase letter, and one digit
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (password && !passwordRegex.test(password)) {
      // Handle invalid password
      setShowAlert(
        "Invalid password. Must be at least 8 characters, at least one uppercase letter, one lowercase letter, and one digit"
      );
      return;
    }

    // Additional validation for retyped password if password and retypedPassword are provided
    if (password && retypedPassword && password !== retypedPassword) {
      // Handle password mismatch
      setShowAlert("Passwords do not match");
      return;
    }

    // All validations passed, proceed with saving changes

    setUsername(username);
    setPassword(password);
    setEmail(email);
    setRetypedPassword(retypedPassword);

    const formData = new FormData();

    // Append data to FormData
    formData.append("action", "update");
    formData.append("id", user.UserID);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", selectedFile);

    // Make a fetch request to update user settings
    fetch(apiUrl + "/index.php", {
      method: "POST",
      credentials: "include",
      body: formData, // Use the FormData object directly
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data

        if (data.status === 1) {
          // User settings updated successfully
          if (data.user.UserCategories !== null) {
            data.user.UserCategories = JSON.parse(data.user.UserCategories);
          }

          setUser(data.user);
          // Close the modal
          setOpenModal(false);
        } else {
          // Failed to update user settings
          console.error("Failed to update user settings:", data.message);
          setShowAlert(data.message);
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="modalt"
      >
        <form encType="multipart/form-data">
          <Modal.Header>Settings for {user.Username}</Modal.Header>
          <Modal.Body>
            {showAlert && (
              <Alert color="failure" icon={HiInformationCircle}>
                <span className="font-medium">Info alert!</span> {showAlert}
              </Alert>
            )}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username" value="Username" />
              </div>
              <TextInput
                id="username"
                type="text"
                shadow
                value={username}
                onChange={(event) => {
                  event.preventDefault();
                  setUsername(event.target.value);
                }}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                type="email"
                shadow
                id="email"
                placeholder="name@company.com"
                value={email}
                onChange={(event) => {
                  event.preventDefault();
                  setEmail(event.target.value);
                }}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password " />
                <p className="font-thin text-xs text-gray-500">
                  At least 8 characters, at least one uppercase letter, one
                  lowercase letter, and one digit
                </p>
              </div>
              <TextInput
                id="password"
                type="password"
                shadow
                value={password}
                onChange={(event) => {
                  event.preventDefault();
                  setPassword(event.target.value);
                }}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Retype the password" />
              </div>
              <TextInput
                id="retype-password"
                type="password"
                shadow
                value={retypedPassword}
                onChange={(event) => {
                  event.preventDefault();
                  setRetypedPassword(event.target.value);
                }}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="file-upload" value="Upload file" />
              </div>
              <FileInput
                id="file-upload"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              outline
              pill
              gradientDuoTone="purpleToBlue"
              type="submit"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

ModalSettings.propTypes = {
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func,
  user: PropTypes.object,
  setUser: PropTypes.func,
};

export default ModalSettings;
