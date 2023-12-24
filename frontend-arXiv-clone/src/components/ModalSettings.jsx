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

function ModalSettings({ openModal, setOpenModal }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [email, setEmail] = useState("test@gmail.com");
  const [name, setName] = useState("Test User");
  const [username, setUsername] = useState("test");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [retypedPassword, setRetypedPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setSelectedFile(file);
  };

  const handleSaveChanges = () => {
    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      // Handle invalid email
      console.log("Invalid email");
      setShowAlert(true);
      return;
    }

    // Username validation using regex
    const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
    if (!usernameRegex.test(username)) {
      // Handle invalid username
      console.log("Invalid username");
      setShowAlert(true);

      return;
    }

    // Password validation using regex
    // At least 8 characters, at least one uppercase letter, one lowercase letter, and one digit
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      // Handle invalid password
      console.log("Invalid password");
      setShowAlert(true);

      return;
    }

    // Additional validation for retyped password (assuming you have a state variable named retypedPassword)
    if (password !== retypedPassword) {
      // Handle password mismatch
      console.log("Passwords do not match");
      setShowAlert(true);

      return;
    }

    // Name validation (assuming you have a state variable named name)
    if (name.trim() === "") {
      // Handle empty name
      console.log("Name cannot be empty");
      setShowAlert(true);

      return;
    }

    // All validations passed, proceed with saving changes
    setFile(selectedFile);
    setUsername(username);
    setPassword(password);
    setEmail(email);
    setName(name);
    setRetypedPassword(retypedPassword);

    setOpenModal(false);
  };

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <form>
          <Modal.Header>Settings for {name}</Modal.Header>
          <Modal.Body>
            {showAlert && (
              <Alert color="failure" icon={HiInformationCircle}>
                <span className="font-medium">Info alert!</span> Change a few
                things up and try submitting again.
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
                required
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
                required
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
                required
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
                required
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

export default ModalSettings;
